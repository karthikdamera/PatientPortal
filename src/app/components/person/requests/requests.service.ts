import { HttpClient } from './../../../shared/services/httpClient.service';
import { Api } from './../../../../environments/environment.prod';
import { PersonBaseService } from './../../person/personBaseService';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class PersonRequestsService extends PersonBaseService {

    constructor(private _http: HttpClient) {
        super(_http);
    }
    /**
     *   // to get medication information of client
     * @param id
     */
    getPersonMedication(id) {
        const url = 'api/PersonMedication/GetByPersonId?PersonId=' + id;
        return this.get(url);
    }

    postReadStatus(data) {
       const url = 'api/Requests/UpdateMessageReadStatus';
       return  this.post(url, data);
    }
    /**
     *   // to get profile information of client
     * @param id
     */
    getPharmacyDropdown(id) {
        const url = 'api/Pharmacy/GetPharmaciesByPersonId?PersonId=' + id;
        return this.get(url);
    }
    /**
     *   // to get profile information of client
     *
     */
    getLookUpsdropdown() {
        const url = 'api/Requests/GetLookUps';
        return this.get(url);
    }
    /**
* To get GetProvidersList
*/
    getProvidersList() {
        const url = 'api/Provider/GetProvidersList';
        return this.get(url);

    }
    /**
* To get medicine Refill list
*/
    getRequest(id, requestid) {
        const url = 'api/Requests/GetByPersonId?PersonId=' + id + '&RequestId=' + requestid;
        console.log(url);
        return this.get(url);
    }
    addRequestSave(data) {
        const url = 'api/Requests/Save';
        return this.post(url, data);
    }
    editRequest(data) {
        const url = 'api/Requests/Update';
        return this.post(url, data);
    }
    deleteRequest(data) {
        const url = 'api/Requests/Delete';
        return this.post(url, data);
    }
}
