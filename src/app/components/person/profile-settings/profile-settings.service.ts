import { Api } from './../../../../environments/environment';
import { HttpClient } from './../../../shared/services/httpClient.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { PersonBaseService } from '../../person/personBaseService';
import { HttpModule, Http, Response, RequestOptions, Headers } from '@angular/http';

@Injectable()
export class ProfileSettingsService extends PersonBaseService {

   constructor(private _http: HttpClient, private _httpjson: Http) {
        super(_http);
    }
    /**
     *   // to get profile information of client
     * @param id
     */
    getProfile(id) {
        const url = 'api/Person/GetPersonById?Id=' + id;
        return this.get(url);
    }
    getcountries(){
        const url = 'api/Account/GetCountries';
        return this.get(url);
    }
    /**
     * to update profile information of client
     * @param opt
     */
    updateProfile(opt) {
        const url = 'api/Person/UpdatePerson';
        return this.post(url, opt);
    }
    getstateNames(contryid) {
        const url = 'api/Account/GetStates?CountryId=' + contryid;
        return this.get(url);
    }
    ssnverify(ssnno){
      //  console.log(ssnno);
        const url = 'api/Account/IsSSNexist';
        return this.post(url,ssnno);
    }
}