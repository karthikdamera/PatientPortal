import { Pipe, PipeTransform } from '@angular/core';
import { DatePipe } from '@angular/common';

@Pipe({
    name: 'dateFormatPipe',
})
export class DateFormat implements PipeTransform {
    // transform(value: string) {
    //    const datePipe = new DatePipe('en-US');
    //     value = datePipe.transform(value, 'MM/dd/yyyy');
    //     return value;
    // }
    transform(value: string) {
        // alert(value.substr(3,3));
        if(value.substr(3,3) === 'Jan'){
            value = value.substr(7,4)+'-01-'+value.substr(0,2);
        } else if(value.substr(3,3) === 'Feb'){
            value = value.substr(7,4)+'-02-'+value.substr(0,2);
        } else if(value.substr(3,3) === 'Mar'){
            value = value.substr(7,4)+'-03-'+value.substr(0,2);
        } else if(value.substr(3,3) === 'Apr'){
            value = value.substr(7,4)+'-04-'+value.substr(0,2);
        } else if(value.substr(3,3) === 'May'){
            value = value.substr(7,4)+'-05-'+value.substr(0,2);
        } else if(value.substr(3,3) === 'Jun'){
            value = value.substr(7,4)+'-06-'+value.substr(0,2);
        } else if(value.substr(3,3) === 'Jul'){
            value = value.substr(7,4)+'-07-'+value.substr(0,2);
        } else if(value.substr(3,3) === 'Aug'){
            value = value.substr(7,4)+'-08-'+value.substr(0,2);
        } else if(value.substr(3,3) === 'Sep'){
            value = value.substr(7,4)+'-09-'+value.substr(0,2);
        } else if(value.substr(3,3) === 'Oct'){
            value = value.substr(7,4)+'-10-'+value.substr(0,2);
        } else if(value.substr(3,3) === 'Nov'){
            value = value.substr(7,4)+'-11-'+value.substr(0,2);
        } else if(value.substr(3,3) === 'Dec'){
            value = value.substr(7,4)+'-12-'+value.substr(0,2);
        }
       // alert(value);
       //  value = datePipe.transform(value, 'MM/dd/yyyy');
        return value;
    }
}
