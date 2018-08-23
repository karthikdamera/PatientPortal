
import { Router, ActivatedRoute } from '@angular/router';
import { ForgotService } from './forgot.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Toast } from 'ng2-toastr/src/toast';
import { Component, OnInit, ViewContainerRef, ViewChild, Output, EventEmitter, Input } from '@angular/core';
import { AsyncValidatorFn, FormBuilder, FormGroup, Validators, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ValidationComponent } from '../../shared/validation/validation.component';
import { ValidationService } from '../../shared/validation/validation.service';
import { AuthService } from '../auth.service';
import { ToastService } from '../../shared/services/toastService';
import { ModalDirective } from 'angular-bootstrap-md';


@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss'],
  providers: [ForgotService, ToastService]
})
export class ForgotComponent implements OnInit {
  myForm: FormGroup;
  forget = false;
  showreset = true;
  loginHere = true;
  sucess: string;
  errorMsg: string;
  admindata: string;
  personlogin = true;
  checkMailMsg:string;
  @ViewChild('forgotBasic') public forgotBasic: ModalDirective;
  @Output() getlogintypeCall = new EventEmitter();
  @Input() data;
  loginDetails: any = [];
  @Output() getloginAdmintypeCall = new EventEmitter();
  obj = {
    type: 'Logout'
  };
  objLoginPage = {
    type: 'objLoginPage'
  };
  objAdminLogin = {
    type: 'AdminLogin'
  };
  /**
   * model for email
   */
  loginsts: any;
  model: any = { 'Email': '' };
  // to enable otp page
  IsOtp: boolean;
  // to sending button hiding and display
  IsSending: boolean;
  constructor(private router: Router, private authService: AuthService, private route: ActivatedRoute,
    private forgotService: ForgotService, private formBuilder: FormBuilder,
    public toastr: ToastsManager, vcr: ViewContainerRef, private _toast: ToastService) {
    this.toastr.setRootViewContainerRef(vcr);
    this.IsOtp = false;
    this.IsSending = false;
    this.myForm = this.formBuilder.group({
      'Email': ['', [Validators.required, Validators.maxLength(50)], ValidationService.emailValidator],
    });
    this.route.queryParams.subscribe(params => {

      if (params['loginsts']) {
        this.loginsts = params['loginsts'];
      }
    });
    // console.log(this.loginsts);
  }
  ngOnInit() {

  }
  /**
   * post  call for forgot password
   */
  forgot() {
    this.IsSending = true;
  //   console.log(JSON.stringify(this.model.Email));
    this.forgotService.ForgotPassword(this.model)
      .subscribe(
        res => {
        //   console.log(JSON.stringify(res));
          if (res.Success === true) {
            // this.IsOtp = true;
            // this.IsSending = false;
            // this.success('Please check your mail');
            // this.errorMsg = 'Please check your mail ';
            // setTimeout(() => {
            //   this.errorMsg = '';
            // }, 3000);
            // this.success(res.data, 'forgot');

            this.authService.LoginDetails(this.model.Email)
              .subscribe(
                arg => {
                  this.loginDetails = arg;
              //    console.log(JSON.stringify(this.loginDetails));
                  if (this.loginDetails.data.UserType === 'Staff' && this.data === 'adminToForgot') {
                    this.IsOtp = true;
                    this.IsSending = false;
                    this.success('Please check your mail', 'checkMail');
                    // this.errorMsg = '';
                    // this.checkMailMsg = 'Please check your mail ';
                    // setTimeout(() => {
                    //   this.checkMailMsg = '';
                    // }, 3000);
                  } else
                    if (this.loginDetails.data.UserType === 'Patient' && this.data !== 'adminToForgot') {
                  //    console.log('this.loginDetails' + JSON.stringify(this.loginDetails))
                      this.IsOtp = true;
                      this.IsSending = false;
                      this.errorMsg = '';
                      this.success('Please check your mail', 'checkMail');
                      // this.checkMailMsg = 'Please check your mail ';
                      // setTimeout(() => {
                      //   this.checkMailMsg = '';
                      // }, 3000);

                    } else {
                      this.IsSending = false;
                      this.error('Please enter valid  email', 'invalidId');
                      // this.errorMsg = 'Please enter valid  email ';
                      // setTimeout(() => {
                      //   this.errorMsg = '';
                      // }, 3000);
                    }
                }
              );

          } else {
            this.IsSending = false;
            this.error('Please enter valid  email', 'invalidId');
            // this.errorMsg = 'Please enter valid email ';
            // setTimeout(() => {
            //   this.errorMsg = '';
            // }, 3000);
            // alert(this.error)
            // this.error(res.data, 'forgot');
          }
        },
        err => console.log(err)
      );
  }
  /**
   * post  call for otp
   * @param otp
   */
  otpPost(otp) {
    if (this.data === 'adminToForgot') {
      this.admindata = 'adminReset';
      // alert(this.admindata);
    }
    this.model.VerificationCode = otp;
    // console.log(JSON.stringify(this.model));
    this.forgotService.OtpRequest(this.model)
      .subscribe(
        res => {
       //   console.log('res' + (JSON.stringify(res)));
          if (res.Success === true) {
            // this.success(res.data, 'otp');
            this.success('Please change ur pwd', 'changeMail');
            // this.errorMsg = 'Please change ur pwd';
            // setTimeout(() => {
            //   this.errorMsg = '';
            // }, 3000);
            this.forget = true;
            this.showreset = false;
            // this.router.navigate(['reset']);
            localStorage.setItem('email', this.model.Email);

          } else {
            // this.error(res.data, 'otp');
            this.error('Please enter valid  OTP', 'otp');
            // this.errorMsg = 'Please enter valid  OTP';
            // setTimeout(() => {
            //   this.errorMsg = '';
            // }, 3000);

          }
        },
        err => console.log(err)
      );
  }/**
   * using for logout
   */
  logout() {
    localStorage.clear();
    localStorage.setItem('IsRegular', 'true');
    // this.getlogintypeCall.emit(this.obj);
    // if(this.loginsts===true){
    //     this.router.navigate(['./']);
    // }
    if (this.data === 'adminToForgot') {
      // alert('sss' + this.data);
      this.getloginAdmintypeCall.emit(this.objAdminLogin);
      // this.router.navigate(['admin']);
    } else {
      // this.loginHere=false;
      this.showreset = true;
      this.forget = true;
      this.personlogin = false;
      this.getlogintypeCall.emit(this.objLoginPage);
      // this.getlogintypeCall.emit(this.obj);
      // this.router.navigate(['./scheduler']);
    }
  }

  /** Toast messages for success and failure */
  success(successmsg, type) {
    this._toast.ShowAlert(successmsg, '', 'Success');
}
error(errormsg, type) {
    this._toast.ShowAlert(errormsg, '', 'Error');
}
  LoginEvent(obj) {
    if (obj.type === 'Logout') {
      this.getlogintypeCall.emit(this.obj);
    }


  }
  LoginAdminEvent(obj) {
    if (obj.type === 'Logout') {

      this.getloginAdmintypeCall.emit(this.obj);
    }
  }
 
}
