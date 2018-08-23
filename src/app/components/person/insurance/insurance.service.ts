import { PersonBaseService } from './../../person/personBaseService';
import { Api } from './../../../../environments/environment.prod';
import { HttpClient } from './../../../shared/services/httpClient.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpModule, Http, Response, RequestOptions, Headers } from '@angular/http';

@Injectable()
export class InsuranceService extends PersonBaseService {

  constructor(private _http: HttpClient, private _httpjson: Http) {
        super(_http);
    }
    /**
     *   // to get insurance info
     * @param id
     */
    getInranceInfo(id) {
        const url = 'api/Insurance/GetByPersonId?PersonId=' + id;
        return this.get(url);
    }
    addInsurance(insurancedata) {
        console.log(JSON.stringify(insurancedata));
        const url = 'api/Insurance/Save';
        console.log(url);
        return this.post(url, insurancedata);
    }
    updateInsuranceActive(activeData) {
        const url = 'api/Insurance/UpdateStatus';
        console.log(url);
        return this.post(url, activeData);
    }
    eligibleservice(eob) {
        console.log(JSON.stringify(eob));
        const url = 'api/Eligible/Coverage';
        console.log(url);
        return this.postInsurance(url, eob);
    }
    getinsNames() {
        const url = 'assets/JsonData/insurancenames.json';
        return this._httpjson.get(url)
        .map((res: Response) => {
            return res.json();
        });
    }
}
