import { Api } from './../../../../environments/environment';
import { HttpClient } from './../../../shared/services/httpClient.service';
import { AdminBaseService } from './../adminBaseService';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class PatientDetailsService extends AdminBaseService {
    constructor(private http: HttpClient) {
        super(http);
    }
    /**
     *   // to get persons list
     *
     */
    getListofPersons(name) {
        const url = 'api/Person/PersonLookUp?searchText=' + name;
        console.log(url);
        return this.get(url);
    }
    getpatientlist() {
        const url = 'api/Person/GetAllPersonsDetails';
        console.log(url);
        return this.get(url);
    }
    /**
    * To get GetProviderItems
    */
    getpatientcarddetails(id) {
        const url = 'api/Person/GetPatientcardByPersonId?PersonId=' + id;
        console.log(url);
        return this.get(url);
    }
    getListofPersonswithfuturedate(name, currentdate) {
        const url = 'api/Person/GetNextPersonLookUp';
        return this.post(url, { searchText: name, date: currentdate });
    }
}


