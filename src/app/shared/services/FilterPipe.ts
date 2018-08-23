import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'FilterPipe',
})
export class FilterPipe implements PipeTransform {
    transform(value: any, input: string) {
        if (input) {
            input = input.toLowerCase();
            return value.filter(function (el: any) {
                // alert(el.LocationName);
                if (el.LocationName != undefined || el.PatientName != null)  {
                return el.LocationName.toLowerCase().indexOf(input) > -1 ;
               } else if (el.Name != undefined || el.Name != null) {
                return el.Name.toLowerCase().indexOf(input) > -1 ;
               }
            });
        }
        return value;
    }
}
