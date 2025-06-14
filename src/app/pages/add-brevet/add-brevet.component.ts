import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { NavbarComponent } from '../../common/navbar/navbar.component';
import { PageBannerComponent } from './page-banner/page-banner.component';
import { ContactComponent } from '../../common/contact/contact.component';
import { FooterComponent } from '../../common/footer/footer.component';
import { BackToTopComponent } from '../../common/back-to-top/back-to-top.component';
import { ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ServiceService } from '../../service.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-brevet',
  standalone: true,
  imports: [RouterLink, NavbarComponent, PageBannerComponent, ContactComponent, FooterComponent, BackToTopComponent , ReactiveFormsModule],
  templateUrl: './add-brevet.component.html',
  styleUrl: './add-brevet.component.scss'
})
export class AddBrevetComponent {


authForm!: UntypedFormGroup;
brevet: any = {};

  constructor(
    private router: Router,
    private _formBuilder: UntypedFormBuilder,
    private service: ServiceService
  ) {}

  ngOnInit(): void {
    this.authForm = this._formBuilder.group({
      Numero: ['', [Validators.required]],         
      Titre: ['', [Validators.required]],   
      Annee: ['', Validators.required],
      Type: ['', Validators.required],
    });

    this.patchvalue();
  }

 
patchvalue() {

    this.brevet= this.service.usersData
      this.authForm.patchValue({
        Numero: this.brevet["Numero"],
        Titre: this.brevet["Titre"],
        Annee: this.brevet["Annee"],
        Type: this.brevet["Type"],

      });
  
    
      
  }
   

  addBrevet(): void {
    debugger
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

    this.service.AddBrevet(this.authForm.value).subscribe({
      next: (response: any) => {
        Swal.fire({
          icon: 'success',
          title: 'Succès',
          text: response.message || 'Brevet ajoutee avec succès !',
        }).then(() => {
          this.router.navigateByUrl('/brevet-list');
        });
      },
    
    });
  }


   update() {
    debugger

   const updatedData = {
    ...this.authForm.value,
    ID: this.brevet.ID
  };
    
    this.service.UpdateBrevet(updatedData).subscribe(
      res => {
       
  
  
        Swal.fire({
          icon: 'success',
          title: 'Succès',
          text: 'Mise à jour effectuée avec succès.',
        });
        this.authForm.reset();  
      },
    );
  }


}