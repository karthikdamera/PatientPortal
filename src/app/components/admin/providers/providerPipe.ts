import { Pipe, PipeTransform, NgModule } from '@angular/core';

@Pipe({
    name: 'ProviderPipe',
})
export class ProviderPipe implements PipeTransform {
    transform(value: any, input: string) {
        if (input) {
            input = input.toLowerCase();
            return value.filter(function (el: any) {
                if ((el.ProviderName != undefined || el.ProviderName != null) ||
                (el.PhoneNo != undefined || el.PhoneNo != null) ||
                (el.Email != undefined || el.Email != null) ) {
                return el.ProviderName.toLowerCase().indexOf(input) > -1 ||
                el.PhoneNo.indexOf(input) > -1 ||
                el.Email.toLowerCase().indexOf(input) > -1;
                } else {
                    return  el.Email.toLowerCase(input) > -1 ||
                    el.PhoneNo.indexOf(input) > -1 ||
                    el.ProviderName.toLowerCase(input) > -1 ;
                   }
            });
        }
        return value;
    }
}
