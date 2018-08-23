import { Api } from './../../../../environments/environment';
import { SlotsData } from './../../../models/person-slot.model';
import { HttpClient } from './../../../shared/services/httpClient.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { EventList } from '../../../models/slot-booking.model';
import { AdminBaseService } from '../adminBaseService';


@Injectable()
export class SlotbookingService extends AdminBaseService {

    constructor(private http: HttpClient) {
        super(http);
     }


    geteventslots(slotinputmodel) {
        // var result: any;
        // const url = 'api/Slot/GetBookedSlots';
        console.log(JSON.stringify(slotinputmodel));
        const url = 'api/Slot/GetBookedSlotFilter';
        console.log(url);
        return this.post(url, slotinputmodel);
    }
    geteventslotsnew(slotinputmodel) {
        // var result: any;
        // const url = 'api/Slot/GetBookedSlots';
        console.log(JSON.stringify(slotinputmodel));
        const url = 'api/Slot/GetBookedSlotFilterAdminCalender';
        console.log(url);
        return this.post(url, slotinputmodel);
    }
    // registartion(regdata) {
    //     console.log(JSON.stringify(regdata));
    //     const url = 'api/Account/PersonRegister';
    //     return this.post(url, regdata);
    // }
    lookupdata() {
        const url = 'api/Slot/GetLookUps';
        return this.get(url);
    }
    // getfreeslotswithpatientid(session, fmdt, todt, providerid, patientid, dob, time) {
    //     const url = 'api/Slot/GetAdminSlots?session=' + session + '&FromDate=' + fmdt + '&ToDate=' + todt +
    //     '&ProviderId=' + providerid + '&PatientId=' + patientid + '&DOB=' + dob + '&currenttime=' + time;
    //     console.log(url);
    //     return this.get(url);
    // }
    getfreeslotswithoutpatientid(session, fmdt, todt, providerid, isRegular, dob, time) {
        const url = 'api/Slot/GetAdminSlots?session=' + session + '&FromDate=' + fmdt + '&ToDate=' + todt +
        '&ProviderId=' + providerid + '&IsRegular=' + isRegular + '&DOB=' + dob + '&currenttime=' + time;
        console.log(url);
        return this.get(url);
    }
    updateEvent(inputmodel) {
        console.log(JSON.stringify(inputmodel));
        const url = 'api/Slot/SaveBookedSlot';
        return this.post(url, inputmodel);
    }
    regservicewithslotbooking(regdata) {
        console.log(JSON.stringify(regdata));
        const url = 'api/Account/Register';
        return this.post(url, regdata);
    }
    cancelAppointment(canceldata) {
        console.log(JSON.stringify(canceldata));
        const url = 'api/Person/CancelAppoinment';
        return this.post(url, canceldata);
    }
    getListofPersons(name) {
        const url = 'api/Person/PersonLookUp?searchText=' + name;
        return this.get(url);
    }
    getListofPersonswith(name) {
        const url = 'api/Person/PersonLookUp?searchText=' + name;
        return this.get(url);
    }
}


