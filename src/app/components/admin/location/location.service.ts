import { HttpClient } from './../../../shared/services/httpClient.service';
import { AdminBaseService } from './../adminBaseService';
import { Api } from './../../../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class LocationService extends AdminBaseService {
    constructor(private http: HttpClient) {
        super(http);
    }
    /**
     * To get staff Designations
     */
    getLocationtype() {
        const url = 'api/Locations/All';
        return this.get(url);
    }
    /**
     * To post the Location information
     * @param LocationData
     */
    PostLocation(LocationData) {
      //  alert(JSON.stringify(LocationData));
        const url = 'api/Locations/SaveLocation';
        return this.post(url, LocationData);
}
getstateNames(contryid) {
    const url = 'api/Account/GetStates?CountryId='+contryid;
    return this.get(url);
}
}


