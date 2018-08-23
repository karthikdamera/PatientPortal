
import { Router } from '@angular/router';
import { ForgotService } from '../forgot/forgot.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Component, OnInit, ViewContainerRef, ViewChild, EventEmitter, Output, Input } from '@angular/core';
import { AsyncValidatorFn, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';


import { ValidationService } from '../../shared/validation/validation.service';
import { ValidationComponent } from '../../shared/validation/validation.component';
import { AuthService } from '../auth.service';
import { ToastService } from '../../shared/services/toastService';
import { ModalDirective } from 'angular-bootstrap-md';
import { Alert } from 'selenium-webdriver';
@Component({
    moduleId: module.id,
    selector: 'app-resetpassword',
    templateUrl: 'resetpassword.component.html',
    styleUrls: ['resetpassword.component.scss'],
    providers: [ForgotService, ToastService]
})
export class ResetpasswordComponent implements OnInit {
    email: any;
    myForm: FormGroup;
    show: boolean;
    errorps: string;
    resetPopUp = true;
    loading: boolean;
    resetMsg: string;
    invalidPwd: boolean;
    mismatch: boolean;
    @ViewChild('demoBasic') public demoBasic: ModalDirective;
    @ViewChild('login') public login: ModalDirective;

    @Output() getlogintypeCall = new EventEmitter();
    @Output() getResttypeCall = new EventEmitter();
    @Input() adminforgotdata: string;
    @Output() getloginAdmintypeCall = new EventEmitter();
    @Output() getFirstRegResettypeCall = new EventEmitter();
    @Input() firstReg: string;
    obj = {
        type: 'Logout'
    };
    objReset = {
        type: 'Reset'
    };
    objFirstReg = {
        type: 'FirstLogin'
    };
    // model for new and current password
    model: any = { 'NewPassword': '', 'conformpassword': '' };
    loginData: any = {};
    constructor(private router: Router, private authService: AuthService, private forgotService: ForgotService,
        private formBuilder: FormBuilder,
        public toastr: ToastsManager, vcr: ViewContainerRef, private _toast: ToastService) {
        this.mismatch = false;
        this.loading = false;
        this.invalidPwd = false;
        this.loginData = JSON.parse(localStorage.getItem('loginData'));
        if (this.loginData) {
            this.email = this.loginData.Email;
        } else {
            this.email = localStorage.getItem('email');
        }
        this.toastr.setRootViewContainerRef(vcr);
        this.myForm = this.formBuilder.group({
            'NewPassword': ['', Validators.required, ValidationService.passwordValidator],
            'conformpassword': ['', Validators.required, ValidationService.passwordValidator]
        });
    }
    /**
     * post call for change password
     */
    ngOnInit() {

    }
    generate() {
        if (this.model.NewPassword === this.model.conformpassword) {
            this.loading = true;
            this.model.Email = this.email;
            this.model.Password = this.model.conformpassword;
            console.log(JSON.stringify(this.model));
            this.forgotService.ChangePassword(this.model)
                .subscribe(
                    res => {
                        console.log((JSON.stringify(res)));
                        if (res.Success === true) {
                            // this.resetPopUp = false;
                            localStorage.removeItem('loginData');
                            localStorage.removeItem('id_token');
                            // this.success(res.data, 'generate');
                            // this.resetMsg = 'Updated Password successfully ';
                            this.success('Updated Password successfully', '');
                            this.authService.LoginUser(this.email, this.model.Password)
                                .subscribe(data => {
                                    console.log(JSON.stringify(data));
                                    if (data.isLoginSuccessful === true) {
                                        this.authService.LoginDetails(this.email)
                                            .subscribe(
                                                res1 => {
                                                    console.log(('details' + JSON.stringify(res1)));
                                                    localStorage.setItem('loginData', JSON.stringify(res1.data));
                                                    if (res1.data.UserType === 'Patient') {
                                                        if (res1.Success === true) {
                                                            // localStorage.setItem('loginData', JSON.stringify(res1.data));
                                                            if (res1.data.IsVerified === true) {
                                                                // jQuery('#login').modal('hide');
                                                                // this.login.hide()

                                                                this.router.navigate(['person/dashboard']);
                                                            } else {
                                                                // jQuery('#login').modal('hide');
                                                                // this.login.hide();
                                                                // this.router.navigate(['reset']);
                                                            }
                                                        }
                                                    } else if (res1.data.UserType === 'Staff') {
                                                        // this.router.navigate(['admin/admindashboard']);
                                                        if (res1.data.IsVerified === true) {
                                                            // jQuery('#login').modal('hide');
                                                            // this.login.hide()
                                                            this.router.navigate(['admin/admindashboard']);
                                                            // this.getFirstRegResettypeCall.emit(this.objFirstReg);

                                                        } else {
                                                            // jQuery('#login').modal('hide');
                                                            // this.login.hide();
                                                            // this.router.navigate(['reset']);
                                                        }
                                                    }
                                                },
                                                err => console.log(err)
                                            );
                                    } else {
                                        // this.error = data.error;
                                        // setTimeout(() => {
                                        //     this.error = '';
                                        // }, 3000);
                                    }
                                    //  this.loading = false;
                                });
                            setTimeout(() => {
                                this.resetMsg = '';
                                if (this.adminforgotdata === 'adminReset') {
                                    this.getloginAdmintypeCall.emit(this.obj);
                                    // this.router.navigate(['./scheduler']);
                                } else {
                                    this.getlogintypeCall.emit(this.obj);
                                    this.getResttypeCall.emit(this.objReset);
                                }
                            }, 3000);
                            // if (type === 'generate') {
                            //     // this.demoBasic.hide();
                            //     // this.login.hide();
                            //     setTimeout(() => {
                            //     this.getlogintypeCall.emit(this.obj);
                            // }, 3000);
                            // }
                        } else {
                            this.error(res.data, 'generate');
                        }
                        this.loading = false;
                    },
                    err => console.log(err)
                );
        } else {
            this.show = true;
            this.errorps = 'password does not match';
            // setTimeout(() => {
            //     this.errorps = '';
            //     this.show = false;
            // }, 3000);
            this.loading = false;
        }
    }
    /**
     * for logout
     */
    logout() {

        localStorage.clear();
        localStorage.setItem('IsRegular', 'true');
        if (this.adminforgotdata === 'adminReset') {
            this.getloginAdmintypeCall.emit(this.obj);

            // this.router.navigate(['./scheduler']);
        } else
            if (this.firstReg === 'firstRegReset') {

                this.getFirstRegResettypeCall.emit(this.objFirstReg);
            } else {
                this.getlogintypeCall.emit(this.obj);
                this.getResttypeCall.emit(this.objReset);
            }

        // this.router.navigate(['./scheduler']);
    }
    success(successmsg, type) {

        this._toast.ShowAlert(successmsg, '', 'Success');
        if (type === 'generate') {
            // this.demoBasic.hide();
            // this.login.hide();
            setTimeout(() => {
                this.getlogintypeCall.emit(this.obj);
            }, 3000);
        }

    }
    /** Toast messages for success and failure */

    error(errormsg, type) {
        this._toast.ShowAlert(errormsg, '', 'Error');
        // this.disableButton = false;
    }
    onSearchChange(searchValue: string, type) {
        this.invalidPwd = false;
        this.mismatch = false;
            if (searchValue.length > 0) {
                if (type === 'currpwd') {
                this.invalidPwd = true; 
            }
            if ( type === 'Confirm') {
                this.invalidPwd = true; 
                if ((this.model.conformpassword !== this.model.NewPassword)) {
                          this.mismatch = true;
                }
            }
            if (this.model.conformpassword === this.model.NewPassword) {
                this.invalidPwd = false;
            }
        }

    }
}

