import { Api } from './../../../../environments/environment';
import { SlotsData } from './../../../models/person-slot.model';
import { HttpClient } from './../../../shared/services/httpClient.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { EventList } from '../../../models/slot-booking.model';
import { AdminBaseService } from '../adminBaseService';
import { Http , Response} from '@angular/http';
@Injectable()
export class journalEntriesService extends AdminBaseService {
    constructor(private _http: HttpClient, private _httpjson: Http) {
        super(_http);
    }
    getJournalEntries(Id) {
        const get_Url: string = 'api/Journal/GetJournalByClientId?ClientId=' + Id;
        return this.get(get_Url);
    }
}