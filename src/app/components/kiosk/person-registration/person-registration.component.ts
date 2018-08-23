import { Component, ViewContainerRef } from '@angular/core';
import { RegistrationModel } from '../../../models/person-slot.model';

import { ValidationService } from './../../../shared/validation/validation.service';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { INgxMyDpOptions } from 'ngx-mydatepicker';
import { DatePipe } from '@angular/common';
// import { RegistrationService } from '../../person/registration/registration.service';
import { ToastsManager, Toast } from 'ng2-toastr';
import { IMyDateModel } from 'mydatepicker';
import { Router } from '@angular/router';
import { RegistrationService } from '../../person/registration/registration.service';

@Component({
    moduleId: module.id,
    selector: 'person-registration',
    templateUrl: 'person-registration.component.html',
    styleUrls: ['person-registration.component.scss'],
    providers: [ DatePipe ,RegistrationService]
})
export class PersonRegistrationComponent {
    loadingdata: boolean = false;
    buttonloading: boolean = true;
    userForm: FormGroup;
    selectedDate: any;
    postDateFormat = 'dd/MMM/yyyy';
    regModel: RegistrationModel;
    date: Date = new Date();
    userId: number;
    dob: INgxMyDpOptions = {
        // other options...
        dateFormat: 'mm/dd/yyyy',
        firstDayOfWeek: 'mo',
        markCurrentDay: true,
        disableHeaderButtons: true,
        disableSince: { year: this.date.getFullYear() - 5, month: this.date.getMonth() + 1, day: this.date.getDate() },
        selectorHeight: '232px',
        selectorWidth: '250px'
    };
    constructor(private formBuilder: FormBuilder,
        public toastr: ToastsManager, vcr: ViewContainerRef, public datepipe: DatePipe,
    private router: Router,
    public _registrationService: RegistrationService) {
        this.userId = 0;
        this.toastr.setRootViewContainerRef(vcr);
        this.regModel = new RegistrationModel();
        this.userForm = this.formBuilder.group({
            'FirstName': ['', Validators.required, ValidationService.alphabeticsValidator],
            'LastName': ['', Validators.required, ValidationService.alphabeticsValidator],
            'Email': ['', Validators.required, ValidationService.emailValidator],
            'PhoneNo': ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)],
                ValidationService.numericalsValidatorFromzero],
            'Address': ['', Validators.required],
            'Address2': [''],
            'City': ['', Validators.required],
            'State': ['', Validators.required],
            'Zipcode': ['', [Validators.required, Validators.minLength(5), Validators.maxLength(5)],
                ValidationService.numericalsValidatorFromone],
            'Message': [''],
            'DOB': ['', [Validators.required, Validators.minLength(10)]]
        });
    }
    onDateChanged(event: IMyDateModel): void {
        // console.log('dddddddddd' + event.formatted);
        this.selectedDate = event.formatted;
        console.log('dddddddddd' + this.selectedDate);
    }
    registartion() {
        if (this.userForm.dirty && this.userForm.valid) {
            this.buttonloading = false;
            this.loadingdata = true;
            this.regModel.DOB = this.datepipe.transform(this.selectedDate, this.postDateFormat);
            console.log(this.regModel);
            return this._registrationService.regservice(this.regModel).subscribe
                (
                res => {
                    console.log(res);
                    if (res.Success) {
                        this.userId = res.data.PatientId;
                        this.success('Registration compleated successfully');
                    } else {
                        this.error(res.data);
                    }
                },
                err => console.log(err)
                );
        } else {
            this.validateAllFormFields(this.userForm);
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
                this.regModel = new RegistrationModel();
                this.router.navigate(['/kiosk/questions'], { queryParams: { userId: this.userId } });
            }, 3000);
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
    close() {
        this.regModel = new RegistrationModel();
        this.router.navigate(['/kiosk/home']);
    }
}
