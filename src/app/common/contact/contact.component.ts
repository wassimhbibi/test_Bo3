import { NgClass, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { RouterLink, Router } from '@angular/router';
import { ServiceService } from '../../service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [RouterLink, NgClass, NgIf, FormsModule, ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent implements OnInit {
  authForm!: UntypedFormGroup;
  step = 1;

  constructor(
    private router: Router,
    private _formBuilder: UntypedFormBuilder,
    private service: ServiceService
  ) {}

  ngOnInit(): void {
    this.authForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      role: ['company'],
      password: ['', [
        Validators.required,
        Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*#?&]).{8,}$/)
      ]],
      companyName: ['', Validators.required],
      tel: ['', Validators.required],
      besoin: ['', Validators.required],
      solution: ['', Validators.required],
      priorite: ['', Validators.required],
    });
  }

  nextStep(): void {
    const stepControls: Record<number, string[]> = {
      1: ['besoin'],
      2: ['solution'],
      3: ['priorite'],
    };

  

    const controls = stepControls[this.step];
    if (controls && controls.some(control => this.authForm.get(control)?.invalid)) {
      this.authForm.markAllAsTouched();
      return;
    }

    if (this.step < 4) {
      this.step++;
    }
  }


   BackStep(){
      this.step--;
    }

  signUp(): void {
  if (this.authForm.invalid) {
  this.authForm.markAllAsTouched();

  Swal.fire({
    icon: 'warning',
    title: 'Champs manquants',
    text: 'Veuillez remplir tous les champs obligatoires avant de continuer.',
    confirmButtonText: 'OK'
  });

  return;
}

    this.authForm.disable();

    this.service.signup(this.authForm.value).subscribe({
      next: (response: any) => {
        Swal.fire({
          icon: 'success',
          title: 'Succès',
          text: response.message || 'Inscription réussie !',
        }).then(() => {
          this.router.navigateByUrl('/auth/login');
        });
      },
      error: (err) => {
        const msg = err.status === 409
          ? 'L\'adresse e-mail existe déjà. Veuillez réessayer !'
          : err.error?.message || 'Une erreur s\'est produite.';

        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: msg,
        });

        this.authForm.enable();
      }
    });
  }
}