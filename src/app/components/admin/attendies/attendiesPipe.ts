import { Pipe, PipeTransform, NgModule } from '@angular/core';

@Pipe({
    name: 'AttendiesPipe',
})
export class AttendiesPipe implements PipeTransform {
    transform(value: any, input: string) {
        if (input) {
            input = input.toLowerCase();
            return value.filter(function (el: any) {
                if ((el.FirstName != undefined || el.FirstName != null) ||
                (el.ContactNumber != undefined || el.ContactNumber != null) ||
                (el.Email != undefined || el.Email != null) ) {
                return el.FirstName.toLowerCase().indexOf(input) > -1 ||
                el.ContactNumber.indexOf(input) > -1 ||
                el.Email.toLowerCase().indexOf(input) > -1;
                } else {
                    return  el.Email.toLowerCase(input) > -1 ||
                    el.ContactNumber.indexOf(input) > -1 ||
                    el.FirstName.toLowerCase(input) > -1 ;
                   }
            });
        }
        return value;
    }
}
