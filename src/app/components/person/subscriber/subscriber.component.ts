import { SubscriberService } from './subscriber.service';
import { SubsriberModel } from './../../../models/person-slot.model';
import { ValidationService } from './../../../shared/validation/validation.service';
import { ValidationComponent } from './../../../shared/validation/validation.component';
import { Component, OnInit, ViewContainerRef, ViewChild } from '@angular/core';
import { AsyncValidatorFn, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Toast } from 'ng2-toastr/src/toast';
import { DatePipe, AsyncPipe } from '@angular/common';
import { INgxMyDpOptions, IMyDateModel, IMyInputFieldChanged, IMyDate } from 'ngx-mydatepicker';
import { NgxMyDatePickerDirective } from 'ngx-mydatepicker';
import { DateFormat } from '../../../shared/services/dateFormat';
import { MaskedDate } from '../../../shared/services/datemask';
import { UnMaskedData } from '../../../shared/services/unmaskdata';
import { InsuranceService } from '../insurance/insurance.service';
import { ModalDirective } from 'angular-bootstrap-md';
import { PersonComponent } from '../person.component';
@Component({
    moduleId: module.id,
    selector: 'app-subscriber',
    templateUrl: 'subscriber.component.html',
    styleUrls: ['subscriber.component.scss'],
    providers: [DatePipe, SubscriberService]

})
export class SubscriberComponent implements OnInit {
    @ViewChild('addsubs') public editInsurance: ModalDirective;
    @ViewChild('edit') public addInsurance: ModalDirective;
    @ViewChild('Birthdate') ngxdp: NgxMyDatePickerDirective;
    disableButton: boolean;
    disableButtonSec: boolean;
    windowWidth: number;
    enterdatests: boolean;
    patientData: any = {};
    data: any;
    dateMask = MaskedDate;
    stateNames: any = [];
    subscriberForm1: any;
    unmask = UnMaskedData;
    date: Date = new Date();
    primarysubscribersaddsts = [];
    secondarysubscribersaddsts = [];
    sbscribemodel: SubsriberModel;
    ifpatientisSubscriber: boolean = false;
    phonests: boolean;
    phonestssec: boolean;
    patientinfo:boolean=true;
    dateFormatPipeFilter: DateFormat;
    subscriberForm: FormGroup;
    // variable used on click of edit to  change the view by using ng class
    editClass: boolean;
    editClassSec: boolean;
    model: any = { 'instype': '', 'checkp': '', 'patientprimarydob': '', 'patientdob': '', 'Birthdate': '' };
    types = ['Primary', 'Secondary'];
    pharmaId: number;
    validdate: boolean = false;
    myOptions: INgxMyDpOptions = {
        // other options...
        dateFormat: 'mm/dd/yyyy',
        firstDayOfWeek: 'mo',
        markCurrentDay: true,
        disableHeaderButtons: true,
        disableSince: { year: this.date.getFullYear(), month: this.date.getMonth() + 1, day: this.date.getDate() },
        selectorHeight: '232px',
        selectorWidth: '250px'
    };
    constructor(private router: Router, private formBuilder: FormBuilder,
        public toastr: ToastsManager, vcr: ViewContainerRef, public datepipe: DatePipe,
         private _subscriberService: SubscriberService,  private _personcomponent: PersonComponent) {
        this.validdate = false;
        this.editClass = false;
        this.editClassSec = false;
        this.disableButtonSec = false;
        this.enterdatests = false;
        this.model.checkp = true;
        this.phonests = false;
        this.phonestssec = false;
        this.sbscribemodel = new SubsriberModel();
        this.dateFormatPipeFilter = new DateFormat();
        this.toastr.setRootViewContainerRef(vcr);
        this.patientData = JSON.parse(localStorage.getItem('loginData'));
        this.subscriberForm = this.formBuilder.group({
            'SubscriberFirstName': ['', Validators.required, ValidationService.alphabeticsValidator],
            'SubscriberLastName': ['', Validators.required, ValidationService.alphabeticsValidator],
            'SubscriberEmail': ['', Validators.required, ValidationService.emailValidator],
            'Birthdate': [''],
            'stype': ['', Validators.required],
            'SubscriberPhoneNumber': ['', Validators.required],
            'SubscriberHomeAddress': ['', Validators.required],
            'SubscriberGender': ['', Validators.required],
            'RelationshipToPatient': ['', Validators.required],
            'SubscriberZipCode': ['', [Validators.required, Validators.minLength(5), Validators.maxLength(5)],
                ValidationService.numericalsValidatorFromone],
            'SubscriberCity': ['', Validators.required, ValidationService.alphabeticsValidator],
            'SubscriberState': ['', Validators.required],
        });
        this.subscriberForm1 = this.formBuilder.group({
            'SubscriberFirstName': ['', Validators.required, ValidationService.alphabeticsValidator],
            'SubscriberLastName': ['', Validators.required, ValidationService.alphabeticsValidator],
            'SubscriberEmail': ['', Validators.required, ValidationService.emailValidator],
            'Birthdate': [''],
            'SubscriberPhoneNumber': ['', Validators.required],
            'SubscriberHomeAddress': ['', Validators.required],
            'SubscriberGender': ['', Validators.required],
            'RelationshipToPatient': ['', Validators.required],
            'SubscriberZipCode': ['', [Validators.required, Validators.minLength(5), Validators.maxLength(5)],
                ValidationService.numericalsValidatorFromone],
            'SubscriberCity': ['', Validators.required, ValidationService.alphabeticsValidator],
            'SubscriberState': ['', Validators.required],
        });
        this._personcomponent.Popupopenclose('close');
    }
    ngOnInit() {
        this.ifpatientisSubscriber = false;
        this.getStateNames(231);
    this.getsubscinfo(); 
    this.sbscribemodel.SubscriberType="Primary";
        // throw new Error("Method not implemented.");
        // this.getsubscribeinfo();
        //  this.getsubInfo();
    }
    /* get state names*/
    getStateNames(countryid) {
        return this._subscriberService.getstateNames(countryid)
            .subscribe(arg => {
                this.stateNames = arg.data;
               // console.log(JSON.stringify((this.stateNames)));
            });
    }
    clear() {
        this.primarysubscribersaddsts = [];
        this.getsubscinfo();
    }
    onInputFieldDobChanged(event: IMyInputFieldChanged) {
        this.enterdatests = false;
        this.validdate = false;
        if (event.value.length >= 1) {
            //   this.convertDateFormate(event.value);
            this.enterdatests = true;
        }
        // this.ngxdp.clearDate();
    //    console.log('IMyInputFieldChanged' + JSON.stringify(event.value) + ',' + event.value.length + ',' + event.valid);
        if (event.value.length === 10) {
            this.validdate = event.valid;
            // this.validdatecheck = true;
            console.log(this.validdate);
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
          //  console.log('dobmodal' + JSON.stringify(dobmodal));
            if (this.validdate) {
                this.onDobChanged(dobmodal);
            } else {
                this.error('Please click on calender icon and select DOB.');
                this.ngxdp.clearDate();
            }
        }
    }
    /**
    *
    * @param event
        When clicking on calendar to get the Birthdate from IMyDateModel
    */
    onDobChanged(event: IMyDateModel): void {
        this.model.Birthdate = event.formatted;
        this.sbscribemodel.SubscriberDob = this.datepipe.transform(this.model.Birthdate, 'dd/MMM/yyyy');
      //  console.log(this.sbscribemodel.SubscriberDob);
    }
    /** changesubInsurance method when click on type */
    changesubInsurance(value) {
        // alert(value);
        this.model.instype = value;
        // this.getsubscribeinfo(value);
        //this.getsubInfo(value);
    }
    click(checkvalue, event) {
        // alert(event.target.checked);
        if (checkvalue.checkp) {
        
         //   console.log(checkvalue.checkp);
            this.getsubInfo(this.model.instype);
        } else {
            
         //   console.log(checkvalue.checkp + ',' + this.model.checkp);
            this.model.Birthdate = '';
            this.model.patientprimarydob = '';
            this.model.patientsecondarydob = '';
            this.sbscribemodel = new SubsriberModel();
        }
    }
    ifPatientisSuscriber(value) {
        this.ifpatientisSubscriber = true;
        
         this.model.checkp = true;
       // this.sbscribemodel = new SubsriberModel();
        this._subscriberService.getpatientInfo(this.patientData.Id).subscribe(
            res => {
                // console.log('profile info' + (JSON.stringify(this.sbscribemodel = res.data)));
                this.sbscribemodel.RelationshipToPatient = '';
                this.sbscribemodel.SubscriberFirstName = res.data.FirstName;
                this.sbscribemodel.SubscriberLastName = res.data.LastName;
                this.sbscribemodel.SubscriberDob = res.data.DOB;
                if (value === 'Primary' && this.sbscribemodel.SubscriberDob !== null) {
                    this.model.Birthdate = this.dateFormatPipeFilter.transform(this.sbscribemodel.SubscriberDob);
                    this.model.patientprimarydob = this.dateFormatPipeFilter.transform(this.sbscribemodel.SubscriberDob);
                } else {
                    if (this.sbscribemodel.SubscriberDob !== null) {
                        this.model.Birthdate = this.dateFormatPipeFilter.transform(this.sbscribemodel.SubscriberDob);
                        this.model.patientsecondarydob = this.dateFormatPipeFilter.transform(this.sbscribemodel.SubscriberDob);
                    }
                }
                this.sbscribemodel.SubscriberGender = res.data.Gender;
                this.sbscribemodel.SubscriberEmail = res.data.Email;
                this.sbscribemodel.SubscriberPhoneNumber = res.data.PhoneNo;
                this.sbscribemodel.SubscriberHomeAddress = res.data.Address;
                this.sbscribemodel.SubscriberCity = res.data.City;
                this.sbscribemodel.SubscriberState = res.data.State;
                this.sbscribemodel.SubscriberZipCode = res.data.Zipcode;
              //  console.log('profile info' + (JSON.stringify(this.sbscribemodel)));
            }
        );
    }
    getsubInfo(insvalue) {
        // tslint:disable-next-line:radix
        this.windowWidth = parseInt( localStorage.getItem('windowWidth'));
        if (this.windowWidth < 1270) {
           this._personcomponent.Popupopenclose('open'); 
       }
        this.getsubscribeinfo(insvalue);
    }
    getsubscinfo() {
        this.primarysubscribersaddsts = [];
        this._subscriberService.getSubscriber(this.patientData.Id).subscribe(
            res => {
                  this.data = res.data;
                  for (let i=0; i<=this.data.length-1;i++){
                      this.primarysubscribersaddsts.push(this.data[i]);
                  }
               //   console.log(this.primarysubscribersaddsts);
            });
    }
    ToClear(status) {
        this.sbscribemodel = new SubsriberModel();
        this.patientinfo = true;
        this.primarysubscribersaddsts = [];
        this.getsubscinfo();
        // tslint:disable-next-line:radix
        this.windowWidth = parseInt( localStorage.getItem('windowWidth'));
     if (this.windowWidth < 1270) {
        if (status === 'open') {
        this._personcomponent.Popupopenclose('open');
        } else {
            this._personcomponent.Popupopenclose('close');
        }
    }
    }
    changeInsurance(value) {
        this.model.instype = value;
this.patientinfo = false;
     }
    getsubscribeinfo(value) {
        //  alert(value);
        this.sbscribemodel = new SubsriberModel();
     //   console.log('before' + this.data);
        if (this.data.length === 0 || this.data.length == null || this.data.length === '') {
            this.model.checkp = true;
            //  alert('anu');
            this.ifPatientisSuscriber(value);
        } else {
            // alert(value);
            this.model.instype = value;
         //   console.log(this.model.checkp);
            let found = false;
            for (let i = 0; i <= this.data.length - 1; i++) {
          //      console.log(this.data[i]);
                if (this.data[i].SubscriberType === value) {
                    //  alert("yes")
                    this.model.checkp = false;
              //      console.log('after' + this.model.checkp);
                    found = true;
                    this.sbscribemodel.SubscriberDob = this.data[i].SubscriberDob;
                    if (value === 'Primary') {
                        // alert( this.model.checkp)
                        this.model.Birthdate = this.dateFormatPipeFilter.transform(this.sbscribemodel.SubscriberDob);
                        this.model.patientdob = this.dateFormatPipeFilter.transform(this.sbscribemodel.SubscriberDob);
                    }
                    if (value === 'Secondary') {
                        this.model.Birthdate = this.dateFormatPipeFilter.transform(this.sbscribemodel.SubscriberDob);
                        this.model.patientdob = this.dateFormatPipeFilter.transform(this.sbscribemodel.SubscriberDob);
                    }

                    this.sbscribemodel = this.data[i];
             //       console.log(JSON.stringify(this.sbscribemodel));
               //     console.log(this.model.patientdob)
                }
            }
          //  console.log(found);
            if (!found) {
                this.model.checkp = true;
                this.ifPatientisSuscriber(value);
            }
        }
        //alert( this.model.checkp)

    }
    editPrimary() {
        this.phonests = false;
      //  console.log(this.model.checkp);
        this.editClass = true;
        this.disableButton = false;
    }
    updatePrimary() {
        // alert();
        if ((this.subscriberForm.dirty) && (this.subscriberForm.valid) && (this.phonests == false)) {
            this.editClass = false;
            // alert();
        //    console.log(this.sbscribemodel.SubscriberType);
            const fromdt = this.datepipe.transform(this.date, 'dd/MMM/yyyy');
            this.sbscribemodel.CreatedOn = fromdt + ' ' + this.date.getHours() + ':' + this.date.getMinutes() + ':' + this.date.getSeconds();
            this.sbscribemodel.CreatedBy = this.patientData.Id;
            this.sbscribemodel.IsActive = true;
            this.sbscribemodel.ModifiedOn = fromdt + ' ' + this.date.getHours() +
                ':' + this.date.getMinutes() + ':' + this.date.getSeconds();
            this.sbscribemodel.PersonId = this.patientData.Id;
            this.sbscribemodel.ModifiedBy = this.patientData.Id;
            this.sbscribemodel.IsPatientSameAsSubscriber = false;
            this.sbscribemodel.SubscriberType = 'Primary';
            this.disableButton = true;
            this._subscriberService.AddandEditSubscriber(this.sbscribemodel).subscribe(
                res => {
                //    console.log((JSON.stringify(res)));
                    if (res.Success) {
                        this.success('Primary subscriber updated');
                    } else {
                        this.error(res.data);
                    }
                },
                err => console.log(err)
            );
        } else {
            this.validateAllFormFields(this.subscriberForm);
        }
    }
    ispatientsameassubscriber(model,type){
        if(type!=undefined){
        const fromdt = this.datepipe.transform(this.date, 'dd/MMM/yyyy');
        this.sbscribemodel.CreatedOn = fromdt + ' ' + this.date.getHours() + ':' + this.date.getMinutes() + ':' + this.date.getSeconds();
        this.sbscribemodel.CreatedBy = this.patientData.Id;
        this.sbscribemodel.IsActive = true;
        this.sbscribemodel.ModifiedOn = fromdt + ' ' + this.date.getHours() +
            ':' + this.date.getMinutes() + ':' + this.date.getSeconds();
        this.sbscribemodel.PersonId = this.patientData.Id;
        this.sbscribemodel.ModifiedBy = this.patientData.Id;
        this.sbscribemodel.IsPatientSameAsSubscriber = true;
        this.sbscribemodel.SubscriberType = type;
      //  console.log(JSON.stringify(this.sbscribemodel));
        this._subscriberService.AddandEditSubscriber(this.sbscribemodel).subscribe(
            res => {
              //  console.log((JSON.stringify(res)));
                if (res.Success) {
                    this.success('subscriber added');
                    this.addInsurance.hide();
                    this._personcomponent.Popupopenclose('close');
                } else {
                    this.error(res.data);
                }
            },
            err => console.log(err)
        );
    } else{
        this.error('Please select Subscriber Type');
    }
    }
    addsubscriber(type) {
        // alert(this.model.instype);
        if ((this.subscriberForm.valid) && (this.phonests == false)) {
            this.editClass = false;
            // alert();
          //  console.log(this.sbscribemodel.SubscriberType);
            const fromdt = this.datepipe.transform(this.date, 'dd/MMM/yyyy');
            this.sbscribemodel.CreatedOn = fromdt + ' ' + this.date.getHours() + ':' + this.date.getMinutes() + ':' + this.date.getSeconds();
            this.sbscribemodel.CreatedBy = this.patientData.Id;
            this.sbscribemodel.IsActive = true;
            this.sbscribemodel.ModifiedOn = fromdt + ' ' + this.date.getHours() +
                ':' + this.date.getMinutes() + ':' + this.date.getSeconds();
            this.sbscribemodel.PersonId = this.patientData.Id;
            this.sbscribemodel.ModifiedBy = this.patientData.Id;
            this.sbscribemodel.IsPatientSameAsSubscriber = false;
            this.sbscribemodel.SubscriberType = this.model.instype;
            this.disableButton = true;
          //  console.log(JSON.stringify(this.sbscribemodel));
            this._subscriberService.AddandEditSubscriber(this.sbscribemodel).subscribe(
                res => {
                 //   console.log((JSON.stringify(res)));
                    if (res.Success) {
                        this.success('subscriber added');
                        this.addInsurance.hide();
                        this._personcomponent.Popupopenclose('close');
                    } else {
                        this.error(res.data);
                    }
                },
                err => console.log(err)
            );
        } else {
            this.validateAllFormFields(this.subscriberForm);
        }
    }
    updatesubscriber(type) {
        if ((this.subscriberForm.valid) && (this.phonests == false)) {
            this.editClass = false;
            // alert();
         //   console.log(this.sbscribemodel.SubscriberType);
            const fromdt = this.datepipe.transform(this.date, 'dd/MMM/yyyy');
            this.sbscribemodel.CreatedOn = fromdt + ' ' + this.date.getHours() + ':' + this.date.getMinutes() + ':' + this.date.getSeconds();
            this.sbscribemodel.CreatedBy = this.patientData.Id;
            this.sbscribemodel.IsActive = true;
            this.sbscribemodel.ModifiedOn = fromdt + ' ' + this.date.getHours() +
                ':' + this.date.getMinutes() + ':' + this.date.getSeconds();
            this.sbscribemodel.PersonId = this.patientData.Id;
            this.sbscribemodel.ModifiedBy = this.patientData.Id;
            this.sbscribemodel.IsPatientSameAsSubscriber = false;
            this.sbscribemodel.SubscriberType = type;
            this.disableButton = true;
        //    console.log(this.sbscribemodel);
            this._subscriberService.AddandEditSubscriber(this.sbscribemodel).subscribe(
                res => {
             //       console.log((JSON.stringify(res)));
                    if (res.Success) {
                        this.success('subscriber updated');
                        this.editInsurance.hide();
                        this._personcomponent.Popupopenclose('close');
                    } else {
                        this.error(res.data);
                    }
                },
                err => console.log(err)
            );
        } else {
            this.validateAllFormFields(this.subscriberForm);
        }
    }
    editSecondary() {
        this.phonestssec = false;
      //  console.log(this.model.checkp);
        this.editClassSec = true;
        this.disableButtonSec = false;
    }
    updateSecondary() {
        // alert();
        if ((this.subscriberForm.dirty) && (this.subscriberForm.valid) && (this.phonestssec == false)) {
            // alert();
         //   console.log(this.sbscribemodel.SubscriberType);
            const fromdt = this.datepipe.transform(this.date, 'dd/MMM/yyyy');
            this.sbscribemodel.CreatedOn = fromdt + ' ' + this.date.getHours() + ':' + this.date.getMinutes() + ':' + this.date.getSeconds();
            this.sbscribemodel.CreatedBy = this.patientData.Id;
            this.sbscribemodel.IsActive = true;
            this.sbscribemodel.ModifiedOn = fromdt + ' ' + this.date.getHours() +
                ':' + this.date.getMinutes() + ':' + this.date.getSeconds();
            this.sbscribemodel.PersonId = this.patientData.Id;
            this.sbscribemodel.ModifiedBy = this.patientData.Id;
            this.sbscribemodel.IsPatientSameAsSubscriber = false;
            this.sbscribemodel.SubscriberType = 'Secondary';
            this.editClassSec = false;
            this.disableButtonSec = true;
            this._subscriberService.AddandEditSubscriber(this.sbscribemodel).subscribe(
                res => {
             //       console.log((JSON.stringify(res)));
                    if (res.Success) {
                        this.success('Secondary subscriber updated');
                       // this._personcomponent.Popupopenclose('close');

                    } else {
                        this.error(res.data);
                    }
                },
                err => console.log(err)
            );
        } else {
            this.validateAllFormFields(this.subscriberForm);
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
                this.getsubscinfo(); 
            }, 2000);
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
            }, 10000);
        });
    }
    getNHSNumberMask() {
        return {
            mask: ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
            guide: true,
            placeholderChar: '_',
            keepCharPositions: true
        };
    }
    getNHSNumberMasksec() {
        return {
            mask: ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
            guide: true,
            placeholderChar: '_',
            keepCharPositions: true
        };
    }
    unmasckphoneprimary() {
        this.phonests = false;
        if (this.sbscribemodel.SubscriberPhoneNumber !== '') {
       //     console.log('@@@' + this.sbscribemodel.SubscriberPhoneNumber);
            this.sbscribemodel.SubscriberPhoneNumber = this.unmask(this.sbscribemodel.SubscriberPhoneNumber);
         //   console.log(this.sbscribemodel.SubscriberPhoneNumber);
            if (this.sbscribemodel.SubscriberPhoneNumber.length !== 10) {
                this.phonests = true;
            } else {
                this.phonests = false;
            }
         //   console.log(this.phonests);
        }
    }
    unmasckphonesecondary() {
        this.phonestssec = false;
        if (this.sbscribemodel.SubscriberPhoneNumber !== '') {
        //    console.log('@@@' + this.sbscribemodel.SubscriberPhoneNumber);
            this.sbscribemodel.SubscriberPhoneNumber = this.unmask(this.sbscribemodel.SubscriberPhoneNumber);
        //    console.log(this.sbscribemodel.SubscriberPhoneNumber);
            if (this.sbscribemodel.SubscriberPhoneNumber.length !== 10) {
                this.phonestssec = true;
            } else {
                this.phonestssec = false;
            }
         //   console.log(this.phonests);
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
}
