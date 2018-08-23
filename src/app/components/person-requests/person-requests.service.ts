import { PersonRequestsService } from './../person/requests/requests.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Http, Response } from '@angular/http';
import { HttpClient } from '../../shared/services/httpClient.service';
@Injectable()
export class PersonRequestService extends PersonRequestsService {

    constructor(private http: HttpClient, private _httpjson: Http) {
        super(http);
    }
    getslotsbyguid(guid) {
      const url = 'api/Person/GetSlotDetailsByGuid?guid=' + guid;
      console.log(url);
      return this.get(url);
    }
    cancelslotsbyguid(guid) {
        const url = 'api/Person/CancelAppoinmentByGuid';
        console.log(url);
        return this.post(url, guid);
      }
}
