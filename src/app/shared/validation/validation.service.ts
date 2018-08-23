
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';


@Injectable()
export class ValidationService {
    static getValidatorErrorMessage(validatorName: string, validatorValue?: any) {
        let config = {
            'required': 'Required',
            'invalidCreditCard': 'Is invalid credit card number',
            'invalidEmailAddress': 'Invalid email address',
            'invalidPassword': 'Invalid password.',
            //  Minimum 8 characters,' +
            // 'at least one uppercase letter, one lowercase letter and one number and one special character.',
            'minlength': `Minimum length ${validatorValue.requiredLength}`,
            'maxlength': `Maximum length ${validatorValue.requiredLength}`,
            'enteralphabets': 'Only Alphabets allowed',
            'enternumbers': 'Only Digits',
        };

        return config[validatorName];
    }

    static creditCardValidator(control) {
        // Visa, MasterCard, American Express, Diners Club, Discover, JCB
        return Observable
        .of(control.value.match(/^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/))
        .map(result => !!result ? null : { 'invalidCreditCard': true });
    }

    static emailValidator(control) {
        return Observable
            .of(control.value.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/))
        .map(result => !!result ? null : { 'invalidEmailAddress': true });
    }

    static passwordValidator(control) {
        // {6,100}           - Assert password is between 6 and 100 characters
        // (?=.*[0-9])       - Assert a string has at least one number
        // if (control.value.match(/^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,100}$/)) {
        //     return null;
        // } else {
        //     return { 'invalidPassword': true };
        // }
        return Observable
        .of(control.value.match(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,12}$/))
        .map(result => !!result ? null : { 'invalidPassword': true });
    }
    static alphabeticsValidator(control) {
        return Observable
        .of(control.value.match(/^[A-Za-z\s]+$/))
        .map(result => !!result ? null : { 'enteralphabets': true });
    }
    static numericalsValidatorFromone(control) {
        return Observable
        .of(control.value.match(/^[1-9][0-9]+$/))
        .map(result => !!result ? null : { 'enternumbers': true });
    }
    static numericalsValidatorFromzero(control) {
        return Observable
    .of(control.value.match(/^[0-9][0-9]+$/))
    .map(result => !!result ? null : { 'enternumbers': true });
    }
}
