import { ToastsManager } from 'ng2-toastr';
import { Component, OnInit, ViewContainerRef, ViewChild } from '@angular/core';
import { EmailSub } from '../../../../models/email-subject.model';
// import { DatePipe,AsyncPipe } from '@angular/common';
import { SettingServices } from '../settingServices';
import { Toast } from 'ng2-toastr';
declare var jQuery: any;
import { ModalDirective } from 'angular-bootstrap-md';
import { ToastService } from '../../../../shared/services/toastService';

@Component({
    selector: 'app-email-subject',
    templateUrl: './email-subject.component.html',
    styleUrls: ['./email-subject.component.scss'],
    providers: [SettingServices, ToastService, ToastsManager]
})
export class EmailSubjectComponent implements OnInit {
    private _rootViewContainerRef: ViewContainerRef;
    @ViewChild('emailaddModal') public demoBasic: ModalDirective;
    @ViewChild('maileditmodel') public edit: ModalDirective;
    emailsubject: EmailSub;
    disableButton: boolean;
    patientData: any;
    emailData: any = {};
    emailsubjectId: number;
    constructor(
        // public datepipe: DatePipe,
        private _toast: ToastService,
        public _settingServices: SettingServices, public toastr: ToastsManager, vRef: ViewContainerRef) {
        this.emailsubject = new EmailSub();
        // this.toastr.setRootViewContainerRef(vcr);
        this.patientData = JSON.parse(localStorage.getItem('loginData'));
        this._rootViewContainerRef = vRef;
    }
    ngOnInit() {
        // alert('email subject setting')
        this.toastr.setRootViewContainerRef(this._rootViewContainerRef);
        this.getEmailSubjects();

    }
    toClearModel() {
        this.emailsubject = new EmailSub();
        this.disableButton = false;
    }

    onEdit(value) {
      //  console.log('on edit' + JSON.stringify(value));
        this.emailsubject = value;
        // this.emailsubjectId = this.emailsubject.Id;
        this.disableButton = false;
    }

    AddEmailSetting() {
        let date: any;
        date = new Date();
        // if (this.mailForm.dirty && this.mailForm.valid) {
        //   const fromdt = this.datepipe.transform(date, 'dd/MMM/yyyy');
        // this.emailsubject.CreatedOn = fromdt + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
        // this.emailsubject.CreatedBy = this.patientData.Id;
        // this.emailsubject.ModifiedOn = fromdt + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
        // this.emailsubject.ModifiedBy = this.patientData.Id;
        // this.emailsubject.IsActive = true;
    //    console.log(this.emailsubject);
        this.disableButton = true;
        //   this.emailsubject.PatientRequest = '%request_type%';
        this.emailsubject.ApproveRequest = '%request_type% is %approved_rejected%';
        this._settingServices.emailsubjectPost(this.emailsubject).subscribe(
            res => {
        //        console.log((JSON.stringify(res)));
                if (res.Success) {
                    this.success('Subject Setting Added Successfully', 'add');
                } else {
                    this.error('Please provide valid information', 'add');
                }
            },
            err => console.log(err)
        );

    }
    getEmailSubjects() {
        return this._settingServices.getEmailSubjects().subscribe(
            res => {
                this.emailData = res.data;
         //       console.log(this.emailData);
            }
        );
    }
    Editupdatemail() {
        let date: any;
        date = new Date();
        // if (this.mailForm.dirty && this.mailForm.valid) {
        // this.mailsetting = this.mailForm.value;
        // const fromdt = this.datepipe.transform(date, 'dd/MMM/yyyy');
        // this.mailsetting.CreatedOn = fromdt + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
        // this.mailsetting.CreatedBy = this.patientData.Id;
        // this.mailsetting.ModifiedOn = fromdt + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
        // this.mailsetting.ModifiedBy = this.patientData.Id;
        // this.mailsetting.Id = this.mailsettingId;
     //   console.log(this.emailsubject);
        this.disableButton = true;

        //   this.emailsubject.PatientRequest = '%request_type%';
        this.emailsubject.ApproveRequest = '%request_type% is %approved_rejected%';
        this._settingServices.emailsubjectPost(this.emailsubject).subscribe(
            res => {
            //    console.log((JSON.stringify(res)));
                if (res.Success) {
                    this.success('Subject Setting Updated Successfully', 'update');
                } else {
                    this.error('Please provide valid information', 'update');
                }
            },
            err => console.log(err)
        );
    }


    success(successmsg, type) {
        this.toastr.setRootViewContainerRef(this._rootViewContainerRef);
        this._toast.ShowAlert(successmsg, '', 'Success');
        if (type === 'add') {
            this.demoBasic.hide();
        }
        if (type === 'update') {
            this.edit.hide();
        }
        this.getEmailSubjects().add(() => {
        });
    }
    error(errormsg, type) {
        this.toastr.setRootViewContainerRef(this._rootViewContainerRef);
        this._toast.ShowAlert(errormsg, '', 'Error');
        this.disableButton = false;
    }





}
