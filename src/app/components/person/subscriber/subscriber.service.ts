import { HttpClient } from './../../../shared/services/httpClient.service';
import { Api } from './../../../../environments/environment.prod';
import { PersonBaseService } from './../../person/personBaseService';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpModule, Http, Response, RequestOptions, Headers } from '@angular/http';

@Injectable()
export class SubscriberService extends PersonBaseService {

  constructor(private _http: HttpClient, private _httpjson: Http) {
        super(_http);
    }
    getSubscriber(id) {
        const url = 'api/Subscriber/GetByPersonId?PersonId=' + id;
        console.log(url);
        return this.get(url);
    }
    AddandEditSubscriber(patientData) {
        const url = 'api/Subscriber/Save';
        console.log(url);
        return this.post(url, patientData);
    }

    getpatientInfo(id) {
        const url = 'api/Person/GetPersonById?Id=' + id;
        console.log(url);
        return this.get(url);
    }
    getstateNames(contryid) {
        const url =  'api/Account/GetStates?CountryId='+contryid;
        return this.get(url);
    }
}
