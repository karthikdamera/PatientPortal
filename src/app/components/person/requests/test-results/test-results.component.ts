import { Toast } from 'ng2-toastr/src/toast';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PersonRequestsModel, RequestTypeIdEnum } from './../../../../models/requests.model';
import { Component, OnInit, ViewContainerRef, Input , ViewChild } from '@angular/core';
import { ValidationService } from './../../../../shared/validation/validation.service';
import { ValidationComponent } from './../../../../shared/validation/validation.component';
import { PersonRequestsService } from '../requests.service';
import { ToastService } from '../../../../shared/services/toastService';
import { ModalDirective } from 'angular-bootstrap-md';
import { UnMaskedData } from '../../../../shared/services/unmaskdata';
import { RequestPipe } from '../requestPipe';
import { OrderPipe } from 'ngx-order-pipe';
import { PersonComponent } from './../../person.component';
declare var jQuery: any;



@Component({
    moduleId: module.id,
    selector: 'app-test-results',
    templateUrl: 'test-results.component.html',
    styleUrls: ['test-results.component.scss'],
    providers: [PersonRequestsService,ToastService, DatePipe, OrderPipe]
})
export class TestResultsComponent implements OnInit {
    @ViewChild('addRequests') public addRequests: ModalDirective;
    @ViewChild('edit') public edit: ModalDirective;
    @ViewChild('deletetestresult') public deletetestresult: ModalDirective;
    requesttypeId: number;
    userFilter: string;
    requestType: string;
    phonenumber: string;
    email: string;
    patientData: any = {};
    msgtype: string;
    windowWidth: number;
    navWindowWidth: number;
    lookupsDropdown: any = [];
    providerDropdown: any = [];
    personrequestForm: FormGroup;
    personrequestmodel: PersonRequestsModel;
    date: Date = new Date();
    unmask = UnMaskedData;
    order: string ;
    reverse: boolean = false;
    phonests: boolean;
    msg: string;
    status: boolean;
    requestsList: any = [];
    selectedDate: string;
    medicineId: number;
    disableButton: boolean;
    postDateFormat = 'dd/MMM/yyyy';
    StatusMessage = {};
    constructor(private _personRequestsService: PersonRequestsService, private router: Router, private formBuilder: FormBuilder,
        public toastr: ToastsManager,private orderPipe: OrderPipe,
        public _personcomponent: PersonComponent, private toast: ToastService, vcr: ViewContainerRef, public datepipe: DatePipe) {
        this.personrequestmodel = new PersonRequestsModel();
        this.patientData = JSON.parse(localStorage.getItem('loginData'));
        this.personrequestmodel.PhoneNo = this.patientData.Phone;
        // alert(this.personrequestmodel.PhoneNo);
        this.personrequestmodel.Email = this.patientData.Email;
        // alert(this.requestType);
        this.disableButton = false;
        this.phonests = false;
        this.status = false;
        this.requesttypeId = RequestTypeIdEnum.testResults;
        this.msgtype = 'Test Results';
        this.personrequestForm = this.formBuilder.group({
            'PhoneNo': ['', Validators.required],
            'ProviderId': [''],
            'Details': [''],
            'Email': ['', Validators.required, ValidationService.emailValidator]
        });
        this._personcomponent.Popupopenclose('close');
    }
    ngOnInit() {
        // this.getLookups();
        this.getProvidersList();
        this.getRequestList();
    }
    getProvidersList() {
        return this._personRequestsService.getProvidersList().subscribe(
            res => {
                this.providerDropdown = res.data;
              //  console.log('provider list' + (JSON.stringify(this.providerDropdown = res.data)));
            }
        );
    }
    /**
 * to medicine refill list
 */
    getRequestList() {
        return this._personRequestsService.getRequest(this.patientData.Id, this.requesttypeId).subscribe(
            res => {
                this.requestsList = res.data;
                // console.log('testresult' + JSON.stringify(this.requestsList));
                this.disableButton = false;
                this.order = 'ProviderName';
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
        if (this.phonests == false) {
            const fromdt = this.datepipe.transform(this.date, 'dd/MMM/yyyy');
            this.personrequestmodel.CreatedOn = fromdt + ' ' + this.date.getHours() + ':'
                + this.date.getMinutes() + ':' + this.date.getSeconds();
            // this.personrequestmodel.RequestedOn = this.datepipe.transform(this.selectedDate, this.postDateFormat);
            this.personrequestmodel.PersonId = this.patientData.Id;
            this.personrequestmodel.RequestTypeId = this.requesttypeId;
            this.personrequestmodel.CreatedBy = this.patientData.Id;
            this.personrequestmodel.IsActive = true;
        //  console.log(this.personrequestmodel);
            this.disableButton = true;
            this._personRequestsService.addRequestSave(this.personrequestmodel).subscribe(
                res => {
                 //   console.log((JSON.stringify(res)));
                    if (res.Success) {
                        this.success(this.msgtype + ' ' + 'Added', 'add');
                        this._personcomponent.Popupopenclose('close');
                    } else {
                        this.error('Please provide valid Information', 'add');
                    }
                },
                err => console.log(err)
            );
        }
    }
    /** to clear  model when click on Add */
    toClearModel(status) {
        this.phonests = false;
        this.personrequestmodel = new PersonRequestsModel();
        this.personrequestmodel.PhoneNo = this.patientData.Phone;
        // alert(this.personrequestmodel.PhoneNo);
        this.personrequestmodel.Email = this.patientData.Email;
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
    // console.log('on edit' + JSON.stringify(value));
        this.personrequestmodel = value;
        this.medicineId = this.personrequestmodel.Id;
        // this.selectedDate = this.personrequestmodel.RequestedOn;
        this.disableButton = false;
        // tslint:disable-next-line:radix
       this.windowWidth = parseInt( localStorage.getItem('windowWidth'));
       if (this.windowWidth < 1270) {
          this._personcomponent.Popupopenclose('open');
      }
    }
    editRequest() {
        if (this.phonests == false) {
            this.personrequestmodel = this.personrequestForm.value;
            const fromdt = this.datepipe.transform(this.date, 'dd/MMM/yyyy');
            this.personrequestmodel.ModifiedOn = fromdt + ' ' + this.date.getHours() +
                ':' + this.date.getMinutes() + ':' + this.date.getSeconds();
            // this.personrequestmodel.RequestedOn = this.datepipe.transform(this.selectedDate, this.postDateFormat);
            this.personrequestmodel.PersonId = this.patientData.Id;
            this.personrequestmodel.ModifiedBy = this.patientData.Id;
            this.personrequestmodel.Id = this.medicineId;
            this.personrequestmodel.IsActive = true;
         //   console.log(this.personrequestmodel);
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
             //   console.log((JSON.stringify(res)));
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
            guide: false,
            allowDecimal: true,
            placeholderChar: '_',
            keepCharPositions: true
        };
    }
    unmasckphone(event) {
        this.phonests = false;
        if (this.personrequestmodel.PhoneNo !== '') {
        //    console.log('@@@' + this.personrequestmodel.PhoneNo);
            this.personrequestmodel.PhoneNo = this.unmask(event.target.value);
        //    console.log(this.personrequestmodel.PhoneNo);
            if (this.personrequestmodel.PhoneNo.length !== 10) {
                this.phonests = true;
            } else {
                this.phonests = false;
            }
            console.log(this.phonests);
        }
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
                //    console.log((JSON.stringify(res)));
                    this.getRequestList().add(() => {
                    });
                });
        }
        // if (data.Id === Id) {
        //     this.status = true;


        //     this.status = f
         // tslint:disable-next-line:radix
       this.windowWidth = parseInt( localStorage.getItem('windowWidth'));
       if (this.windowWidth < 1270) {
          this._personcomponent.Popupopenclose('open');
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
            this.deletetestresult.hide();
        }
        this.getRequestList().add(() => {
        });
    }
    error(errormsg, type) {
        this.toast.ShowAlert(errormsg, '', 'Error');
        this.disableButton = false;
    }

}
