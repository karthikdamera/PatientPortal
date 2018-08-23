import { Pipe, PipeTransform, NgModule } from '@angular/core';

@Pipe({
    name: 'StaffPipe',
})
export class StaffPipe implements PipeTransform {
    transform(value: any, input: string) {
        if (input) {
            input = input.toLowerCase();
            return value.filter(function (el: any) {
                if ((el.StaffName != undefined || el.StaffName != null)
            ) {
                return el.StaffName.toLowerCase().indexOf(input) > -1;
                } else {
                    return el.StaffName.toLowerCase(input).indexOf(input) > -1 ;
                   }
            });
        }
        return value;
    }
}
