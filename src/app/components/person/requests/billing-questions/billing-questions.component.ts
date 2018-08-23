import { Toast } from 'ng2-toastr/src/toast';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PersonRequestsModel, RequestTypeIdEnum } from './../../../../models/requests.model';
import { Component, OnInit, ViewContainerRef, Input, ViewChild } from '@angular/core';
import { ValidationService } from './../../../../shared/validation/validation.service';
import { ValidationComponent } from './../../../../shared/validation/validation.component';
import { PersonRequestsService } from '../requests.service';
import { INgxMyDpOptions, IMyDateModel, IMyInputFieldChanged, IMyDate } from 'ngx-mydatepicker';
import { NgxMyDatePickerDirective } from 'ngx-mydatepicker';
import { PersonComponent } from './../../person.component';
declare var jQuery: any;
import { ToastService } from '../../../../shared/services/toastService';
import { ModalDirective } from 'angular-bootstrap-md';
import { UnMaskedData } from '../../../../shared/services/unmaskdata';
import { MaskedDate } from '../../../../shared/services/datemask';
import { DateFormat } from '../../../../shared/services/dateFormat';
import { RequestPipe } from '../requestPipe';
import { RequestFilterPipe } from '../requestFilterPipe';
import { OrderPipe } from 'ngx-order-pipe';
@Component({
    moduleId: module.id,
    selector: 'app-billing-questions',
    templateUrl: 'billing-questions.component.html',
    styleUrls: ['billing-questions.component.scss'],
    providers: [PersonRequestsService,ToastService,DatePipe,OrderPipe]
})
export class BillingQuestionsComponent implements OnInit {
    @ViewChild('addRequests') public addRequests: ModalDirective;
    @ViewChild('edit') public edit: ModalDirective;
    @ViewChild('BillDateOfService') ngxdp: NgxMyDatePickerDirective;
    @ViewChild('RequestedOnEdit') editdate: NgxMyDatePickerDirective;
    @ViewChild('deletebillingquestion') public deletebillingquestion: ModalDirective;
    requesttypeId: number;
    validdate: boolean;
    enterdatests:boolean;
    windowWidth: number;
    navWindowWidth: number;
    requestType: string;
    order: string ;
    reverse: boolean = false;
    userFilter: string;
    dateMask = MaskedDate;
    patientData: any = {};
    StatusMessage = {};
    msgtype: string;
    lookupsDropdown: any = [];
    unmask = UnMaskedData;
    phonests: boolean;
    providerDropdown: any = [];
    personrequestForm: any;
    personrequestmodel: PersonRequestsModel;
    date: Date = new Date();
    requestsList: any = [];
    selecteDate: string;
    medicineId: number;
    msg:string;
    status:boolean;
    dateFormatPipeFilter: DateFormat;
    disableButton: boolean;
    indexvalue:number;
    postDateFormat = 'dd/MMM/yyyy';
    model: any = {'serviceDate' : ''};
    requestDate: INgxMyDpOptions = {
        // other options...
        dateFormat: 'mm/dd/yyyy',
        disableWeekends: true,
        firstDayOfWeek: 'mo',
        markCurrentDay: true,
        disableHeaderButtons: true,
       // disableUntil: { year: this.date.getFullYear(), month: this.date.getMonth() + 1, day: this.date.getDate() - 1 },
        disableSince: { year: this.date.getFullYear(), month: this.date.getMonth() + 1, day: this.date.getDate() + 1 },
    };
    page  = 0;
    constructor(private _personRequestsService: PersonRequestsService,
        private orderPipe: OrderPipe, private router: Router, private formBuilder: FormBuilder,
        public toastr: ToastsManager, private toast: ToastService, vcr: ViewContainerRef, 
        public _personcomponent: PersonComponent, public datepipe: DatePipe) {
        this.personrequestmodel = new PersonRequestsModel();
        this.dateFormatPipeFilter = new DateFormat();
        this.toastr.setRootViewContainerRef(vcr);
        this.validdate = false;
        this.enterdatests = false;
        this.status=false;
        this.patientData = JSON.parse(localStorage.getItem('loginData'));
        this.personrequestmodel.PhoneNo = this.patientData.Phone;
        this.personrequestmodel.Email = this.patientData.Email;
        // alert(this.requestType);
         this.disableButton = false;
         this.phonests = false;
         this.requesttypeId = RequestTypeIdEnum.requestBilling;
         this.msgtype = 'Billing Questions';
        this.personrequestForm = this.formBuilder.group({
            'PhoneNo': ['', Validators.required],
        'BillClaimNo': ['', Validators.maxLength(10)],
        'BillDateOfService': [''],
        'Details': ['', Validators.required],
        'Email': ['', Validators.required, ValidationService.emailValidator]
        });
        this._personcomponent.Popupopenclose('close');
    }
    
    ngOnInit() {
        // this.getLookups();
        this.getProvidersList();
        this.getRequestList();
    }
    onInputFieldDobChanged(event: IMyInputFieldChanged) {
        this.enterdatests = false;
        this.validdate = false;
        if (event.value.length >= 1) {

        this.enterdatests = true;
        }
       // console.log('IMyInputFieldChanged' + JSON.stringify(event.value) + ',' + event.value.length + ',' + event.valid);
        if (event.value.length === 10) {
            this.validdate = event.valid;
            // this.validdatecheck = true;
           // this.validdate=true;
         //   console.log(this.validdate);
            const selectedDate = new Date(event.value.toString());
            const mydate: IMyDate = {
                year: selectedDate.getFullYear(),
                month: selectedDate.getMonth(),
                day: selectedDate.getDay()
            }
            const dobmodal: IMyDateModel = {
                date: mydate,
                jsdate: selectedDate,
                formatted: event.value.toString(),
                epoc: 1
            };
            // alert(event.value);
          //  console.log('dobmodal' + JSON.stringify(dobmodal));
            if (this.validdate) {
                this.enterdatests = false;
                    this.onDateChanged(dobmodal);
            } else {
                    this.error('Please click on calender icon and select DOB.', 'dalete');
                    this.ngxdp.clearDate();
            }
        }
    }
    /**
     *
     * @param event
         When clicking on calendar to get the Birthdate from IMyDateModel
     */
    onDateChanged(event: IMyDateModel): void {
        // alert('onDateChanged');
        this.enterdatests = false;
        this.selecteDate = event.formatted;
      //  console.log(this.selecteDate);
    }
    Message(data, Id) {
        // alert(data.Id+"     "+Id);
        this.msg = data.ReplyMessage;
        if (data.ReadStatus === false ){
            this.StatusMessage = {
                Id : Id,
                ReadStatus : true
            }
            this._personRequestsService.postReadStatus(this.StatusMessage).subscribe(
                res => {
                 //   console.log((JSON.stringify(res)));
                    this.getRequestList().add(() => {
                    });
                });
        }
          // tslint:disable-next-line:radix
       this.windowWidth = parseInt( localStorage.getItem('windowWidth'));
       if (this.windowWidth < 1270) {
          this._personcomponent.Popupopenclose('open');
      }
        // if (data.Id === Id) {
        //     this.status = true;

        // } else {
        //     this.status = false;
        // }
    }

    getProvidersList() {
        return this._personRequestsService.getProvidersList().subscribe(
            res => {
              //  console.log('provider list' + (JSON.stringify(this.providerDropdown = res.data)));
            }
        );
    }
    /**
 * to medicine refill list
 */

    getRequestList() {
        return this._personRequestsService.getRequest(this.patientData.Id , this.requesttypeId).subscribe(
            res => {
                this.requestsList = res.data;
               //  console.log('testresult' + JSON.stringify(this.requestsList));
                 this.disableButton = false;
                 this.order = 'Details';
            }
        );
    }
    setOrder(value: string) {
        // if (this.order === value) {
          this.reverse = !this.reverse;
        // }
     //   console.log(this.orderPipe.transform(this.providerData, this.order));
        // this.providerData = this.orderPipe.transform(this.providerData, this.order);
        this.order = value;
      }
    /**
     * to post medicine refill
     */
    addRequestSave() {
        // alert (this.validdate);
        // if (!this.validdate) {
        //     this.ngxdp.clearDate();
        // }
       // alert(this.enterdatests)
        if (this.enterdatests === true && this.validdate === false) {
            // alert('if');
            this.error('Please click on calender icon and select DOB.', 'dalete');
            this.ngxdp.clearDate();
        } else if (this.phonests == false) {
           // alert('else');
        const fromdt = this.datepipe.transform(this.date, 'dd/MMM/yyyy');
        this.personrequestmodel.CreatedOn = fromdt + ' ' + this.date.getHours() + ':'
            + this.date.getMinutes() + ':' + this.date.getSeconds();
        this.personrequestmodel.BillDateOfService = this.datepipe.transform(this.selecteDate, 'dd/MMM/yyyy');
        this.personrequestmodel.PersonId = this.patientData.Id;
        this.personrequestmodel.RequestTypeId = this.requesttypeId;
        this.personrequestmodel.CreatedBy = this.patientData.Id;
        this.personrequestmodel.IsActive = true;
      // alert(JSON.stringify(this.personrequestmodel));
         this.disableButton = true;
        this._personRequestsService.addRequestSave(this.personrequestmodel).subscribe(
            res => {
               // console.log((JSON.stringify(res)));
                if (res.Success) {
                    this.success(this.msgtype + ' ' + 'Added', 'add');
                    this._personcomponent.Popupopenclose('close');
                } else {
                    this.error('Please provide valid Information', 'add');
                }
            },
            err => console.log(err)
        );
    } // close elses
    }
    /** to clear  model when click on Add */
    toClearModel(status) {
        this.phonests = false;
        this.personrequestmodel = new PersonRequestsModel();
        this.personrequestmodel.PhoneNo = this.patientData.Phone;
        this.personrequestmodel.Email = this.patientData.Email;
        this.ngxdp.clearDate();
         this.disableButton = false;
         this.navWindowWidth = parseInt(localStorage.getItem('navWindowWidth'));
         // tslint:disable-next-line:radix
         this.windowWidth = parseInt( localStorage.getItem('windowWidth'));
          console.log( this.windowWidth + ',' + this.navWindowWidth);
         // console.log(this.windowWidth < this.navWindowWidth);
      if (this.windowWidth < 1270) {
         if (status === 'open') {
         this._personcomponent.Popupopenclose('open');
         } else {
             this._personcomponent.Popupopenclose('close');
         } 
     }
    }
    /**
     * on Click of Edit
     * @param value
     */
    onEdit(value) {
        this.phonests = false;
    //    console.log('on edit' + JSON.stringify(value));
        this.personrequestmodel = value;
     //   console.log(this.personrequestmodel.BillDateOfService);
        if (this.personrequestmodel.BillDateOfService !== null) {
        this.personrequestmodel.BillDateOfService =  this.dateFormatPipeFilter.transform(this.personrequestmodel.BillDateOfService);
        }
        this.medicineId = this.personrequestmodel.Id;
        this.selecteDate = this.personrequestmodel.BillDateOfService;
         this.disableButton = false;
          // tslint:disable-next-line:radix
       this.windowWidth = parseInt( localStorage.getItem('windowWidth'));
       if (this.windowWidth < 1270) {
          this._personcomponent.Popupopenclose('open');
      }
    }
    editRequest() {
        if (this.enterdatests === true && this.validdate === false) {
            // alert('if');
            this.error('Please click on calender icon and select Date of service.', 'dalete');
            this.ngxdp.clearDate();
        } else if (this.phonests == false) {
           // alert('else');
         this.personrequestmodel = this.personrequestForm.value;
        const fromdt = this.datepipe.transform(this.date, 'dd/MMM/yyyy');
        this.personrequestmodel.ModifiedOn = fromdt + ' ' + this.date.getHours() +
            ':' + this.date.getMinutes() + ':' + this.date.getSeconds();
         this.personrequestmodel.BillDateOfService = this.datepipe.transform(this.selecteDate, this.postDateFormat);
        this.personrequestmodel.PersonId = this.patientData.Id;
        this.personrequestmodel.ModifiedBy = this.patientData.Id;
        this.personrequestmodel.Id = this.medicineId;
        this.personrequestmodel.IsActive = true;
      //  console.log(this.personrequestmodel);
          this.disableButton = true;
        this._personRequestsService.editRequest(this.personrequestmodel).subscribe(
            res => {
             //   console.log((JSON.stringify(res)));
                if (res.Success) {
                    this.success(this.msgtype + ' ' + 'updated', 'update');
                    this._personcomponent.Popupopenclose('close');
                } else {
                    this.error('Please provide valid information', 'update');
                }
            },
            err => console.log(err)
        );
    }
}
onDelete(data){
    this.personrequestmodel=data;
  }
    deleteRequest(data) {
        // const fromdt = this.datepipe.transform(this.date, 'dd/MMM/yyyy');
        // const model = {
        //     'Id': id,
        //     'IsActive': false,
        //     'ModifiedOn': fromdt + ' ' + this.date.getHours() +
        //         ':' + this.date.getMinutes() + ':' + this.date.getSeconds(),
        //     'ModifiedBy': this.patientData.Id
        // };
        this.disableButton = true;
        this._personRequestsService.deleteRequest(data).subscribe(
            res => {
            //    console.log((JSON.stringify(res)));
                if (res.Success) {
                    this.success(this.msgtype + ' ' + 'deleted', 'delete');
                } else {
                    this.error(this.msgtype + ' ' + 'is not deleted', 'delete');
                }
            },
            err => console.log(err)
        );
    }
    getNHSNumberMask() {
        return {
          mask: ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
          guide: true,
          placeholderChar: '_',
          keepCharPositions: true
        };
      }
      unmasckphone(event) {
        this.phonests = false;
        if (this.personrequestmodel.PhoneNo !== '') {
          //   console.log('@@@' + this.personrequestmodel.PhoneNo);
            this.personrequestmodel.PhoneNo = this.unmask(event.target.value);
         //   console.log(this.personrequestmodel.PhoneNo);
            if (this.personrequestmodel.PhoneNo.length !== 10) {
                this.phonests = true;
            } else {
                this.phonests = false;
            }
          //  console.log(this.phonests);
        }
    }
   /** Add,Edit,delete Referral methods end */
    /** Toast messages for success and failure */
    success(successmsg, type) {
        this.toast.ShowAlert(successmsg, '', 'Success');
        if (type === 'add') {
            this.addRequests.hide();
        }
        if (type === 'update') {
            this.edit.hide();
        }
        if (type === 'delete') {
            this.deletebillingquestion.hide();
        }
        this.getRequestList().add(() => {
        });
    }
    error(errormsg, type) {
        this.toast.ShowAlert(errormsg, '', 'Error');
        this.disableButton = false;
    }
    
}
