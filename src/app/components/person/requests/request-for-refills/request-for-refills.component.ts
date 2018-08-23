import { Toast } from 'ng2-toastr/src/toast';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { PersonRequestsModel, RequestTypeIdEnum } from './../../../../models/requests.model';
import { Component, OnInit, ViewContainerRef, Input, ViewChild , ChangeDetectorRef } from '@angular/core';
import { ValidationService } from './../../../../shared/validation/validation.service';
import { ValidationComponent } from './../../../../shared/validation/validation.component';
import { PersonRequestsService } from '../requests.service';
declare var jQuery: any;
import { SelectComponent } from 'ng2-select/ng2-select';
import { ToastService } from '../../../../shared/services/toastService';
import { ModalDirective } from 'angular-bootstrap-md';
import { UnMaskedData } from '../../../../shared/services/unmaskdata';
import { RequestPipe } from '../requestPipe';
import { OrderPipe } from 'ngx-order-pipe';
import { PersonComponent } from './../../person.component';
// import {SelectModule} from 'angular2-select';
// import { SelectModule } from 'ng2-select';
@Component({
    moduleId: module.id,
    selector: 'app-request-for-refills',
    templateUrl: 'request-for-refills.component.html',
    styleUrls: ['request-for-refills.component.scss'],
    providers: [PersonRequestsService,ToastService, DatePipe, OrderPipe]
})
export class RequestForRefillsComponent implements OnInit {
    @ViewChild('addRequests') public addRequests: ModalDirective;
    @ViewChild('edit') public edit: ModalDirective;
    @ViewChild('deleterefills') public deleterefills: ModalDirective;
    /**auto complete textbox input */
    @ViewChild('input') selectitems: SelectComponent;
    public medications: any;
    savinglist = [];
    StatusMessage = {};
    public finalmedications: Array<object> = [];
    public showlist: Array<object> = [];
    public selectedItems = [];
    public settings = {};
    public idarray: Array<object> = [];
    public editarray: Array<object> = [];
    public editsavearray: Array<object> = [];
    requesttypeId: number;
    userFilter: string;
    requestType: string;
    windowWidth: number;
    navWindowWidth: number;
    order: string ;
    reverse: boolean = false;
    patientData: any = {};
    array = [{id: 1, text: 'amer'},
    {id: 2, text: 'france'},
    {id: 3, text: 'india'},
    {id: 4, text: 'beg'}];
    phonenumber: string;
    email: string;
    msgtype: string;
    status: boolean;
    msg: string;
    unmask = UnMaskedData;
    phonests: boolean;
    // options: any=[];
    // mySelectValue: Array<string>; // Array of strings for multi select, string for single select.
    // model={'value':''};
    lookupsDropdown: any = [];
    providerDropdown: any = [];
    personrequestForm: FormGroup;
    personrequestmodel: PersonRequestsModel;
    date: Date = new Date();
    requestsList: any = [];
    selectedDate: string;
    medicineId: number;
    public value: any = [];
    disableButton: boolean;
    postDateFormat = 'dd/MMM/yyyy';
    // medicationsts: string;
    constructor(private _personRequestsService: PersonRequestsService, private router: Router, 
        private orderPipe: OrderPipe, private formBuilder: FormBuilder,
        public toastr: ToastsManager,  private toast: ToastService, vcr: ViewContainerRef,
        public _personcomponent: PersonComponent, public datepipe: DatePipe 
        , private cdr: ChangeDetectorRef) {
        this.personrequestmodel = new PersonRequestsModel();
        this.toastr.setRootViewContainerRef(vcr);
        this.patientData = JSON.parse(localStorage.getItem('loginData'));
        this.personrequestmodel.PhoneNo = this.patientData.Phone;
        this.personrequestmodel.Email = this.patientData.Email;
        // alert(this.requestType);
        this.disableButton = false;
        this.phonests = false;
        this.status = false;
        // this.medicationsts = 'false';
        this.requesttypeId = RequestTypeIdEnum.medicineRefills;
        this.msgtype = 'Request for Refills';
        this.personrequestForm = this.formBuilder.group({
            'PhoneNo': ['', Validators.required],
            'ProviderId': [''],
            'Id': [''],
            'Details': [''],
            'RefillMedicationId': [''],
            'RefillPharmacyId': ['', Validators.required],
            'Email': ['', Validators.required, ValidationService.emailValidator]
        });
        this._personcomponent.Popupopenclose('close');
    }
    ngOnInit() {
        this.getPersonMedications();
        this.getPharmacyDropdown();
        this.getProvidersList();
        this.getRequestList();
           this.cdr.detectChanges();
    }
    /**auto complete textbox code */
    public selectednew(value: any): void {
        this.savinglist.push(value.id);
      //  console.log(this.savinglist);
    }

    public removed(value: any): void {
        //  console.log('Removed value is: ', value);
        for (let i = 0; i <= this.savinglist.length - 1; i++) {
            //  alert(value.id+','+this.savinglist[i]);
            if (value.id === this.savinglist[i]) {
                this.savinglist.splice(i, 1);
            }
        }
        //  console.log(this.savinglist);
    }
    editselectednew(value) {
        this.editsavearray.push(value.id);
      //  console.log(this.editsavearray);
    }
    editremoved(value) {
        for (let i = 0; i <= this.editsavearray.length - 1; i++) {
            //  alert(value.id+','+this.editsavearray[i]);
            if (value.id === this.editsavearray[i]) {
                this.editsavearray.splice(i, 1);
            }
        }
    }
    public refreshValue(value: any): void {
        this.value = value;
    }

    /**
     * to get pharmacy dropdown
     */
    getPharmacyDropdown() {
        return this._personRequestsService.getPharmacyDropdown(this.patientData.Id).subscribe(
            res => {
               // console.log('pharmacy data' + (JSON.stringify(this.lookupsDropdown = res.data)));
                this.lookupsDropdown = res.data;
            }
        );
    }
    /**
     * to get medication dropdown
     */
    getPersonMedications() {
        // this.patientData.Id=220;
        this.finalmedications = [];
        return this._personRequestsService.getPersonMedication(this.patientData.Id).subscribe(
            res => {
                this.medications = res.data;
              //  console.log(this.medications);
                for (let i = 0; i <= this.medications.length - 1; i++) {
                    this.showlist.push({ 'id': this.medications[i].Id, 'text': this.medications[i].Medication });
                }
                this.finalmedications = this.showlist;
               // console.log(this.finalmedications);
                //        });
            });
    }
    /**
     *
     * to get provider dropdown
     */
    getProvidersList() {
        return this._personRequestsService.getProvidersList().subscribe(
            res => {
                this.providerDropdown = res.data;
                // console.log('provider list' + (JSON.stringify(this.providerDropdown = res.data)));
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
 * to medicine refill list
 */
    getRequestList() {
        return this._personRequestsService.getRequest(this.patientData.Id, this.requesttypeId).subscribe(
            res => {
                // console.log(res);
                this.requestsList = res.data;
              //  console.log('medicine refill list' + (JSON.stringify(this.requestsList)));
                this.disableButton = false;
              //  console.log(this.requestsList[0].ReadStatus);
              this.order = 'ProviderName';
              //  console.log(this.orderPipe.transform(this.ProviderName, this.order));
            }
        );
    }
    /**
     * to post medicine refill
     */
    public itemsToString(value: Array<any> = []): string {
        return value
            .map((item: any) => {
                return item;
            }).join(',');
    }
    addRequestSave() {
        if (this.savinglist.length > 0) {
            if (this.phonests == false) {
                const medicationid = this.itemsToString(this.savinglist);
                // console.log(medicationid);
                const fromdt = this.datepipe.transform(this.date, 'dd/MMM/yyyy');
                this.personrequestmodel.CreatedOn = fromdt + ' ' + this.date.getHours() + ':'
                    + this.date.getMinutes() + ':' + this.date.getSeconds();
                // this.personrequestmodel.RequestedOn = this.datepipe.transform(this.selectedDate, this.postDateFormat);
                this.personrequestmodel.PersonId = this.patientData.Id;
                this.personrequestmodel.RequestTypeId = this.requesttypeId;
                this.personrequestmodel.CreatedBy = this.patientData.Id;
                this.personrequestmodel.IsActive = true;
                this.personrequestmodel.RefillMedicationId = medicationid;
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
        } else {
            this.error('Please fill Medication', 'add');
        }
    }
    /** to clear  model when click on Add */
    toClearModel(status) {
        // alert();
        this.phonests = false;
        this.personrequestmodel = new PersonRequestsModel();
        this.personrequestmodel.PhoneNo = this.patientData.Phone;
        this.personrequestmodel.Email = this.patientData.Email;
        if (this.savinglist.length > 0) {
            // alert('list');
            //  console.log(this.selectitems);
            const itemObjects = this.selectitems.itemObjects;
            for (let itemObject of itemObjects) {
                this.selectitems.remove(itemObject);
            }
        }
        this.disableButton = false;
        this.showlist = [];
        this.savinglist = [];
        // this.refreshValue('');
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
    close() {
        this.editarray = [];
        this.idarray = [];
        this.editsavearray = [];
    }
    /**
     * on Click of Edit
     * @param value
     */
    onEdit(value) {
        this.phonests = false;
        this.editarray = [];
        this.idarray = [];
        this.editsavearray = [];
      //  console.log('on edit' + JSON.stringify(value));
        this.personrequestmodel = value;
        if (value.Medications.length > 0) {
            this.personrequestmodel.Medications = value.Medications;
          //  console.log(JSON.stringify(this.personrequestmodel.Medications));
            for (let i = 0; i <= this.personrequestmodel.Medications.length - 1; i++) {
                if (this.personrequestmodel.Medications[i].Medication !== null) {
                    this.idarray.push({ 'id': value.Medications[i].MedicationId, 'text': value.Medications[i].Medication });
                    this.editsavearray.push(value.Medications[i].MedicationId);
                }
            }
            this.editarray = this.idarray;
          //  console.log(JSON.stringify(this.editarray));
        }
      //  console.log(this.personrequestmodel.Medications);
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
        if ((this.personrequestForm.dirty) && (this.personrequestForm.valid)) {
            if (this.phonests == false) {
                if(this.editsavearray.length > 0) {
                this.personrequestmodel = this.personrequestForm.value;
                const fromdt = this.datepipe.transform(this.date, 'dd/MMM/yyyy');
                this.personrequestmodel.ModifiedOn = fromdt + ' ' + this.date.getHours() +
                    ':' + this.date.getMinutes() + ':' + this.date.getSeconds();
                // this.personrequestmodel.RequestedOn = this.datepipe.transform(this.selectedDate, this.postDateFormat);
             //   console.log(JSON.stringify(this.editsavearray));
                const medicationid = this.itemsToString(this.editsavearray);
                this.personrequestmodel.PersonId = this.patientData.Id;
                this.personrequestmodel.ModifiedBy = this.patientData.Id;
                this.personrequestmodel.Id = this.medicineId;
                this.personrequestmodel.RefillMedicationId = medicationid;
                this.personrequestmodel.IsActive = true;
               // console.log(JSON.stringify(this.personrequestmodel));
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
            } else {
                this.error('Please fill Medication', 'add');
            }
        } else {
            this.validateAllFormFields(this.personrequestForm);
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
              //  console.log((JSON.stringify(res)));
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
            allowDecimal: true,
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
         //   console.log(this.phonests);
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
            this.deleterefills.hide();
        }
        this.getRequestList().add(() => {
        });
    }
    error(errormsg, type) {
        this.toast.ShowAlert(errormsg, '', 'Error');
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
