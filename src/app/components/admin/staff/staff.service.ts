import { HttpClient } from './../../../shared/services/httpClient.service';
import { AdminBaseService } from './../adminBaseService';
import { Api } from './../../../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class StaffService extends AdminBaseService {
    constructor(private http: HttpClient) {
        super(http);
    }
    /**
     * To get staff Designations
     */
    GetDesignations() {
        const url = 'api/Designation/GetStaffRoles';
        return this.get(url);
    }
    /**
     * To get all the staff list
     */
    getStaffInfo() {
        const url = 'api/Provider/GetStaffList';
        return this.get(url);

    }
    /**
     * To post the staff information
     * @param providerData
     */
    postStaffInfo(providerData) {
      //  alert(JSON.stringify(providerData));
        const url = 'api/Provider/Save';
        return this.post(url, providerData);
}
}


