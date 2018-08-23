import { HttpClient } from './../../shared/services/httpClient.service';
import { AdminBaseService } from '../admin/adminBaseService';
import { Api } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';


@Injectable()
export class CampaignService extends AdminBaseService {
    constructor(private http: HttpClient) {
        super(http);
    }
    /**
     *get call for credit card information
     * @param id
     */
    getCampaignGuid(id) {
        const url = 'api/Campaign/GetCampaignByGuid?Guid=' +id;
        return this.get(url);
    }
    postStaffInfo(providerData) {
        const url = 'api/Campaign/SaveAttendee';
        return this.post(url, providerData);
    }
}


