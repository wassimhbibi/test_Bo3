import { Component } from '@angular/core';
import { PageBannerComponent } from './page-banner/page-banner.component';
import { Router, RouterLink } from '@angular/router';
import { FooterComponent } from '../../common/footer/footer.component';
import { BackToTopComponent } from '../../common/back-to-top/back-to-top.component';
import { NavbarComponent } from "../../common/navbar/navbar.component";
import { ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ServiceService } from '../../service.service';
import Swal from 'sweetalert2';



@Component({
    selector: 'app-forget-password',
    standalone: true,
    imports: [RouterLink, NavbarComponent, PageBannerComponent, FooterComponent, BackToTopComponent,    ReactiveFormsModule],
    templateUrl: './forget-password.component.html',
    styleUrl: './forget-password.component.scss'
})
export class ForgetPasswordComponent {
 
  authForm!: UntypedFormGroup;
  submitted = false;
  returnUrl!: string;
  public show: boolean = false;
  constructor(
  public router: Router,
   
    private _authservice: ServiceService,
    private _formBuilder: UntypedFormBuilder
  ) { }

  

  ngOnInit() {

    this.authForm = this._formBuilder.group({
      email: ['', [Validators.required, Validators.email]]
  });
  }


  onSubmit(): void {
    if (this.authForm.valid) {
      const emailControl = this.authForm.get('email');
  
      if (emailControl) {
        const email = emailControl.value;
  
        this._authservice.GetUsersData().subscribe(data => {
          const asp = data.some(a => a.email === email);
  
          if (asp) {
            this._authservice.requestPasswordReset(email).subscribe(
              (response) => {
                if (response) {
                  Swal.fire({
                    icon: 'success',
                    title: 'Succès',
                    text: 'Le lien de réinitialisation du mot de passe a été envoyé à votre adresse email, veuillez vérifier votre email.',
                  });
                }
              },
            );
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Oups...',
              text: 'Cet email n\'existe pas !',

            });
          }
        });
      } else {
     
      }
    }
  }
  
}