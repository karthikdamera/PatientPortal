import { Pipe, PipeTransform } from '@angular/core';
@Pipe({
    name: 'RequestFilterPipe'
})
export class RequestFilterPipe implements PipeTransform {
    transform(value: any, input: string) {
        if (input) {
            // input = input.toLowerCase();

            return value.filter(el => {

                if ((el.Email === null || el.Email === undefined) ||
                    (el.PhoneNo === undefined || el.PhoneNo === null))  {
                    return value.e1;
                }
                else {
                    return el.Email.toLowerCase().indexOf(input) > -1 ||
                        el.PhoneNo.indexOf(input) > -1;
                }
            });
        }
        return value;
    }

}
