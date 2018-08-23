import { Api } from './../../../../environments/environment';
import { SlotsData } from './../../../models/person-slot.model';
import { HttpClient } from './../../../shared/services/httpClient.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { EventList } from '../../../models/slot-booking.model';
import { AdminBaseService } from '../adminBaseService';


@Injectable()
export class CampaignService extends AdminBaseService {

    constructor(private http: HttpClient) {
        super(http);
     }


    getcampaigndata1() {
        const url = 'api/Campaign/GetAllCampaigns';
      //  console.log(url);
        return this.get(url);
    }
    getcampaigndata(datemodel) {
      //  console.log(datemodel);
        const url = 'api/Campaign/FilteredCampaigns';
      //  console.log(url);
        return this.post(url,datemodel);
    }
    campaignPost(data) {
      //  console.log(JSON.stringify(data));
        const url = 'api/Campaign/Save';
        return this.post(url, data);
    }
    campaignDeleted(data) {
        const url = 'api/Campaign/UpdateStatus';
        return this.post(url, data);
    }
    getMonthname(d) {
        // let d = new Date();
        const month = new Array();
        month[0] = '01';
        month[1] = '02';
        month[2] = '03';
        month[3] = '04';
        month[4] = '05';
        month[5] = '06';
        month[6] = '07';
        month[7] = '08';
        month[8] = '09';
        month[9] = '10';
        month[10] = '11';
        month[11] = '12';
        const n = month[d.getMonth()];
        // console.log(n);
        return n;
    }

}


