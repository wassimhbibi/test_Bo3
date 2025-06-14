import { Component } from '@angular/core';
import { PageBannerComponent } from './page-banner/page-banner.component';
import { Router, RouterLink } from '@angular/router';
import { FooterComponent } from '../../common/footer/footer.component';
import { BackToTopComponent } from '../../common/back-to-top/back-to-top.component';
import { NavbarComponent } from "../../common/navbar/navbar.component";
import { ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ServiceService } from '../../service.service';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';



@Component({
    selector: 'app-login-page',
    standalone: true,
    imports: [RouterLink, NavbarComponent, PageBannerComponent, FooterComponent, BackToTopComponent,    ReactiveFormsModule],
    templateUrl: './login-page.component.html',
    styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {
  authForm!: UntypedFormGroup;
  readonly APIUrl='http://localhost:44309/api'

  constructor(
    private _authservice: ServiceService,
    private formBuilder: UntypedFormBuilder,
    private router: Router,
    private _httpClient: HttpClient
  ) {}


  ngOnInit() {
    this.authForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: [ '',[ Validators.required, Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/), ],
      ],
    });
  }


  login() {
    const { email, password } = this.authForm.value;

    this._authservice.Rech(email, password).subscribe(
      (res) => {
       
 
        sessionStorage.setItem('role',res.Role)
      
        const token = res;
        if (token) {
          Swal.fire({
            title: 'Succès !',
            text: 'Vous vous êtes connecté avec succès.',
            icon: 'success',
            confirmButtonText: 'OK',
          });

          if(res.Role ==='admin'){

          this.router.navigateByUrl("add-expert")

          }
          else if(res.Role === 'company'){

            this.router.navigateByUrl("match-expert")

          }

          else if(res.Role === 'expert'){
          this.router.navigateByUrl("/")

          }

          // You can navigate or save token here
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Oups...',
            text: "L'adresse e-mail ou le mot de passe est invalide.",
          });

          this.authForm.reset();
        }
      },
      (err) => {
        Swal.fire({
          icon: 'error',
          title: 'Oups...',
          text: "L'adresse e-mail ou le mot de passe est invalide.",
        });
      }
    );
  }
}