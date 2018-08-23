import { PersonBaseService } from './../../person/personBaseService';
import { Api } from './../../../../environments/environment.prod';
import { HttpClient } from './../../../shared/services/httpClient.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
@Injectable()
export class CreditCardService extends PersonBaseService {

    constructor(private _http: HttpClient) {
        super(_http);
    }
    /**
     *get call for credit card information
     * @param id
     */
    getCreditcardInfo(id) {
        const url = 'api/PaymentMethod/GetByPersonId?PersonId=' + id;
        return this.get(url);
    }
    /**
     *post call for adding new card
     * @param patientData
     */
    addCreditCard(patientData) {
        const url = 'api/PaymentMethod/Save';
        return this.post(url, patientData);
    }
    /**
     *post call for status update
     * @param data
     */
    statusChange(data) {
        const url = 'api/PaymentMethod/UpdateCardStatus';
        return this.post(url, data);
    }
    authorizeCreditcard(cardinfo) {
        console.log(cardinfo);
        console.log(JSON.stringify(cardinfo));
        const url = 'api/Authorize/AuthorizeCard';
        console.log(url);
        return this.postInsurance(url, cardinfo);
    }
}
