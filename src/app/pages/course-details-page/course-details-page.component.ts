import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { PageBannerComponent } from './page-banner/page-banner.component';
import { ContactComponent } from '../../common/contact/contact.component';
import { FooterComponent } from '../../common/footer/footer.component';
import { BackToTopComponent } from '../../common/back-to-top/back-to-top.component';
import { NavbarComponent } from "../../common/navbar/navbar.component";
import { ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { ServiceService } from '../../service.service';

@Component({
    selector: 'app-course-details-page',
    standalone: true,
    imports: [RouterLink, NavbarComponent, PageBannerComponent, ContactComponent, FooterComponent, BackToTopComponent , ReactiveFormsModule],
    templateUrl: './course-details-page.component.html',
    styleUrl: './course-details-page.component.scss'
})
export class CourseDetailsPageComponent implements OnInit {


authForm!: UntypedFormGroup;
expert: any = {};

  constructor(
    private router: Router,
    private _formBuilder: UntypedFormBuilder,
    public service: ServiceService
  ) {}

  ngOnInit(): void {
    this.authForm = this._formBuilder.group({
      Nom_et_prénom: ['', [Validators.required]],         
      Domaine_dexpertise: ['', [Validators.required]],   
      Années_dexpérience: ['', Validators.required],
      Téléphone: ['', [Validators.required]],
      Email: ['', [Validators.required]],
      Certifications_clés: ['', [Validators.required]],
      Formation_principale: ['', [Validators.required]],
      password:['', [Validators.required]],
      cv:[''],

      role:['expert'],
    });

    this.patchvalue();
  }

 
 
patchvalue() {
debugger
    this.expert= this.service.usersData
      this.authForm.patchValue({
        Nom_et_prénom: this.expert["Nom_et_prénom"],
        Domaine_dexpertise: this.expert["Domaine_dexpertise"],
        Années_dexpérience: this.expert["Années_dexpérience"],
        Téléphone: this.expert["Téléphone"],
        Certifications_clés:this.expert["Certifications_clés"],
        Formation_principale:this.expert["Formation_principale"],
        cv:this.expert["cv"],
        password:this.expert["password"],
        Email:this.expert["Email"],



      });

  }
   

addExpert(): void {
  debugger;

  if (this.authForm.invalid) {
    Swal.fire({
      icon: 'warning',
      title: 'Champs manquants',
      text: 'Veuillez remplir tous les champs obligatoires avant de continuer.',
      confirmButtonText: 'OK'
    });
    return;
  }

  this.authForm.disable();

  // ✅ Convert form data to FormData (to support file upload)
  const formData = new FormData();
  for (const key in this.authForm.value) {
    if (key !== 'cv') {
      formData.append(key, this.authForm.value[key]);
    }
  }

  const cvFile = this.authForm.get('cv')?.value;
  if (cvFile && cvFile instanceof File) {
    formData.append('cv', cvFile, cvFile.name);
  }

  // ✅ Send FormData to backend (no other changes)
  this.service.AddExpert(formData).subscribe({
    next: (response: any) => {
      Swal.fire({
        icon: 'success',
        title: 'Succès',
        text: response.message || 'Expert ajouté avec succès !',
      }).then(() => {
        this.router.navigateByUrl('/expert-list');
      });
    },
    error: (error) => {
      debugger;
      console.error('Error:', error);

      this.authForm.enable();

      if (error.status === 409) {
        this.authForm.get('Email')?.setValue('');
        this.authForm.get('Email')?.markAsTouched();
        this.authForm.get('Email')?.markAsDirty();

        Swal.fire({
          icon: 'error',
          title: 'Email existant',
          text: error.error.message || "Cet email est déjà utilisé par un autre expert.",
          confirmButtonText: 'OK'
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Erreur',
          text: error.error?.message || 'Une erreur est survenue lors de l’ajout de l’expert.',
          confirmButtonText: 'OK'
        });
      }
    }
  });
}

onFileSelected(event: Event): void {
  const file = (event.target as HTMLInputElement).files?.[0];
  if (file) {
    this.authForm.patchValue({ cv: file });
    this.authForm.get('cv')?.updateValueAndValidity();
  }
}

   update() {
    debugger

   const updatedData = {
    ...this.authForm.value,
    Id: this.expert.Id
  };

     const formData = new FormData();
    for (const key in updatedData) {
      if (key !== 'cv') {
        formData.append(key, updatedData[key]);
      }
    }
  
    const cvFile = this.authForm.get('cv')?.value;
    if (cvFile && cvFile instanceof File) {
      formData.append('cv', cvFile, cvFile.name);
    }
    
    this.service.UpdateExpert(formData).subscribe(
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