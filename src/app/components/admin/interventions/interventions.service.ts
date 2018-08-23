import { Api } from './../../../../environments/environment';
import { SlotsData } from './../../../models/person-slot.model';
import { HttpClient } from './../../../shared/services/httpClient.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { EventList } from '../../../models/slot-booking.model';
import { AdminBaseService } from '../adminBaseService';


@Injectable()
export class InterventionsService extends AdminBaseService {

    constructor(private http: HttpClient) {
        super(http);
     }


     GetClientInterventions(patientid) {
        const url = 'api/Interventions/GetClientInterventions?ClientId=' + patientid;
        console.log(url);
        return this.get(url);
    }
    statusEditUpdate(data) {
        console.log(JSON.stringify(data));
        const url = 'api/Interventions/UpdateStatus ';
        return this.post(url, data);
    }
    GetInterventionsByClientSymtoms(id) {
        const url = 'api/Interventions/GetInterventionsByClientSymtoms?ClientId=' + id;
        console.log(url);
        return this.get(url);
    }
    SaveClientInterventions(data) {
        const url = 'api/Interventions/SaveClientInterventions';
        return this.post(url, data);
    }

}


