import { HttpClient } from './../../../shared/services/httpClient.service';
import { Api } from './../../../../environments/environment.prod';
import { PersonBaseService } from './../../person/personBaseService';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class ReferalService extends PersonBaseService {

  constructor(private _http: HttpClient) {
        super(_http);
    }
    getReferal(id) {
        const url = 'api/PersonReferral/GetByPersonId?PersonId=' + id;
        return this.get(url);
    }
    AddandEditRefferal(patientData) {
        const url = 'api/PersonReferral/Save';
        console.log(url);
        return this.post(url, patientData);
    }

    deleteReferal(patientData) {
        const url = 'api/PersonReferral/Delete';
        console.log(url);
        return this.post(url, patientData);
    }
}
