import { Pipe, PipeTransform, NgModule } from '@angular/core';

@Pipe({
    name: 'PatientCheckinPipe',
})
export class PatientCheckinPipe implements PipeTransform {
    transform(value: any, input: string) {
        if (input) {
            input = input.toLowerCase();
            return value.filter(function (el: any) {
                if ((el.Email != undefined || el.Email != null) ||
                (el.PhoneNo != undefined || el.PhoneNo != null) ||
                (el.FirstName != undefined || el.FirstName != null) ) {
                return el.Email.toLowerCase().indexOf(input) > -1 ||
                el.PhoneNo.indexOf(input) > -1 ||
                el.FirstName.toLowerCase().indexOf(input) > -1;
                } else {
                    return el.FirstName.toLowerCase().indexOf(input) > -1 ||
                    el.PhoneNo.indexOf(input) > -1 ||
                    el.Email.toLowerCase(input) > -1 ;
                   }
            });
        }
        return value;
    }
}
