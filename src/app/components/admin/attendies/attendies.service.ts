import { Api } from './../../../../environments/environment';
import { SlotsData } from './../../../models/person-slot.model';
import { HttpClient } from './../../../shared/services/httpClient.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { EventList } from '../../../models/slot-booking.model';
import { AdminBaseService } from '../adminBaseService';


@Injectable()
export class AttendiesService extends AdminBaseService {

    constructor(private http: HttpClient) {
        super(http);
     }


    getAttendiesbyId(id) {
        const url = 'api/Campaign/GetAttendeeListByCampaignId?Id=' + id;
        console.log(url);
        return this.get(url);
    }
}


