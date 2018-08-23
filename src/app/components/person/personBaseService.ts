import { Api } from './../../../environments/environment.prod';
import { HttpClient } from './../../shared/services/httpClient.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class PersonBaseService {
    constructor(private httpClient: HttpClient) { }

    public get(url): any {
        return this.httpClient.get(url, false, true);
    }

    public post(url, data): any {
        return this.httpClient.post(url, data, true, false, true);
    }

    public getInsurance(url): any {
        url = Api.insurance_base_url + url;
        return this.httpClient.get(url, true, false);
    }
    public postInsurance(url, data): any {
        url = Api.insurance_base_url + url;
        return this.httpClient.post(url, data, true, true, false);
    }
}


