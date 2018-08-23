import { Api } from './../../../../environments/environment';
import { HttpClient } from './../../../shared/services/httpClient.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AdminBaseService } from '../adminBaseService';
import { HttpModule, Http, Response, RequestOptions, Headers } from '@angular/http';

@Injectable()
export class ChatService extends AdminBaseService {

    constructor(private http: HttpClient, private _httpjson: Http) {
        super(http);
     }
    getproviderList() {
        const url = 'api/Twilio/IncomingPhoneNumbers';
        console.log(url);
        return this.get(url);
    }
    postMessage(postdata) {
        console.log(JSON.stringify(postdata));
        const url = 'api/Twilio/SendSMS';
        return this.post(url, postdata);
    }
    getpatientdata(phonenumber) {
        const url = 'api/Twilio/GetPatientPhoneNumbers?ProviderPhone=' + phonenumber;
        console.log(url);
        return this.get(url);
    }
    getOrganizations() {
        const url = 'api/Group/GetAll';
        console.log(url);
        return this.get(url);
    }
    postproviders(data) {
        const url = 'api/Group/save';
        return this.post(url ,data);
    }
    getSmslist(tonumber , fromnumber) {
        const url = 'api/Twilio/SentSMShistory?ProviderPhone=' + fromnumber + '&PatientPhone=' + tonumber;
        console.log(url);
        return this.get(url);
    }
    postcsvdata (data) {
      const url = 'api/ContactGroupMembers/ImportContactCSV';
      console.log(url);
      return this.post(url, data);
    }
    // GetPatientPhoneNumbers(data) {
    //   const url = 'api/Twilio/GetPatientPhoneNumbers';
    //     console.log(url);
    //     return this.post(url, data);
    // }
}


