import { Component } from '@angular/core';
import { BackToTopComponent } from '../../common/back-to-top/back-to-top.component';
import { FooterComponent } from '../../common/footer/footer.component';
import { ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ContactComponent } from '../../common/contact/contact.component';
import { PageBannerComponent } from './page-banner/page-banner.component';
import { NavbarComponent } from '../../common/navbar/navbar.component';
import { Router, RouterLink } from '@angular/router';
import Swal from 'sweetalert2';
import { ServiceService } from '../../service.service';

@Component({
  selector: 'app-add-chercheur',
  standalone: true,
    imports: [RouterLink, NavbarComponent, PageBannerComponent, ContactComponent, FooterComponent, BackToTopComponent , ReactiveFormsModule],
  templateUrl: './add-chercheur.component.html',
  styleUrl: './add-chercheur.component.scss'
})
export class AddChercheurComponent {

authForm!: UntypedFormGroup;
chercheur: any = {};

  constructor(
    private router: Router,
    private _formBuilder: UntypedFormBuilder,
    public service: ServiceService
  ) {}

  ngOnInit(): void {
    this.authForm = this._formBuilder.group({
      Nom_prenom: ['', [Validators.required]],         
      fonction: ['', [Validators.required]],   
      specialite: ['', Validators.required],
      Mail: ['', Validators.required],
      telephone: ['', Validators.required ],
      Mots_cles: ['', Validators.required],
      titre_dhabilitation_universitaire: [''],
      Titre_de_these: [''],
      Competences: ['', Validators.required],
      Expertise: ['', Validators.required],
      Laboratoire_de_recherche: ['', Validators.required],
      cv:['']

    });

    this.patchvalue();
  }

 
patchvalue() {
debugger
    this.chercheur= this.service.usersData
      this.authForm.patchValue({
        Nom_prenom: this.chercheur["Nom_prenom"],
        fonction: this.chercheur["fonction"],
        specialite: this.chercheur["specialite"],
        Mail: this.chercheur["Mail"],
        telephone:this.chercheur["telephone"],
        Mots_cles:this.chercheur["Mots_cles"],
        titre_dhabilitation_universitaire:this.chercheur["titre_dhabilitation_universitaire"],
        Titre_de_these:this.chercheur["Titre_de_these"],
        Competences:this.chercheur["Competences"],
        Expertise:this.chercheur["Expertise"],
        Laboratoire_de_recherche:this.chercheur["Laboratoire_de_recherche"],
        cv:this.chercheur['cv']



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
   

  addChercheur(): void {
    
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

    this.service.AddChercheur(formData).subscribe({
      next: (response: any) => {
        Swal.fire({
          icon: 'success',
          title: 'Succès',
          text: response.message || 'Expert ajoutee avec succès !',
        }).then(() => {
          this.router.navigateByUrl('/courses');
        });
      },
    
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
    Id: this.chercheur.id
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

    this.service.UpdateChercheur(formData).subscribe(
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

