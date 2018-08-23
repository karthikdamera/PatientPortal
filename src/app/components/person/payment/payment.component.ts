import { ValidationComponent } from './../../../shared/validation/validation.component';
import { CradTypes } from './../../../models/person-slot.model';
import { ValidationService } from './../../../shared/validation/validation.service';
import { CreditcardModel } from './../../../models/person-slot.model';
import { Component, OnInit, ViewContainerRef, ViewChild } from '@angular/core';
import { AsyncValidatorFn, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Toast } from 'ng2-toastr/src/toast';
import { DatePipe, AsyncPipe } from '@angular/common';
import { CreditCardService } from './payment.service';
declare var jQuery: any;
import { ToastService } from '../../../shared/services/toastService';
import { ModalDirective } from 'angular-bootstrap-md';
import { ExpDate } from '../../../shared/services/datemask';
import { UnMaskedData } from '../../../shared/services/unmaskdata';
import { PersonComponent } from '../person.component';
@Component({
    moduleId: module.id,
    selector: 'app-payment',
    templateUrl: './payment.component.html',
    styleUrls: ['./payment.component.scss'],
    providers: [CreditCardService, DatePipe, ToastService]
})
export class PaymentComponent implements OnInit {
    @ViewChild('demoBasic') public demoBasic: ModalDirective;
    disableButton: boolean;
    page: number = 1;
    expdatevalid: boolean;
    windowWidth: number;
    collapseMenu: boolean;
    navWindowWidth: number;
    dateMask = ExpDate;
    // for validations
    creditcardForm: any;
    // model
    creditcardModel: CreditcardModel;
    // login data from local storage
    patientData: any = {};
    // getting credit card info
    creditcardData: any = [];
    // date
    date: Date = new Date();
    expdate: any;
    unmask = UnMaskedData;
    number: string;
    phonests: boolean;
    cardTypeClass: string;
    monthvalid: boolean;
    yearvalid: boolean;
    expirysts: boolean;
    // public CardType: string;
    model: any = { 'ExpirationYear': '', 'ExpirationMonth': '' };
    // creditCardMask: any;
    constructor(private router: Router, private formBuilder: FormBuilder, private _creditCardService: CreditCardService,
        public toastr: ToastsManager, vcr: ViewContainerRef, public datepipe: DatePipe, private toast: ToastService,
         public _personcomponent: PersonComponent) {
        this.cardTypeClass = '';
        this.patientData = JSON.parse(localStorage.getItem('loginData'));
        this.creditcardModel = new CreditcardModel();
        this.toastr.setRootViewContainerRef(vcr);
        this.disableButton = false;
        this.expdate = false;
        this.phonests = false;
        this.collapseMenu = false;
        this.expirysts = false;
        this.yearvalid = false;
        // this.creditCardMask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
        // validations
        this.creditcardForm = this.formBuilder.group({
            'CardNumber': ['', Validators.required],
            'Expdate': ['', Validators.required],
            'NameOnTheCard': ['', Validators.required, ValidationService.alphabeticsValidator],
            'Cvv': ['', [Validators.required, Validators.maxLength(3)],
                ValidationService.numericalsValidatorFromzero],
        });
        this._personcomponent.Popupopenclose('close');
    }
    // on page load get call
    ngOnInit() {
        this.getCreditcardInfo();
    }
    RandomNumber() {
        const _date = new Date();
        const components = [
            _date.getFullYear(),
            _date.getMonth(),
            _date.getDate(),
            _date.getHours(),
            _date.getMinutes(),
            _date.getSeconds(),
            _date.getMilliseconds()
        ];

        const id = components.join('');
        return id;
    }
    guid() {
        function s4() {
            return Math.floor((1 + Math.random()) * 0x10000)
                .toString(16)
                .substring(1);
        }
        return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
    }
    /**
     * credit card get call
     */
    getCreditcardInfo() {
        return this._creditCardService.getCreditcardInfo(this.patientData.Id).subscribe(
            res => {
                this.creditcardData = res.data;
               // console.log('credit card data' + (JSON.stringify(this.creditcardData = res.data)));
            }
        );
    }

    cardnumber(event) {
        this.cardTypeClass = '';
        this.number = this.creditcardModel.CardNumber;
        if (this.number) {
            if (this.number.charAt(0) === '4') {
                this.creditcardModel.CardType = CradTypes[0];
                this.cardTypeClass = 'icon-visa-card';
                // alert(this.creditcardModel.CardType);
            } else if (this.number.charAt(0) === '5') {
                this.creditcardModel.CardType = CradTypes[1];
                this.cardTypeClass = 'icon-master-card';
            } else if (this.number.charAt(0) === '3') {
                this.creditcardModel.CardType = CradTypes[2];
                this.cardTypeClass = 'icon-amex-card';
            } else {
                this.creditcardModel.CardType = '';
                this.cardTypeClass = '';
            }
        }
    }
    /**
     * active and inactive status update
     * @param id
     * @param status
     */
    statusChange(cardinfo) {
        const model = {
            Id: cardinfo.Id,
            IsActive: true,
            PersonId: cardinfo.PersonId
        };
        this._creditCardService.statusChange(model).subscribe(
            res => {
              //  console.log((JSON.stringify(res)));
                if (res.Success) {
                    // alert(res.Success);

                    this.success('Your card is Activated');
                    // if (status) {
                    //     this.success('Your card is Activated');
                    // } else {
                    //     this.success('Your card is Deactivated');
                    // }
                } else {
                    this.error(res);
                }
            },
            err => console.log(err)
        );
    }
    /**
     * card verification
     */
    verifysave() {
        if ((this.creditcardForm.dirty && this.creditcardForm.valid) && ((this.phonests == false)))   {
            if ((this.creditcardModel.Expdate.length == 6) || (this.creditcardModel.Expdate.length == 4)) {
                let date = new Date();
                let futdate = new Date();
              futdate.setFullYear(2100);
              let fdate = futdate.getFullYear();
             let pdate = date.getFullYear();
             if (this.creditcardModel.Expdate.length == 6) {
             this.model.ExpirationMonth = this.creditcardModel.Expdate.substring(0, 2);
            this.model.ExpirationYear = this.creditcardModel.Expdate.substring(2, 6);
         if ( (this.model.ExpirationYear < fdate  ) && (this.model.ExpirationYear >= pdate)) {
            this.yearvalid = true;
        } else {
            this.error('Please enter valid expiry year');
            this.expdatevalid = true;
            this.yearvalid = false;
        }
        } else {
            this.model.ExpirationMonth = this.creditcardModel.Expdate.substring(0, 2);
            this.model.ExpirationYear = this.creditcardModel.Expdate.substring(2, 4);
          if ( (this.model.ExpirationYear < 98  ) &&
          (this.model.ExpirationYear >= pdate.toString().substring(2, 4))) {
            this.yearvalid = true;
          }  else {
            this.error('Please enter valid expiry year');
            this.expdatevalid = true;
            this.yearvalid = false;
        }
        }
        } else {
             this.expdatevalid = true;
        }  if (this.yearvalid === true) {
            if (this.model.ExpirationMonth > 12) {
this.error('Please enter valid expiry month');
            } else {
            const creditCardRequest = {
                'CardNumber': this.creditcardModel.CardNumber,
                'ExpirationDate': this.creditcardModel.Expdate,
                'EmailId': this.patientData.Email,
                'CustomerId': this.RandomNumber()
                // Math.floor(Math.random() * 90 + 100000000000000)
            };
            this.disableButton = true;
         //   console.log(JSON.stringify(creditCardRequest));
            this._creditCardService.authorizeCreditcard(creditCardRequest).subscribe(
                res => {
                    // this.authmsg = res.json().Status;
                //    console.log(res);
                  //  console.log(res.json().Status);
                    // console.log(this.authmsg+","+this.cardmsg);
                    if (res.json().Status) {
                        this.addCreditCard();
                        this.expdatevalid = false;
                    } else {
                        // this.error('Please provide valid information');
                        this.error(res.json().Message);
                        this.expdatevalid = false;
                    }
                },
                err => err
            );
        }
        }
        } else {
            this.validateAllFormFields(this.creditcardForm);
        }
    }
    /**
     * for adding new card
     */
    addCreditCard() {
        const fromdt = this.datepipe.transform(this.date, 'dd/MMM/yyyy');
        this.creditcardModel.CreatedOn = fromdt + ' ' + this.date.getHours() +
            ':' + this.date.getMinutes() + ':' + this.date.getSeconds();
        this.creditcardModel.PersonId = this.patientData.Id;
        this.creditcardModel.CreatedBy = this.patientData.Id;
        this.creditcardModel.CreditCardAuthorized = true;
        this.creditcardModel.IsActive = true;
        this.creditcardModel.CardExpirationDate = this.creditcardModel.Expdate ;
      //  console.log(JSON.stringify(this.creditcardModel));
        this._creditCardService.addCreditCard(this.creditcardModel).subscribe(
            res => {
             //   console.log((JSON.stringify(res)));
                if (res.Success) {
                    this.success('Credit card added successfully');
                    this._personcomponent.Popupopenclose('close');
                } else {
                    this.error(res.data);
                }
            },
            err => console.log(err)
        );
    }
    /** Toast messages for success and failure */
    success(successmsg) {
        this.toast.ShowAlert(successmsg, '', 'Success');
        this.demoBasic.hide();
        this.getCreditcardInfo().add(() => {
        });
    }
    error(errormsg) {
        this.toast.ShowAlert(errormsg, '', 'Error');
        this.disableButton = false;
    }
    /**
     * to clear model after add
     */
    getexpdate () {
        return {
            mask: [/\d/, /\d/, '/', /\d/, /\d/, /\d/, /\d/],
            guide: true,
            placeholderChar: '_',
            keepCharPositions: true
        };
    }
    toClear(status) {
        this.creditcardModel = new CreditcardModel();
        this.model.ExpirationMonth = '';
        this.model.ExpirationYear = '';
        this.disableButton = false;
        this.phonests = false;
        this.expdatevalid = false;
        // tslint:disable-next-line:radix
        this.navWindowWidth = parseInt(localStorage.getItem('navWindowWidth'));
        // tslint:disable-next-line:radix
        this.windowWidth = parseInt( localStorage.getItem('windowWidth'));
        //  console.log( this.windowWidth + ',' + this.navWindowWidth);
        // console.log(this.windowWidth < this.navWindowWidth);
     if (this.windowWidth < 1270) {
        if (status === 'open') {
        this._personcomponent.Popupopenclose('open');
        } else {
            this._personcomponent.Popupopenclose('close');
        } 
    }
  
    }
    getNHSNumberMask() {
        this.number = this.creditcardModel.CardNumber;
        if (this.number.charAt(0) === '3') {
            return {
                mask: [/\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/],
                guide: true,
                placeholderChar: '_',
                keepCharPositions: true
            };
        } else {
        return {
            mask: [/\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
            guide: true,
            placeholderChar: '_',
            keepCharPositions: true
        };
    }
    }
    expirymask() {
        this.expirysts = false;
        if (this.creditcardModel.Expdate !== '') { 
            this.creditcardModel.Expdate = this.unmask(this.creditcardModel.Expdate);
            if (this.creditcardModel.Expdate.length !== 7) {
                // alert('AmericanExpress');
                this.expirysts  = true;
             } else {
                this.expirysts = false;
             }
        }
    }
    unmasckphone() {
        this.phonests = false;
        if (this.creditcardModel.CardNumber !== '') {
         //   console.log('@@@' + this.creditcardModel.CardNumber);
            this.creditcardModel.CardNumber = this.unmask(this.creditcardModel.CardNumber);
            // alert(this.creditcardModel.CardType +','+this.creditcardModel.CardNumber.length);
            if (this.creditcardModel.CardType === 'AmericanExpress' && this.creditcardModel.CardNumber.length !== 15) {
               // alert('AmericanExpress');
                this.phonests = true;
            } else if ((this.creditcardModel.CardType === 'visa' ||
             this.creditcardModel.CardType === 'masterCard') && this.creditcardModel.CardNumber.length !== 16) {
               //  alert('visa');
                this.phonests = true;
            } else {
                this.phonests = false;
            }
          //  console.log(this.phonests);
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
