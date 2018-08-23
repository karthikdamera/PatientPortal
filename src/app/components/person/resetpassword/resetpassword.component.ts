import { ForgotService } from './../../../auth/forgot/forgot.service';
import { Router } from '@angular/router';
import { AuthService } from './../../../auth/auth.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Toast } from 'ng2-toastr/src/toast';
import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { AsyncValidatorFn, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ValidationComponent } from './../../../shared/validation/validation.component';
import { ValidationService } from './../../../shared/validation/validation.service';
@Component({
    moduleId: module.id,
    selector: 'app-resetpassword',
    templateUrl: 'resetpassword.component.html',
    styleUrls: ['resetpassword.component.scss'],
    providers: [ForgotService]
})
export class ResetpasswordComponent {
    email: any;
    myForm: FormGroup;
    show: boolean;
    errorps: string;
    // model for new and current password
    model: any = { 'NewPassword': '', 'conformpassword': '' };
    loginData: any = {};
    constructor(private router: Router, private authService: AuthService, private forgotService: ForgotService,
        private formBuilder: FormBuilder,
        public toastr: ToastsManager, vcr: ViewContainerRef) {
        this.loginData = JSON.parse(localStorage.getItem('loginData'));
        if (this.loginData) {
            this.email = this.loginData.Email;
        } else {
            this.email = localStorage.getItem('email');
        }
        this.toastr.setRootViewContainerRef(vcr);
        this.myForm = this.formBuilder.group({
            'NewPassword': ['', Validators.required, ValidationService.passwordValidator],
            'conformpassword': ['', Validators.required]
        });
    }
    /**
     * post call for change password
     */
    generate() {
       if (this.model.NewPassword === this.model.conformpassword) {
        this.model.Email = this.email;
        this.model.Password = this.model.conformpassword;
      //  console.log(JSON.stringify(this.model));
        this.forgotService.ChangePassword(this.model)
            .subscribe(
            res => {
             //   console.log((JSON.stringify(res)));
                if (res.Success === true) {
                    localStorage.removeItem('loginData');
                    localStorage.removeItem('id_token');
                    this.success(res.data) ;
                } else {
                    this.error(res.data);
                }
            },
            err => console.log(err)
            );
        }
        else {
            this.show = true;
            this.errorps = 'password does not match';
            setTimeout(() => {
                this.errorps = '';
                this.show = false;
            }, 3000);
        }
    }
    /**
     * for logout
     */
    logout() {
        localStorage.clear();
        localStorage.setItem('IsRegular', 'true');
        this.router.navigate(['./scheduler']);
    }
     /** Toast messages for success and failure */
     success(successmsg) {
        this.toastr.success(successmsg, null, {
            dismiss: 'controlled', showCloseButton: true,
            positionClass: 'toast-bottom-right', newestOnTop: true, progressBar: false,
            showEasing: 'swing', closeButton: false, 'preventDuplicates': false,
            'debug': false, 'hideEasing': 'linear',
            'showMethod': 'fadeIn',
            'hideMethod': 'fadeOut'
        }).then((toast: Toast) => {
            setTimeout(() => {
                this.toastr.dismissToast(toast);
                if (localStorage.getItem('admin')) {
                    this.router.navigate(['admin']);
                } else {
                    this.router.navigate(['scheduler']);
                }
                localStorage.removeItem('admin');
                localStorage.removeItem('email');
            }, 3000);
        });
    }
    error(errormsg) {
        this.toastr.error(errormsg, null, {
            dismiss: 'controlled', showCloseButton: true,
            positionClass: 'toast-bottom-right', newestOnTop: true, progressBar: false,
            showEasing: 'swing', closeButton: false, 'preventDuplicates': false,
            'debug': false, 'hideEasing': 'linear',
            'showMethod': 'fadeIn',
            'hideMethod': 'fadeOut'
        }).then((toast: Toast) => {
            setTimeout(() => {
                this.toastr.dismissToast(toast);
            }, 3000);
        });
    }
}
