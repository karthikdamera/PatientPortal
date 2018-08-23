import { Pipe, PipeTransform } from '@angular/core';

/*
* Calculate Body Mass Index
* Weight divided by height in meters square
* Usage:
*  weight | bodyMassIndex:height
* Example:
*  {{ 68 | bodyMassIndex:180 }}
*  formats to 21 (rounded)
*/

@Pipe({ name: 'bodyMassIndex' })
export class BodyMassIndexPipe implements PipeTransform {
    transform(weight: number, height: string): number {
        console.log(weight + ',' + height);
        if (weight != undefined && height != undefined) {
        let hei = parseFloat(height);
        return Math.round(weight / ((hei / 100) * (hei / 100)));
        } else {
            return 0;
        }
    }
}
