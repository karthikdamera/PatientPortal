import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'angular-bootstrap-md';
import { SchedulerComponent } from '../scheduler/scheduler.component';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/auth.service';
import { AsyncValidatorFn, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ValidationComponent } from './../../../shared/validation/validation.component';
import { ValidationService } from './../../../shared/validation/validation.service';
declare var jQuery: any;
import { ToastService } from '../../../shared/services/toastService';

@Component({
    moduleId: module.id,
    selector: 'app-personlogin',
    templateUrl: './personlogin.component.html',
    styleUrls: ['./personlogin.component.scss'],
    providers: [ToastService]
})
export class PersonloginComponent implements OnInit {
    @ViewChild('login') public login: ModalDirective;
    loginForm: FormGroup;
    model: any = {};
    showLogin = true;
    showForget = true;
    showregistration: boolean = false;
    showreset = false;
    // login model
    loginModel = { 'Email': '', 'PassWord': '' };
    // to dispaly error message if credentials are wrong
    error: string;
    loading: boolean;
    constructor(private router: Router, private formBuilder: FormBuilder, private authService: AuthService, private _toast: ToastService) {
        this.loginForm = this.formBuilder.group({
            'Email': ['', Validators.required, ValidationService.emailValidator],
            'Password': ['', Validators.required]
        });
        this.loading = false;
    }
    ngOnInit() {
        // throw new Error("Method not implemented.");
    }
    personLogin(model) {

        this.loading = true;
        this.showLogin = true;
        // alert(JSON.stringify(model));
        if (this.loginForm.dirty && this.loginForm.valid) {
            //  alert(JSON.stringify(this.model));
            this.loginModel.Email = this.model.Email;
            this.loginModel.PassWord = this.model.Password;
            // console.log('login  ' + JSON.stringify(this.loginModel));
            localStorage.setItem('IsRegular', 'false');
            // this.showLogin = false;
            this.authService.LoginUser(this.loginModel.Email, this.loginModel.PassWord)
                .subscribe(data => {
                    // console.log(JSON.stringify(data));
                    if (data.isLoginSuccessful === true) {
                        this.authService.LoginDetails(this.loginModel.Email)
                            .subscribe(
                                res => {
                                //    console.log(('details' + JSON.stringify(res)));
                                    if (res.data.UserType === 'Patient') {
                                        if (res.Success === true) {
                                            localStorage.setItem('loginData', JSON.stringify(res.data));
                                            if (res.data.IsVerified === true) {
                                                // jQuery('#login').modal('hide');
                                                // this.login.hide();
                                                // alert();
                                                this.router.navigate(['person/dashboard']);
                                                this.loading = true;
                                                // this.login.hide();
                                            } else {
                                                // jQuery('#login').modal('hide');
                                                // this.login.hide();
                                                this.showreset = true;
                                                this.showForget = true;
                                                this.showLogin = false;
                                                // this.router.navigate(['reset']);
                                            }
                                        }
                                    } else if (res.data.UserType === 'Staff') {
                                        this.error = 'Incorrect username or password';
                                        setTimeout(() => {
                                            this.error = '';
                                        }, 3000);
                                    }
                                },
                                err => console.log(err)
                            );
                    } else {
                        this.error = data.error;
                        setTimeout(() => {
                            this.error = '';
                        }, 3000);
                    }

                    this.loading = false;
                });
        } else {
            this.validateAllFormFields(this.loginForm);
            this.loading = false;
        }
    }
    forgot() {
        this.showForget = false;
        this.showLogin = false;
        // this.router.navigate(['forgot']);
    }
    registration() {
        this.showLogin = false;
        this.showregistration = true;
        this.showForget = true;
    }
    logout() {
        localStorage.clear();
        localStorage.setItem('IsRegular', 'true');
        this.router.navigate(['./scheduler']);
    }
    validateAllFormFields(formGroup: FormGroup) {
        Object.keys(formGroup.controls).forEach(field => {
            const control = formGroup.get(field);
            if (control instanceof FormControl) {
                control.markAsTouched({ onlySelf: true });
            } else if (control instanceof FormGroup) {
                this.validateAllFormFields(control);
            }
        });
    }
    loginShow() {
        this.showregistration = false;
        this.showForget = true;
        this.showLogin = true;
        this.showreset = false;
        this.model.Email = "";
        this.model.Password = "";
    }

    loginEvent(obj) {
        //   alert(obj.type);
        // alert('ljfdksjfsdjflsjkd')

        if (obj.type === 'Logout') {
            //  alert();
            this.login.hide();
        }
        if (obj.type === 'objLoginPage') {
            // alert(obj.type)
            // this.showLogin=true;
            this.login.show();
            this.loginShow();
        }
        if (obj.type === 'Reset') {
            // alert(obj.type);
            this.login.hide();
        }
        if (obj.type === 'Login') {
            this.showForget = true;
            this.showregistration = false;
            this.showreset = false;
            this.showLogin = true;

        }

    }
    toClearModel() {
     this.loginForm.reset();

    }
}
