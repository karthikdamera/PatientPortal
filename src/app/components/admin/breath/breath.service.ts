import { Api } from './../../../../environments/environment';
import { SlotsData } from './../../../models/person-slot.model';
import { HttpClient } from './../../../shared/services/httpClient.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { EventList } from '../../../models/slot-booking.model';
import { AdminBaseService } from '../adminBaseService';
import { Http , Response} from '@angular/http';
@Injectable()
export class PatientBreathService extends AdminBaseService {
    constructor(private _http: HttpClient, private _httpjson: Http) {
        super(_http);
    }
    postBreath(opt) {
        const url = 'api/Breath/SaveClientBreath ';
        return this.post(url, opt);
    }
    getBreath(Id) {
        const get_Url: string = 'api/Breath/BreathsByClientId?ClientId=' + Id;
        return this.get(get_Url);
    }
    breathUpdate(opt) {
        const url = 'api/Breath/SaveClientBreathStatus ';
        return this.post(url, opt);
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
}