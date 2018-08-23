import { Api } from './../../../../environments/environment';
import { SlotsData } from './../../../models/person-slot.model';
import { HttpClient } from './../../../shared/services/httpClient.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { EventList } from '../../../models/slot-booking.model';
import { AdminBaseService } from '../adminBaseService';
import { Http , Response} from '@angular/http';
@Injectable()
export class PatientMedicationService extends AdminBaseService {
    constructor(private _http: HttpClient, private _httpjson: Http) {
        super(_http);
    }
    getClientMedications(Id) {
        const get_Url: string = 'api/Medication/GetClientMedications?ClientId=' + Id;
        return this.get(get_Url);
    }
    postMedications(opt) {
        const url = 'api/Medication/AssignMedicationsToClient ';
        return this.post(url, opt);
    }
    postUpdatedMedicationStatus(opt) {
        const url = 'api/Medication/UpdateClientMedicationStatus';
        return this.post(url, opt);
    }
 
    getMedicationsDropdown() {
        const get_Url: string = 'api/Medication/GetAllMedications';
        return this.get(get_Url);
    }
 
    getMedicationHistory(Id) {
        const get_Url: string = 'api/Medication/GetAllClientMedicationTransactions?ClientId='+Id;
        return this.get(get_Url);
    }
    getMonthname(d) {
        // let d = new Date();
        const month = new Array();
        month[0] = 'January';
        month[1] = 'February';
        month[2] = 'March';
        month[3] = 'April';
        month[4] = 'May';
        month[5] = 'June';
        month[6] = 'July';
        month[7] = 'August';
        month[8] = 'September';
        month[9] = 'October';
        month[10] = 'November';
        month[11] = 'December';
        const n = month[d.getMonth()];
        // console.log(n);
        return n;
    }
    getpatientcarddetails(id) {
        const url = 'api/Person/GetPatientcardByPersonId?PersonId=' + id;
        console.log(url);
        return this.get(url);
    }
}