import { ReferalService } from './referal.service';
import { RefferalModel } from './../../../models/person-slot.model';
import { ValidationService } from './../../../shared/validation/validation.service';
import { ValidationComponent } from './../../../shared/validation/validation.component';
import { Component, OnInit, ViewContainerRef ,ViewChild} from '@angular/core';
import { AsyncValidatorFn, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Toast } from 'ng2-toastr/src/toast';
import { DatePipe, AsyncPipe } from '@angular/common';
declare var jQuery: any;
import { ToastService } from '../../../shared/services/toastService';
import { ModalDirective } from 'angular-bootstrap-md';
@Component({
    moduleId: module.id,
    selector: 'app-referal',
    templateUrl: 'referal.component.html',
    styleUrls: ['referal.component.scss'],
    providers: [DatePipe, ToastService, ReferalService]
})
export class ReferalComponent implements OnInit {
    @ViewChild('addEdit') public addEdit: ModalDirective;
      @ViewChild('closeBasic') public closeBasic: ModalDirective;
      @ViewChild('deletereferal') public deletereferal: ModalDirective;
    // to disable save button
    disableButton: boolean;
    referalForm: FormGroup;
    date: Date = new Date();
    validform: boolean;
    editsts: boolean;
    referalData: any = [];
    patientData: any = {};
    refferalModel: RefferalModel;
    referalId: number;
    constructor(private router: Router, private formBuilder: FormBuilder, private _toast: ToastService,
        public toastr: ToastsManager, vcr: ViewContainerRef, public datepipe: DatePipe, private _referalService: ReferalService) {
        this.toastr.setRootViewContainerRef(vcr);
        this.patientData = JSON.parse(localStorage.getItem('loginData'));
        this.refferalModel = new RefferalModel();
        this.disableButton = false;
        this.validform = false;
        this.referalForm = this.formBuilder.group({
            'HowDidYouHearAboutUs': ['', Validators.required],
            'HowDidYouHearAboutUsOther': [''],
            'NameOfReferringProviderFromWebsite': ['', Validators.required, ValidationService.alphabeticsValidator],
            'NameOfReferringProviderOrganization': ['', Validators.required],
            'WereyouReferredByAnotherProvider': ['', Validators.required],
            'ReferringProviderOrganizationIfNo': ['']
        });
    }
    ngOnInit() {
        // throw new Error("Method not implemented.");
        this.Getrefferal();
    }
    /** Add,Edit,delete Referral methods start */
    Getrefferal() {
        return this._referalService.getReferal(this.patientData.Id).subscribe(
            res => {
               // console.log('referal data' + (JSON.stringify(this.referalData = res.data)));
                this.referalData = res.data;
                this.disableButton = false;
                if (this.referalData.length !== 0) {
                    // alert();
                    this.refferalModel = this.referalData[0];
                   // console.log(this.refferalModel);
                }

            }
        );
    }
    AddandEditRefferal() {
        // alert(this.patientData.Id);
        if (this.referalForm.dirty && this.referalForm.valid) {
            if (this.refferalModel.ReferringProviderOrganizationIfNo !== '' ) {
            if (this.refferalModel.ReferringProviderOrganizationIfNo.match(/^[A-Za-z\s]+$/) === null) {
              //  console.log('FirstName');
                this.validform = true;
            }
        }
                const fromdt = this.datepipe.transform(this.date, 'dd/MMM/yyyy');
                this.refferalModel.CreatedOn = fromdt + ' ' + this.date.getHours() + ':'
                    + this.date.getMinutes() + ':' + this.date.getSeconds();
                this.refferalModel.CreatedBy = this.patientData.Id;
                this.refferalModel.IsActive = true;
                this.refferalModel.ModifiedOn = fromdt + ' ' + this.date.getHours() +
                    ':' + this.date.getMinutes() + ':' + this.date.getSeconds();
                this.refferalModel.PersonId = this.patientData.Id;
                this.refferalModel.ModifiedBy = this.patientData.Id;
              //  console.log(this.refferalModel);
                //  alert(JSON.stringify(this.refferalModel));
                this.disableButton = true;
                this._referalService.AddandEditRefferal(this.refferalModel).subscribe(
                    res => {
                      //  console.log((JSON.stringify(res)));
                        if (res.Success) {
                            this.success('Referal added', 'save');
                            this.editsts = false;
                        } else {
                            this.error('Please provide valid information', 'save');
                        }
                    },
                    err => console.log(err)
                );
                // this.error('First Name Allows Only Alphabets');
            
        } else {
            this.validateAllFormFields(this.referalForm);
        }
    }

    Cancel() {
        //  this.pharmaId = 0;
        this.editsts = false;
    }
    DeleteReffral(refferalModel) {
     //   console.log(this.refferalModel);
        this.disableButton = true;
        this._referalService.deleteReferal(this.refferalModel).subscribe(
            res => {
              //  console.log((JSON.stringify(res)));
                if (res.Success) {
                    this.refferalModel = new RefferalModel();
                    this.success('Referal deleted', 'delete');
                } else {
                    this.error('Referal is not deleted', 'delete');
                }
            },
            err => console.log(err)
        );
    }
    onDelete(data){
        this.refferalModel=data;
      }
    edit(data) {
        this.validform = false;
        this.refferalModel = data;
        this.editsts = true;
      //  console.log(this.refferalModel);
    }
    /** Toast messages for success and failure */

    // success(successmsg) {
    //     this.toastr.success(successmsg, null, {
    //         dismiss: 'controlled', showCloseButton: true,
    //         positionClass: 'toast-bottom-right', newestOnTop: true, progressBar: false,
    //         showEasing: 'swing', closeButton: false, 'preventDuplicates': false,
    //         'debug': false, 'hideEasing': 'linear',
    //         'showMethod': 'fadeIn',
    //         'hideMethod': 'fadeOut'
    //     }).then((toast: Toast) => {
    //         setTimeout(() => {
    //             this.toastr.dismissToast(toast);
    //             jQuery('#referraladdedit').modal('hide');
    //             this.Getrefferal().add(() => {
    //             });
    //         }, 2000);
    //     });
    // }
    // error(errormsg) {
    //     this.toastr.error(errormsg, null, {
    //         dismiss: 'controlled', showCloseButton: true,
    //         positionClass: 'toast-bottom-right', newestOnTop: true, progressBar: false,
    //         showEasing: 'swing', closeButton: false, 'preventDuplicates': false,
    //         'debug': false, 'hideEasing': 'linear',
    //         'showMethod': 'fadeIn',
    //         'hideMethod': 'fadeOut'
    //     }).then((toast: Toast) => {
    //         setTimeout(() => {
    //             this.toastr.dismissToast(toast);
    //             //  jQuery('#referraladdedit').modal('hide');
    //             this.Getrefferal().add(() => {
    //             });
    //         }, 2000);
    //     });
    // }
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





    /** Add,Edit,delete Referral methods end */
    /** Toast messages for success and failure */
    success(successmsg, type) {
        this._toast.ShowAlert(successmsg, '', 'Success');
        if (type === 'save') {
            this.addEdit.hide();
        }
        if (type === 'delete') {
            this.deletereferal.hide();
        }
        // if (type === 'update') {
        //     this.edit.hide();
        // }
        this.Getrefferal().add(() => {
        });
    }
    error(errormsg, type) {
        this._toast.ShowAlert(errormsg, '', 'Error');
        this.disableButton = false;
    }
}

