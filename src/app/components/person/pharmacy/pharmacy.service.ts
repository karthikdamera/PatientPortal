import { HttpClient } from './../../../shared/services/httpClient.service';
import { Api } from './../../../../environments/environment.prod';
import { PersonBaseService } from './../../person/personBaseService';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class PharmacyService extends PersonBaseService {

  constructor(private _http: HttpClient) {
        super(_http);
    }
    /**
     *   // to get profile information of client
     * @param id
     */
    GetPharma(id) {
        const url = 'api/Pharmacy/GetPharmaciesByPersonId?PersonId=' + id;
        return this.get(url);
    }
    addPharmacy(patientData) {
        const url = 'api/Pharmacy/Save';
        console.log(url);
        return this.post(url, patientData);
    }
    updatePharmacy(patientData) {
        const url = 'api/Pharmacy/Update';
        console.log(url);
        return this.post(url, patientData);
    }
    deletePharmacy(patientData) {
        const url = 'api/Pharmacy/Delete';
        console.log(url);
        return this.post(url, patientData);
    }
    getstateNames(contryid) {
        const url = 'api/Account/GetStates?CountryId='+contryid;
        return this.get(url);
    }
 
    getcountries(){
        const url = 'api/Account/GetCountries';
        return this.get(url);
    }
    Pharmacydrop(){
        const url = 'api/Pharmacy/All';
        return this.get(url);
    }
}