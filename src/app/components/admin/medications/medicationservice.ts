import { Api } from './../../../../environments/environment';
import { SlotsData } from './../../../models/person-slot.model';
import { HttpClient } from './../../../shared/services/httpClient.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { EventList } from '../../../models/slot-booking.model';
import { AdminBaseService } from '../adminBaseService';

@Injectable()
export class MedicationService extends AdminBaseService {

    constructor(private http: HttpClient) {
        super(http);
     }

   // save medication
     saveMedication(medicationobject) {
        const url = 'api/Medication/Save';

        return this.post(url, medicationobject);
    }

    // update medications
    updateMedication(medicationobject){
        const url='api/Medication/Update';
        return this.post(url, medicationobject);
    }

    // delete medication
deleteMedication(deleteobject){
    const url='api/Medication/Delete';
    return this.post(url, deleteobject);
}

// GetAllMedications
GetAllMedications(){
    const url='api/Medication/GetAllMedications';
    return this.get(url);
}

//  GetByMeicationId

GetByMeicationId(medicationId){
    const url='api/Medication/GetByMedicationId?MedicationId='+medicationId;
    return this.get(url);
}

//assign medications to client

assignmedicationstoclient(){
    const url='api/Medication/AssignMedicationsToClient';
    return this.get(url);
}
//assign medications to clientId
GetClientMedicationsByClientId(ClientId){
    const url='api/Medication/GetClientMedications?ClientId='+ClientId;
    return this.get(url);

}
    }