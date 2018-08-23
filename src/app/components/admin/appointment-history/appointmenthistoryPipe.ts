import { Pipe, PipeTransform, NgModule } from '@angular/core';

@Pipe({
    name: 'AppointmentHistoryPipe',
})
export class AppointmentHistoryPipe implements PipeTransform {
    transform(value: any, input: string) {
        if (input) {
            input = input.toLowerCase();
            return value.filter(function (el: any) {
                if ((el.ProviderName != undefined || el.ProviderName != null) ||
                // (el.PhoneNo != undefined || el.PhoneNo != null) ||
                (el.PersonName != undefined || el.PersonName != null) ) {
                return el.ProviderName.toLowerCase().indexOf(input) > -1 ||
               // el.PhoneNo.indexOf(input) > -1 ||
                el.PersonName.toLowerCase().indexOf(input) > -1;
                } else {
                    return el.PersonName.toLowerCase().indexOf(input) > -1 ||
                   // el.PhoneNo.indexOf(input) > -1 ||
                    el.ProviderName.toLowerCase(input) > -1 ;
                   }
            });
        }
        return value;
    }
}
