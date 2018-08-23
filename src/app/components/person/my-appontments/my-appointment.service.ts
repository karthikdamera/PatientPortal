import { HttpClient } from '../../../shared/services/httpClient.service';
import { Api } from '../../../../environments/environment.prod';
import { PersonBaseService } from '../personBaseService';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AppointmentService extends PersonBaseService {

    constructor(private _http: HttpClient) {
        super(_http);
    }
    /**
     *   // to get profile information of client
     * @param id
     */
    GetAppoinments(id, crrentdate) {
        const url = 'api/Person/GetAppointments?PersonId=' + id + '&CurrentDate=' + crrentdate ;
        return this.get(url);
    }
}
