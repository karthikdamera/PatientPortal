import { Component, OnInit, ViewContainerRef, ViewChild } from '@angular/core';
import { ToastService } from '../../../shared/services/toastService';
import { ToastsManager } from 'ng2-toastr';
import { ViewChildren, QueryList, ElementRef, HostListener, Renderer2, AfterViewInit } from '@angular/core';
import { PharmacyModel } from './../../../models/person-slot.model';
import { PharmacyService } from './pharmacy.service';
import { ValidationService } from './../../../shared/validation/validation.service';
import { ValidationComponent } from './../../../shared/validation/validation.component';
import { AsyncValidatorFn, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { DatePipe, AsyncPipe } from '@angular/common';
declare var jQuery: any;
import { PersonalInfo } from './../../../models/person-slot.model';
import { UnMaskedData } from '../../../shared/services/unmaskdata';
import { ModalDirective } from 'angular-bootstrap-md';
import { OrderPipe } from 'ngx-order-pipe';
import { PersonComponent } from '../person.component';
@Component({
    selector: 'app-pharmacy',
    templateUrl: './pharmacy.component.html',
    styleUrls: ['./pharmacy.component.scss'],
    providers: [ToastService, PharmacyService, DatePipe, OrderPipe],
})
export class PharmacyComponent implements OnInit {
    @ViewChild('demoBasic') public demoBasic: ModalDirective;
    @ViewChild('edit') public edit: ModalDirective;
    @ViewChild('deletepharmacy') public deletepharmacy: ModalDirective;
    disableButton: boolean;
    page: number = 1;
    pharmacyForm: FormGroup;
    phrmamodel: PharmacyModel;
    patientData: any = {};
    pharmacydrop: any = [];
    pharmacyData: any = [];
    stateNames = [];
    countries = [];
    order: string ;
    windowWidth: number;
    navWindowWidth: number;
    reverse: boolean = false;
    unmask = UnMaskedData;
    profileInfo: PersonalInfo;
    selectcountrysts: boolean;
    date: Date = new Date();
    // public pharmacyphonemask: Array<string | RegExp>;
    phonests: boolean;
    pharmaId: number;
    constructor(private _toast: ToastService, public toastr: ToastsManager,
        vcr: ViewContainerRef, private router: Router, private formBuilder: FormBuilder,
        private orderPipe: OrderPipe,
        private _pharmacyReferralService: PharmacyService, public datepipe: DatePipe, private _personcomponent: PersonComponent) {
        this.toastr.setRootViewContainerRef(vcr);
        this.patientData = JSON.parse(localStorage.getItem('loginData'));
        this.phrmamodel = new PharmacyModel();
        this.disableButton = false;
        this.phonests = false;
        this.profileInfo = new PersonalInfo();
        // profileInfo: PersonalInfo;
        this.pharmacyForm = this.formBuilder.group({
            'PreferredPharmacy': ['', Validators.required],
            'PharmacyPhoneNumber': ['', Validators.required],
            'PharmacyAddress1': ['', Validators.required],
            'PharmacyAddress2': [''],
            'State': ['', Validators.required],
            'ZipCode': ['', [Validators.required, Validators.minLength(5), Validators.maxLength(5)],
                ValidationService.numericalsValidatorFromone]
        });
        this._personcomponent.Popupopenclose('close');
    }
    ngOnInit() {
       // this.demoBasic._dialog({'data-backdrop' : 'static'});
      //  this.demoBasic.config({backdrop : 'static'});
        // throw new Error("Method not implemented.");
        this.GetPharma();
        this.getStateNames(231);
        this.getPharmacydropdown();
    }
    /** pahramcy get,add,edit,delete start*/
    GetPharma() {
        return this._pharmacyReferralService.GetPharma(this.patientData.Id).subscribe(
            res => {
               // console.log('pharmacy data' + (JSON.stringify(this.pharmacyData = res.data)));
                this.pharmacyData = res.data;
                this.disableButton = false;
                this.order = 'PreferredPharmacy';
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

    onEdit(value) {
        this.phonests = false;
    //    console.log('on edit' + JSON.stringify(value));
        this.phrmamodel = value;
        this.pharmaId = this.phrmamodel.Id;
        this.disableButton = false;
        // tslint:disable-next-line:radix
        this.windowWidth = parseInt( localStorage.getItem('windowWidth'));
        if (this.windowWidth < 1270) {
           this._personcomponent.Popupopenclose('open');
       }
    }
    Addpharma() {

        if ((this.pharmacyForm.dirty) && (this.pharmacyForm.valid) && (this.phonests == false)) {

            const fromdt = this.datepipe.transform(this.date, 'dd/MMM/yyyy');
            this.phrmamodel.CreatedOn = fromdt + ' ' + this.date.getHours() + ':' + this.date.getMinutes() + ':' + this.date.getSeconds();
            this.phrmamodel.PersonId = this.patientData.Id;
            this.phrmamodel.CreatedBy = this.patientData.Id;
            this.phrmamodel.IsActive = true;
            for (let i = 0; i < this.pharmacydrop.length; i++) {
                if (this.phrmamodel.PreferredPharmacy === this.pharmacydrop[i].Name) {

                    this.phrmamodel.PharmacyMasterId = this.pharmacydrop[i].Id;
                }
            }

            this.disableButton = true;
         //   console.log("posted data" + JSON.stringify(this.phrmamodel));
            this._pharmacyReferralService.addPharmacy(this.phrmamodel).subscribe(
                res => {
                   // console.log((JSON.stringify(res)));
                    if (res.Success) {
                        this.success('Pharmacy added', 'add');
                        this._personcomponent.Popupopenclose('close');
                    } else {
                        this.error('Please provide valid pharmacy', 'add');
                    }
                },
                err => console.log(err)
            );
        } else {
            this.validateAllFormFields(this.pharmacyForm);
        }
    }
    getPharmacydropdown() {
        this._pharmacyReferralService.Pharmacydrop().subscribe(
            res => {
             //   console.log("dropdown" + (JSON.stringify(res.data)));
                this.pharmacydrop = res.data;
             //   console.log(this.pharmacydrop);
            },
            err => console.log(err)
        );
    }
    Editpharma() {
        if ((this.pharmacyForm.dirty) && (this.pharmacyForm.valid) && (this.phonests == false)) {
            this.phrmamodel = this.pharmacyForm.value;
            const fromdt = this.datepipe.transform(this.date, 'dd/MMM/yyyy');
            this.phrmamodel.ModifiedOn = fromdt + ' ' + this.date.getHours() +
                ':' + this.date.getMinutes() + ':' + this.date.getSeconds();
            this.phrmamodel.PersonId = this.patientData.Id;
            this.phrmamodel.ModifiedBy = this.patientData.Id;
            this.phrmamodel.Id = this.pharmaId;
            for (let i = 0; i < this.pharmacydrop.length; i++) {
                if (this.phrmamodel.PreferredPharmacy === this.pharmacydrop[i].Name) {

                    this.phrmamodel.PharmacyMasterId = this.pharmacydrop[i].Id;
                }
            }
          //  console.log(this.phrmamodel);
            this.disableButton = true;
            this._pharmacyReferralService.updatePharmacy(this.phrmamodel).subscribe(
                res => {
                //    console.log((JSON.stringify(res)));
                    if (res.Success) {
                        this.success('Pharmacy updated', 'update');
                        this._personcomponent.Popupopenclose('close');
                    } else {
                        this.error('Please provide valid pharmacy', 'update');
                    }
                },
                err => console.log(err)
            );
        } else {
            this.validateAllFormFields(this.pharmacyForm);
        }
    }
    Deletepharma(data) {
        this.disableButton = true;
      //  console.log(this.disableButton);
        this.phrmamodel = data;
        const fromdt = this.datepipe.transform(this.date, 'dd/MMM/yyyy');
        this.phrmamodel.ModifiedOn = fromdt + ' ' + this.date.getHours() +
            ':' + this.date.getMinutes() + ':' + this.date.getSeconds();
        this.phrmamodel.PersonId = this.patientData.Id;
        this.phrmamodel.ModifiedBy = this.patientData.Id;
        this._pharmacyReferralService.deletePharmacy(this.phrmamodel).subscribe(
            res => {
               // console.log((JSON.stringify(res)));
                if (res.Success) {

                    this.success('Pharmacy deleted', 'delete');
                } else {
                    this.error('Pharmacy is not deleted', 'delete');
                }
            },
            err => console.log(err)
        );
    }
    onDelete(data) {
        this.phrmamodel = data;
    }
    getStateNames(countryid) {

        return this._pharmacyReferralService.getstateNames(countryid)
            .subscribe(arg => {
                this.stateNames = arg.data;
             //   console.log(JSON.stringify((this.stateNames)));
            });

    }
    getcountries() {
        this._pharmacyReferralService.getcountries().subscribe(
            res => {
                this.countries = res.data;
            });
    }
    Countryid(countryname) {
        //  alert(countryname);
        for (let i = 0; i < this.countries.length - 1; i++) {
            if (this.countries[i].Name === countryname) {
                this.selectcountrysts = true;
                this.profileInfo.CountryId = this.countries[i].ID;
                this.getStateNames(this.profileInfo.CountryId);
            }
        }
    }
    Stateid(statename) {
        for (let i = 0; i < this.stateNames.length - 1; i++) {
            if (this.stateNames[i].Name == statename) {
                this.profileInfo.StateId = this.stateNames[i].ID;
            }
        }
    }
    // @HostListener('document:click', ['$event'])
    // handleClick(event) {
    //     console.log('vfgg');
    //   this._personcomponent.Popupopenclose('close');
    // }
    /** pahramcy get,add,edit,delete end*/
    /** to clear pharma model when click on Addpharamacy */
    toClearModel(status) {
        this.phrmamodel = new PharmacyModel();
        this.disableButton = false;
        this.phonests = false;
        // tslint:disable-next-line:radix
      //  this.navWindowWidth = parseInt(localStorage.getItem('navWindowWidth'));
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

    /** Add,Edit,delete Referral methods end */
    /** Toast messages for success and failure */
    success(successmsg, type) {
        this._toast.ShowAlert(successmsg, '', 'Success');
        if (type === 'add') {
            this.demoBasic.hide();
        }
        if (type === 'update') {
            this.edit.hide();
        }
        if (type === 'delete') {
            this.deletepharmacy.hide();
        }
        this.GetPharma().add(() => {
        });
    }
    error(errormsg, type) {
        this._toast.ShowAlert(errormsg, '', 'Error');
        this.disableButton = false;
    }
    getNHSNumberMask() {
        return {
            mask: ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
            guide: true,
            placeholderChar: '_',
            keepCharPositions: false,
            // isDeleting: true
        };
    }
    unmasckphone(event) {
        let mobnumber: string;
        this.phonests = false;
        if (this.phrmamodel.PharmacyPhoneNumber !== '') {
          // console.log('@@@' + this.phrmamodel.PharmacyPhoneNumber);
            mobnumber = this.unmask(event.target.value);

         //   console.log(this.phrmamodel.PharmacyPhoneNumber);
            if (mobnumber.length !== 10) {
                this.phonests = true;
            } else {
                this.phrmamodel.PharmacyPhoneNumber = mobnumber;
                this.phonests = false;
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
