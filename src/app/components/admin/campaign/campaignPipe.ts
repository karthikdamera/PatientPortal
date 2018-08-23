import { Pipe, PipeTransform, NgModule } from '@angular/core';

@Pipe({
    name: 'CampaignPipe',
})
export class CampaignPipe implements PipeTransform {
    transform(value: any, input: string) {
        if (input) {
            // input = input.toLowerCase();

            return value.filter(el => {

                if ((el.Name === null || el.Name === undefined))
          {
                    return value.e1;
                } else {
                    return el.Name.toLowerCase().indexOf(input) > -1;
                }
            });
        }
        return value;
    }
}
