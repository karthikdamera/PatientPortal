
import { Component, ViewContainerRef, AfterViewInit, ViewChild } from '@angular/core';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { DatePipe, AsyncPipe } from '@angular/common';
import { ToastsManager } from 'ng2-toastr';
import { Toast } from 'ng2-toastr';
import { SettingServices } from '../settingServices';
import { Mailsetting } from '../../../../models/mailupload.model';
import { ValidationService } from '../../../../shared/validation/validation.service';
import { ValidationComponent } from '../../../../shared/validation/validation.component';
import { AsyncValidatorFn, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ToastService } from '../../../../shared/services/toastService';
import { ModalDirective } from 'angular-bootstrap-md';
declare var jQuery: any;

@Component({
    selector: 'app-mail-settings',
    templateUrl: './mail-settings.component.html',
    styleUrls: ['./mail-settings.component.scss'],
    providers: [DatePipe, SettingServices, ToastService, ToastsManager]
})
export class MailSettingsComponent implements OnInit {
    private _rootViewContainerRef: ViewContainerRef;
    @ViewChild('emailaddModal1') public emailaddModal: ModalDirective;
    @ViewChild('maileditmodel') public edit: ModalDirective;
    disableButton: boolean;
    mailForm: FormGroup;
    postDateFormat = 'dd/MMM/yyyy';
    page: number;
    editsts: boolean;
    mailData: any = [];
    UserName: string;
    sparkkey: string;
    type: string;
    enginetype: string;
    mailsetting: Mailsetting;
    patientData: any = {};
    mailsettingId: number;

    constructor(private _toast: ToastService, public toastr: ToastsManager, vRef: ViewContainerRef,
        public datepipe: DatePipe,
        private _SettingsService: SettingServices,
        private formBuilder: FormBuilder) {
        this.patientData = JSON.parse(localStorage.getItem('loginData'));
        //  this.toastr.setRootViewContainerRef(vcr);
        this.page = 1;
        this.type = '';
        this.disableButton = false;
        this.editsts = true;
        this.sparkkey = '';
        this.UserName = '';
        this.mailsetting = new Mailsetting();
        this.mailForm = this.formBuilder.group({
            'Host': ['', Validators.required],
            'Port': ['', Validators.required, ValidationService.numericalsValidatorFromzero],
            'UserName': ['', Validators.required, ValidationService.emailValidator],
            'Password': ['', Validators.required],
            'EnableSsl': ['', Validators.required],
        });
        this._rootViewContainerRef = vRef;
    }

    ngOnInit() {
        this.toastr.setRootViewContainerRef(this._rootViewContainerRef);
        this.getMailInfo();
    }
    /**
    * mail  get call
    */
    getMailInfo() {
        return this._SettingsService.getmailDetails().subscribe(
            res => {
             //   console.log('mail data' + (JSON.stringify(this.mailData = res.data)));
                this.mailData = res.data;
                this.mailsetting = res.data[0];
                this.enginetype = this.mailData[0].EngineType;
              //  this.sparkkey = this.mailData[0].sparkkey;
            //     this.UserName = this.mailData[0].EngineType;
            console.log(JSON.stringify(this.mailData));
            }
        );
    }
    /**Add mail functionality */
    Addmailsetting() {
        let date: any;
        date = new Date();
        if (this.mailForm.dirty && this.mailForm.valid) {
            const fromdt = this.datepipe.transform(date, 'dd/MMM/yyyy');
            this.mailsetting.CreatedOn = fromdt + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
            this.mailsetting.CreatedBy = this.patientData.Id;
            this.mailsetting.ModifiedOn = fromdt + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
            this.mailsetting.ModifiedBy = this.patientData.Id;
            this.mailsetting.IsActive = true;
        //    console.log(this.mailsetting);
            this.disableButton = true;
            this._SettingsService.mailsettingPost(this.mailsetting).subscribe(
                res => {
               //     console.log((JSON.stringify(res)));
                    if (res.Success) {
                        this.success('SMTP Setting added', 'add');
                    } else {
                        this.error('Please provide valid information', 'add');
                    }
                },
                err => console.log(err)
            );
        } else {
            this.validateAllFormFields(this.mailForm);
        }
    }
    /** edit maildata */
    onEdit(value) {
     //   console.log('on edit' + JSON.stringify(value));
        this.mailsetting = value;
        this.mailsettingId = this.mailsetting.Id;
        this.disableButton = false;
        //this.editsts=true;
    }
    // Cancel(){
    //     this.editsts=false;
    // }
    /** editupdate maildata */
    Editupdatemail1(value) {
        if (this.mailForm.valid) {}
        if (this.enginetype === 'SMTP' ) {
        let date: any;
        date = new Date();
        this.mailsetting = value;
        //  console.log(value);
        //   if (this.mailForm.dirty && this.mailForm.valid) {
        // alert('valid');
        this.mailsettingId = this.mailsetting.Id;
        this.disableButton = false;
        this.mailsetting.EngineType = this.enginetype;
        this.mailsetting = this.mailForm.value;
        this.mailsetting.IsDefault  = true;
        const fromdt = this.datepipe.transform(date, 'dd/MMM/yyyy');
        this.mailsetting.CreatedOn = fromdt + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
        this.mailsetting.CreatedBy = this.patientData.Id;
        this.mailsetting.ModifiedOn = fromdt + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
        this.mailsetting.ModifiedBy = this.patientData.Id;
        this.mailsetting.Id = this.mailsettingId;
       console.log(this.mailsetting);
        this.disableButton = true;
    } else if (this.enginetype === 'SparkPost') {
        this.mailsetting = new Mailsetting();
        this.mailsetting.SparkKey = this.sparkkey;
        this.mailsetting.EngineType = this.enginetype;
        this.mailsetting.UserName = this.UserName;
        this.mailsetting.IsDefault = true;
    }
    console.log(JSON.stringify(this.mailsetting));
        this._SettingsService.mailsettingPost(this.mailsetting).subscribe(
            res => {
            //    console.log((JSON.stringify(res)));
                if (res.Success) {
                    this.success('SMTP setting updated', 'update');
                    // this.editsts=false;
                } else {
                    this.error('Please provide valid information', 'update');
                }
            },
            err => console.log(err)
        );
        // } else {
        //     this.validateAllFormFields(this.mailForm);
        //   }
    }
    Deletepmaildata(data) {
        let date: any;
        date = new Date();
        this.mailsetting = data;
        const fromdt = this.datepipe.transform(date, 'dd/MMM/yyyy');
        this.mailsetting.CreatedOn = fromdt + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
        this.mailsetting.CreatedBy = this.patientData.Id;
        this.mailsetting.ModifiedOn = fromdt + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
        this.mailsetting.ModifiedBy = this.patientData.Id;
        this.disableButton = true;
        this._SettingsService.deleteMailsetting(this.mailsetting).subscribe(
            res => {
            //    console.log((JSON.stringify(res)));
                if (res.Success) {
                    this.success('SMTP setting deleted', 'delete');
                    this.disableButton = false;
                } else {
                    this.error('SMTP setting  not deleted', 'delete');
                }
            },
            err => console.log(err)
        );
    }
    /** mail status active/inactive */
    statusChange(id, status, data) {
        let date: any;
        date = new Date();
        const modifiedon = this.datepipe.transform(date, this.postDateFormat);
        const model = {
            Id: id,
            IsDefault: status,
            'ModifiedBy': 0,
            'ModifiedOn': modifiedon
        };
        this._SettingsService.mailUpdatests(data).subscribe(
            res => {
            //    console.log((JSON.stringify(res)));
                if (res.Success) {
                    if (status) {
                        this.success('SMTP setting is Activated', 'chnage');
                    } else {
                        this.success('SMTP setting is Deactivated', 'chnage');
                    }
                } else {
                    this.error(res.data, 'chnage');
                }
            },
            err => console.log(err)
        );
    }
    /**
    * to clear model after add
    */
    toClearModel() {
        this.mailsetting = new Mailsetting();
        this.disableButton = false;
    }
    /** Toast messages for success and failure */
    success(successmsg, type) {
        //  alert('saved');
        this.toastr.setRootViewContainerRef(this._rootViewContainerRef);
        this._toast.ShowAlert(successmsg, '', 'Success');
        if (type === 'add') {
            this.emailaddModal.hide();
        }
        // if (type === 'update') {
        //     this.edit.hide();
        // }
        this.getMailInfo().add(() => {
        });
    }
    error(errormsg, type) {
        this.toastr.setRootViewContainerRef(this._rootViewContainerRef);
        this._toast.ShowAlert(errormsg, '', 'Error');
        this.disableButton = false;
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
