import { Api } from './../../../../environments/environment';
import { SlotsData } from './../../../models/person-slot.model';
import { HttpClient } from './../../../shared/services/httpClient.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { EventList } from '../../../models/slot-booking.model';
import { AdminBaseService } from '../adminBaseService';

@Injectable()
export class AppointmentTypeService extends AdminBaseService {
    constructor(private http: HttpClient) {
        super(http);
    }

    getappointment() {
        const url = "api/AppointmentType/GetTypes";
        return this.get(url);
    }
    postappointment(data) {
        const url = "api/AppointmentType/Save";
        return this.post(url, data);
    }
    updateappointment(data) {
        const url = "api/AppointmentType/Update";
        return this.post(url, data);
    }
    Deleteappointment(data) {
        const url = "api/AppointmentType/Delete";
        return this.post(url, data);
    }
    getMonthname(d) {
        // let d = new Date();
        const month = new Array();
        month[0] = 'Jan';
        month[1] = 'Feb';
        month[2] = 'Mar';
        month[3] = 'Apr';
        month[4] = 'May';
        month[5] = 'Jun';
        month[6] = 'Jul';
        month[7] = 'Aug';
        month[8] = 'Sep';
        month[9] = 'Oct';
        month[10] = 'Nov';
        month[11] = 'Dec';
        const n = month[d.getMonth()];
        // console.log(n);
        return n;
    }
}