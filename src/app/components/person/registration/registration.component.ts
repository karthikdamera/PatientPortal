import { SearchModel } from './../../../models/appointments.model';
import { AuthService } from './../../../auth/auth.service';
import { TenantResponse } from '../../../models/tenant.model';
import { RegistrationService } from './registration.service';
import { RegistrationModel } from './../../../models/person-slot.model';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Toast } from 'ng2-toastr/src/toast';
import { ValidationService } from './../../../shared/validation/validation.service';
import { ValidationComponent } from './../../../shared/validation/validation.component';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, ViewContainerRef, ViewChild, AfterViewInit, EventEmitter, Output } from '@angular/core';
import { DatePipe, AsyncPipe } from '@angular/common';
import { INgxMyDpOptions, IMyDateModel, IMyInputFieldChanged, IMyDate } from 'ngx-mydatepicker';
import { NgxMyDatePickerDirective } from 'ngx-mydatepicker';
declare var jQuery: any;
import { MaskedDate } from '../../../shared/services/datemask';
import { UnMaskedData } from '../../../shared/services/unmaskdata';
import { ProfileSettingsService } from '../profile-settings/profile-settings.service';

@Component({
    moduleId: module.id,
    selector: 'app-registration',
    templateUrl: './registration.component.html',
    styleUrls: ['./registration.component.scss'],
    providers: [RegistrationService, DatePipe, ProfileSettingsService]
})
export class RegistrationComponent implements OnInit {
    @Output() getlogintypeCall = new EventEmitter();
    @ViewChild('DOB') ngxdp: NgxMyDatePickerDirective;
    loadingdata: boolean = false;
    buttonloading: boolean = true;
    validdate: boolean;
    userForm: any;
    ssnno = {};
    objLoginPage = {
        type: 'objLoginPage'
    };
    obj = {
        type: 'Logout'

    };
    objLogin = {
        type: 'Login'
    };
    error1: string;
    tenantData: TenantResponse;
    appintmenttype: string;
    serachModel: SearchModel;
    locationtype: string;
    dobselect: boolean;
    ssnverified: boolean;
    // selectedDate: any;
    model: any = { 'DOB': '' };
    postDateFormat = 'dd/MMM/yyyy';
    enterdatests: boolean;
    dateMask = MaskedDate;
    regModel: RegistrationModel;
    date: Date = new Date();
    stateNames: any = [];
    phonests: boolean;
    unmask = UnMaskedData;
    dob: INgxMyDpOptions = {
        // other options...
        dateFormat: 'mm/dd/yyyy',
        firstDayOfWeek: 'mo',
        markCurrentDay: true,
        disableHeaderButtons: true,
        disableSince: { year: this.date.getFullYear(), month: this.date.getMonth() + 1, day: this.date.getDate() },
        selectorHeight: '232px',
        selectorWidth: '250px'
    };
    forget: boolean = false;
    constructor(private formBuilder: FormBuilder, public _registrationService: RegistrationService,
        private _profileSettingsService: ProfileSettingsService,
        public toastr: ToastsManager, vcr: ViewContainerRef,
        private authservice: AuthService, public datepipe: DatePipe) {
        this.toastr.setRootViewContainerRef(vcr);
        this.validdate = false;
        this.enterdatests = false;
        this.phonests = false;
        this.appintmenttype = '';
        this.serachModel = new SearchModel();
        this.tenantData = new TenantResponse();
        this.locationtype = '';
        this.regModel = new RegistrationModel();
        this.userForm = this.formBuilder.group({
            'DOB': [''],
            'FirstName': ['', Validators.required, ValidationService.alphabeticsValidator],
            'LastName': ['', Validators.required, ValidationService.alphabeticsValidator],
            'Email': ['', Validators.required, ValidationService.emailValidator],
            'PhoneNo': ['', Validators.required],
            'Address': ['', Validators.required],
            'Address2': [''],
            'City': [''],
            'State': [''],
            'Zipcode': ['', [Validators.required, Validators.minLength(5), Validators.maxLength(5)],
                ValidationService.numericalsValidatorFromone],
            'Message': [''],
            'SSN': ['']
        });
        setTimeout(() => {
            let appoinmnetid: any;
            let locationid: any;
            const tenantData = localStorage.getItem('TenantData');
            if (tenantData != null) {
              this.tenantData = JSON.parse(tenantData) as TenantResponse;
              // console.log(this.tenantData);
              this.regModel.City = this.tenantData.OrganisationSettings.DefaultLocationName;
              locationid = this.tenantData.OrganisationSettings.DefaultLocationId;
              this.serachModel.Location =  locationid;
            }
          }, 1000);
    }
    ngOnInit() {
        // on page load calling get
        this.getStateNames(231);
    }
    onInputFieldDobChanged(event: IMyInputFieldChanged) {
        this.enterdatests = false;
        this.validdate = false;
        // if (event.value.length >= 1) {
        // alert();
        //  this.enterdatests = true;
        // alert();
        // console.log('yes its 1');
        //   }
        // this.ngxdp.clearDate();
     //   console.log('IMyInputFieldChanged' + JSON.stringify(event.value) + ',' + event.value.length + ',' + event.valid);
        if (event.value.length >= 1) {
            //   this.convertDateFormate(event.value);
            this.enterdatests = true;
        }
        if (event.value.length === 10) {
            this.validdate = event.valid;
         //   console.log(this.validdate);
            const selectedDate = new Date(event.value.toString());
            const mydate: IMyDate = {
                year: selectedDate.getFullYear(),
                month: selectedDate.getMonth(),
                day: selectedDate.getDay()
            };
            const dobmodal: IMyDateModel = {
                date: mydate,
                jsdate: selectedDate,
                formatted: event.value.toString(),
                epoc: 1
            };
            // alert(event.value);
           // console.log('dobmodal' + JSON.stringify(dobmodal));
            if (this.validdate) {
                // this.enterdatests = false;
                this.onDateChanged(dobmodal);
            } else {
                this.error('Please click on calender icon and select DOB.');
                this.ngxdp.clearDate();
            }
        }
    }
    onDateChanged(event: IMyDateModel): void {
        // console.log('dddddddddd' + event.formatted);
        //  this.enterdatests = false;
        this.model.DOB = event.formatted;
     //   console.log('dddddddddd' + this.model.DOB);
        this.regModel.DOB = this.datepipe.transform(this.model.DOB, this.postDateFormat);
    }
    /* get state names*/
    getStateNames(countryid) {
        return this._registrationService.getstateNames(countryid)
            .subscribe(arg => {
                this.stateNames = arg.data;
                // console.log(JSON.stringify((this.stateNames)));
            });
    }
    registartion() {
        if (this.userForm.dirty && this.userForm.valid) {
            if (this.phonests == false) {
                this.buttonloading = false;
                this.loadingdata = true;
            //    console.log(this.regModel);
                return this._registrationService.regservice(this.regModel).subscribe
                    (
                    res => {
                       // console.log(res);
                        if (res.Success) {

                            this.success('Registration completed successfully.Check your e-mail for login details');
                        } else {
                            this.error(res.data);
                        }
                    },
                    err => console.log(err)
                    );
            }
        }
        else {
            this.validateAllFormFields(this.userForm);
        }
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
                this.loadingdata = false;
                this.buttonloading = true;
                // jQuery('#registration').modal('hide');
                this.model.DOB = '';
                this.regModel = new RegistrationModel();
                this.getlogintypeCall.emit(this.obj);
            }, 4000);
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
                // jQuery('#creditcardadd').modal('hide');
                // this.getCreditcardInfo().add(() => {
                // });
                this.loadingdata = false;
                this.buttonloading = true;
            }, 3000);
        });
    }
    LoginEvent(obj) {
        if (obj.type === 'Logout') {
            this.getlogintypeCall.emit(this.obj);
        }

    }
    close() {
        // this.regModel = new RegistrationModel();
        this.phonests = false;
        this.getlogintypeCall.emit(this.objLoginPage);
    }
    ssnverify(ssnno) {
        if (ssnno.length === 9) {
            this.ssnno = {
                'SSN': ssnno
            };
            this._profileSettingsService.ssnverify(this.ssnno).subscribe(
                res => {
                    // console.log(res);
                    if (res.Success === false) {
                        this.ssnverified = false;
                        this.error1 = '';
                    } else {
                        this.error1 = 'SSN Number Already Exists';
                        this.ssnverified = true;
                    }
                });
        }
    }
    getNHSNumberMask() {
        return {
            mask: ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
            guide: true,
            placeholderChar: '_',
            keepCharPositions: true
        };
    }
    unmasckphone() {
        this.phonests = false;
        if (this.regModel.PhoneNo !== '') {
            // console.log('@@@' + this.model.PhoneNo);
            this.regModel.PhoneNo = this.unmask(this.regModel.PhoneNo);
     //       console.log(this.regModel.PhoneNo);
            if (this.regModel.PhoneNo.length !== 10) {
                this.phonests = true;
            } else {
                this.phonests = false;
            }
        }
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
    login() {
        this.getlogintypeCall.emit(this.objLogin);
    }
}