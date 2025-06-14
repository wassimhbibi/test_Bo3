import { Component, ViewChild } from '@angular/core';
import { PageBannerComponent } from './page-banner/page-banner.component';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { FooterComponent } from '../../common/footer/footer.component';
import { BackToTopComponent } from '../../common/back-to-top/back-to-top.component';
import { NavbarComponent } from "../../common/navbar/navbar.component";
import { FormControl, NgForm, ReactiveFormsModule, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { ServiceService } from '../../service.service';
import Swal from 'sweetalert2';
import { HttpClient } from '@angular/common/http';



@Component({
    selector: 'app-reset-password',
    standalone: true,
    imports: [RouterLink, NavbarComponent, PageBannerComponent, FooterComponent, BackToTopComponent,    ReactiveFormsModule],
    templateUrl: './reset-password.component.html',
    styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent {
 authForm!: UntypedFormGroup;
  submitted = false;
  returnUrl!: string;
  @ViewChild('ResetPasswordNgForm') ResetPasswordNgForm!: NgForm;
  public show: boolean = false;
  constructor(
  public router: Router,
  private route: ActivatedRoute,
    private _authservice: ServiceService,
    private _formBuilder: UntypedFormBuilder
  ) { }

  

  token:any;
  ngOnInit() {

    this.route.queryParams.subscribe(params => {
      this.token = params['token'];
      
    });
    this.authForm = this._formBuilder.group({
      password  : new FormControl('',[Validators.required, Validators.pattern('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[0-9A-Za-zd$@$!%*?&].{6,}')]),
      confirmpass: ['', Validators.required]
  });

  }

  resetPassword() {
    const passwordControl = this.authForm.get('password');
    const passwordConfirmControl = this.authForm.get('confirmpass');

    if (passwordControl && passwordConfirmControl) {
        const password = passwordControl.value;
        const passwordConfirm = passwordConfirmControl.value;

        if (password !== passwordConfirm) {
            Swal.fire({
              icon: 'error',
              title: 'Oups...',
              text: 'Confirm password not valid!',
            });
            return;
        }
    } else {

        return;
    }

    if (this.authForm.valid) {
        const newPassword = passwordControl.value; 

        this._authservice.resetPasswordd(this.token, newPassword).subscribe(
          
          (result: any) => {
            debugger
                if (result) {
                  Swal.fire({
                    icon: 'success',
                    title: 'Succès',
                    text: 'Vous avez cliqué sur le bouton !',
                    showConfirmButton: true,
                  });
                    this.authForm.reset();
                } else {
                  Swal.fire({
                    icon: 'error',
                    title: 'Oups...',
                    text: 'Quelque chose a mal tourné !',
                    footer: 'Pourquoi ai-je ce problème ?',
                  });
                }
            },
        );
    }
}

  passwordToggle: boolean = false;
  confirmPasswordToggle: boolean = false;
  togglePassword() {
    this.passwordToggle = !this.passwordToggle;
  }

  toggleConfirmPassword() {
    this.confirmPasswordToggle = !this.confirmPasswordToggle;
  }
  confirm_password() {
    if (this.authForm.value.password !== '' && this.authForm.value.confirmpass !== '') {
        if (this.authForm.value.password !== this.authForm.value.confirmpass) {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}

  

}