import { HttpClient } from './../../../shared/services/httpClient.service';
import { AdminBaseService } from './../adminBaseService';
import { Api } from './../../../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class Service extends AdminBaseService {
    constructor(private http: HttpClient) {
        super(http);
    }
    getAppointmenttype() {
        const url = 'api/AppointmentType/GetTypes';
        return this.get(url);
    }
    /**
     * To post the Location information
     * @param TypeData
     */
    PostAppointment(TypeData) {
      //  alert(JSON.stringify(LocationData));
        const url = 'api/AppointmentType/Update';
        return this.post(url, TypeData);
}
saveAppointmentType(TypeData) {
    const url = 'api/AppointmentType/Save';

    return this.post(url, TypeData);
}
}