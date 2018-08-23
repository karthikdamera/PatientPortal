import { Api } from './../../../../environments/environment';
import { SlotsData } from './../../../models/person-slot.model';
import { HttpClient } from './../../../shared/services/httpClient.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { EventList } from '../../../models/slot-booking.model';
import { AdminBaseService } from '../adminBaseService';


@Injectable()
export class AppointmentHistoryService extends AdminBaseService {

    constructor(private http: HttpClient) {
        super(http);
     }

     ApptHistoryPost(data) {
        console.log(JSON.stringify(data));
        const url = 'api/Slot/AppointmentList';
        return this.post(url, data);
    }
     getMonthname(d) {
        // let d = new Date();
        const month = new Array();
        month[0] = '01';
        month[1] = '02';
        month[2] = '03';
        month[3] = '04';
        month[4] = '05';
        month[5] = '06';
        month[6] = '07';
        month[7] = '08';
        month[8] = '09';
        month[9] = '10';
        month[10] = '11';
        month[11] = '12';
        const n = month[d.getMonth()];
        // console.log(n);
        return n;
    } 
    GetProvidersList() {
        const url = 'api/Provider/GetProvidersList';
        return this.get(url);

    }
}