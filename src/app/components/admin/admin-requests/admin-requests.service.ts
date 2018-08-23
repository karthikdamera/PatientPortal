import { Api } from './../../../../environments/environment';
import { HttpClient } from './../../../shared/services/httpClient.service';
import { AdminBaseService } from './../adminBaseService';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http, Response } from '@angular/http';

@Injectable()
export class adminrequests extends AdminBaseService {
    constructor(private http: HttpClient,private _httpjson: Http) {
        super(http);
    }
    adminrequestPost(statusdata) {
        const url = 'api/Requests/UpdateStatus';
        return this.post(url, statusdata);
    }
    statusjson(){
        const url = 'assets/JsonData/Requests.json';
        return this._httpjson.get(url)
            .map((res: Response) => {
                return res.json();
            });
    }
}


