import { PersonBaseService } from './../personBaseService';
import { Api } from './../../../../environments/environment';
import { HttpClient } from './../../../shared/services/httpClient.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpModule, Http, Response, RequestOptions, Headers } from '@angular/http';

@Injectable()
export class RegistrationService extends PersonBaseService {

    constructor(private http: HttpClient, private _httpjson: Http) {
        super(http);
     }
    regservice(regdata) {
        console.log(JSON.stringify(regdata));
        const url = 'api/Account/PersonRegister';
        return this.post(url, regdata);
    }
    getstateNames(contryid) {
        const url =  'api/Account/GetStates?CountryId='+contryid;
        return this.get(url);
    }
}


