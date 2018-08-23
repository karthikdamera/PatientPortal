import { Router, NavigationExtras } from '@angular/router';
import { LoginModel } from '../../../models/login.model';
import { AuthService } from './../../../auth/auth.service';
import { ValidationComponent } from './../../../shared/validation/validation.component';
import { ValidationService } from './../../../shared/validation/validation.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Toast } from 'ng2-toastr/src/toast';
import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { AsyncValidatorFn, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';



@Component({
    selector: 'app-admin-login',
    templateUrl: './admin-login.component.html',
    styleUrls: ['./admin-login.component.scss']
})
export class AdminLoginComponent implements OnInit {

    myForm: FormGroup;
    // login model
    model: LoginModel;
    loginsts: boolean = true;
    errorMsg: string;
    adminloginShow: boolean;
    showadminForget: boolean;
    Fromadminlogin: string;
    loading: boolean;
    showadminreset: boolean;
    firstreg: string;
    constructor(private router: Router, private authService: AuthService, private formBuilder: FormBuilder,
        public toastr: ToastsManager, vcr: ViewContainerRef) {
        this.adminloginShow = true;
        this.showadminForget = false;
        this.showadminreset = false;
    //    console.log(localStorage.getItem('Domaindata'));
        this.toastr.setRootViewContainerRef(vcr);
        this.model = new LoginModel();
        this.myForm = this.formBuilder.group({
            'Name': ['', [Validators.required, Validators.maxLength(50)], ValidationService.emailValidator],
            'PassWord': ['', Validators.required],
        });
        this.loading = false;
    }
    /**
     * login post
     * @param model
     */
    ngOnInit() {

    }
    login(model) {
        this.loading = true;
        // alert(JSON.stringify(model));
        //  console.log('login  ' + JSON.stringify(model));

        //   localStorage.setItem('IsRegular', 'false');
        this.authService.LoginUser(this.model.Name, this.model.PassWord)
            .subscribe(data => {
                // console.log(data);
                if (data.isLoginSuccessful === true) {
                    this.authService.LoginDetails(this.model.Name)
                        .subscribe(
                            res => {
                                this.loading = false;
                            //    console.log(('details' + JSON.stringify(res)));
                                if (res.data.UserType === 'Staff') {
                                    if (res.Success === true) {
                                        localStorage.setItem('loginData', JSON.stringify(res.data));
                                        if (res.data.IsVerified === true) {
                                            this.router.navigate(['admin/admindashboard']);
                                        } else {
                                            this.showadminreset = true;
                                            this.adminloginShow = false;
                                            this.showadminForget = false;
                                            this.firstreg = 'firstRegReset'
                                            // localStorage.setItem('admin', 'true');
                                            // this.router.navigate(['reset']);
                                        }
                                    }
                                } else {
                                    this.errorMsg = 'Incorrect username or password';
                                    setTimeout(() => {
                                        this.errorMsg = '';
                                    }, 3000);
                                    // this.errorMsg = data.error;
                                    // alert(JSON.stringify( this.errorMsg))
                                    // setTimeout(() => {
                                    //     this.errorMsg = '';
                                    // }, 3000);
                                    //   this.error('invalid username or password');
                                    this.loading = false;
                                }
                            },
                            err => {
                             //   console.log(err);
                                this.loading = false;
                            }
                        );
                } else {

                    this.errorMsg = data.error;
                    setTimeout(() => {
                        this.errorMsg = '';
                    }, 3000);
                    //   this.error(data.error);
                    this.loading = false;
                }
            });
    }
    /**
     * for navigating to forgot password page
     */
    forgot() {

        this.Fromadminlogin = 'adminToForgot'
        this.adminloginShow = false;
        this.showadminForget = true;
        // localStorage.setItem('admin', 'true');
        // let navigation: NavigationExtras = {
        //     queryParams: {
        //         'loginsts': this.loginsts
        //     }
        // };
        // this.router.navigate(['forgot'], navigation);
    }
    /** Toast messages for success and failure */
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
    // login(){
    //   this.route.navigate(['./admin/admindashboard']);
    // }
    LoginEvent(obj) {
        // alert(JSON.stringify('admin logout' + obj))
        if (obj.type === 'AdminLogin') {
            //   this.getlogintypeCall.emit(this.obj);
            this.adminloginShow = true;
            this.showadminForget = false;
            this.showadminreset = false;
        }
        if (obj.type === 'Logout') {
            this.adminloginShow = true;
            this.showadminForget = false;
            this.showadminreset = false;
        }
        if (obj.type === 'FirstLogin') {
            this.adminloginShow = true;
            this.showadminForget = false;
            this.showadminreset = false;
        }

    }
}
