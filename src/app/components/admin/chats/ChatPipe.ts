import { Pipe, PipeTransform, NgModule } from '@angular/core';

@Pipe({
    name: 'ChatPipe',
})
export class ChatPipe implements PipeTransform {
    transform(value: any, input: string) {
        if (input) {
            input = input.toLowerCase();
            return value.filter(function (el: any) {
                if ((el.PatientName != undefined || el.PatientName != null) ||
                (el.PhoneNumber != undefined || el.PhoneNumber != null)) {
                return el.PatientName.toLowerCase().indexOf(input) > -1 ||
                el.PhoneNumber.indexOf(input) > -1 ;
                } else {
                return el.Name.toLowerCase().indexOf(input) > -1 ||
                el.Number.indexOf(input) > -1;
               }
            });
        }
        return value;
    }
}
