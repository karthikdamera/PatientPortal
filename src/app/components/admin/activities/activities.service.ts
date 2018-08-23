
import { Api } from './../../../../environments/environment';
import { SlotsData } from './../../../models/person-slot.model';
import { HttpClient } from './../../../shared/services/httpClient.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { EventList } from '../../../models/slot-booking.model';
import { AdminBaseService } from '../adminBaseService';


@Injectable()
export class ActivityService extends AdminBaseService {

    constructor(private http: HttpClient) {
        super(http);
     }

     getMonthname(d) {
        // let d = new Date();
        const month = new Array();
        month[0] = 'January';
        month[1] = 'February';
        month[2] = 'March';
        month[3] = 'April';
        month[4] = 'May';
        month[5] = 'June';
        month[6] = 'July';
        month[7] = 'August';
        month[8] = 'September';
        month[9] = 'October';
        month[10] = 'November';
        month[11] = 'December';
        const n = month[d.getMonth()];
        // console.log(n);
        return n;
    }

GetClientActivies(patientid) {
    const url = 'api/Activity/ActivitiesByClientId?ClientId=' + patientid;
    console.log(url);
    return this.get(url);
}


postActivity(opt) {
    const url = 'api/Activity/SaveClientActivity';
    return this.post(url, opt);
}
getActivities(Id) {
    const get_Url: string = 'api/Activity/ActivitiesByClientId?ClientId=' + Id;
    return this.get(get_Url)
}
postUpdatedStatus(opt) {
    const url = 'api/Activity/SaveClientActivityStatus';
    return this.post(url, opt);
}
}