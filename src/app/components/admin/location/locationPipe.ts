import { Pipe, PipeTransform, NgModule } from '@angular/core';

@Pipe({
    name: 'LocationPipe',
})
export class LocationPipe implements PipeTransform {
    transform(value: any, input: string) {
        if (input) {
            input = input.toLowerCase();
            return value.filter(function (el: any) {
                if ((el.LocationName != undefined || el.LocationName != null)
            ) {
                return el.LocationName.toLowerCase().indexOf(input) > -1;
                } else {
                    return el.LocationName.toLowerCase(input).indexOf(input) > -1 ;
                   }
            });
        }
        return value;
    }
}
