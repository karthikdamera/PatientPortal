import { Api } from './../../../../environments/environment';
import { HttpClient } from './../../../shared/services/httpClient.service';
import { AdminBaseService } from './../adminBaseService';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SettingServices extends AdminBaseService {
    constructor(private http: HttpClient) {
        super(http);
    }
    /**
    * To get GetProviderItems
    */
    getmailDetails() {
      
        const url = 'api/MailSettings/GetMailSettings';
        return this.get(url);
    }
    mailUpdatests(updatestsdata) {
        const url = 'api/MailSettings/UpdateStatus';
        return this.post(url, updatestsdata);
    }
    mailsettingPost(postdata) {
        const url = 'api/MailSettings/Save';
        return this.post(url, postdata);
    }
    deleteMailsetting(maildeleteData) {
        const url = 'api/MailSettings/Remove';
        console.log(url);
        return this.post(url, maildeleteData);
    }
    emailsubjectPost(postdata) {
        const url = 'api/MailSettings/EmailSubjectSave';
        return this.post(url, postdata);
    }
    getEmailSubjects() {
        const url = 'api/MailSettings/GetEmailSubjects';
        console.log(url);
        return this.get(url);
    }
}


