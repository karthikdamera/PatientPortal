import { Api } from './../../../../environments/environment';
import { SlotsData } from './../../../models/person-slot.model';
import { HttpClient } from './../../../shared/services/httpClient.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { EventList } from '../../../models/slot-booking.model';
import { AdminBaseService } from '../adminBaseService';


@Injectable()
export class MailUploadService extends AdminBaseService {
    constructor(private http: HttpClient) {
        super(http);
     }
     getdata(campaignid){
        const url = 'api/Campaign/GetCampaignEmailByCampaignId?campaignId='+campaignid;
        console.log(url);
        return this.get(url);
     }
     postuploaddata(data){
        const url = 'api/Campaign/EmailSending';
        console.log(url);
        return this.post(url,data);
     }
     postuploadCSVdata(data){
        const url = 'api/Campaign/ImportCSV';
        console.log(url);
        return this.post(url,data);
     }
     GetTemplates(){
        const url = 'api/Campaign/GetEmailTemplates';
        console.log(url);
        return this.get(url);
     }
    }