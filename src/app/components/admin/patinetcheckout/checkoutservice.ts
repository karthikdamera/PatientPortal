import { HttpClient } from './../../../shared/services/httpClient.service';
import { AdminBaseService } from './../adminBaseService';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Api } from '../../../../environments/environment';

@Injectable()
export class CheckOutService extends AdminBaseService {
    constructor(private http: HttpClient) {
        super(http);
    }
    /**
    * To get GetProviderItems
    */
    getPatientDetails() {
        const url = 'api/Person/GetAllPersonsDetails';
        return this.get(url);
    }
    getBookedSlotDetails(CurrentDate) {
        const url = 'api/Slot/PersonCheckInAndCheckOutSlots?CurrentDate=' + CurrentDate;
        return this.get(url);
    }
    patientCheckinPost(checkindata) {
        const url = 'api/PersonAttendance/Update';
        console.log(url)
        return this.post(url, checkindata);
    }
}


