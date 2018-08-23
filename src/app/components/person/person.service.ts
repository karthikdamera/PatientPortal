import { Api } from './../../../environments/environment.prod';
import { HttpClient } from './../../shared/services/httpClient.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Http , Response} from '@angular/http';
@Injectable()
export class PersonService {
    constructor(private httpClient: HttpClient, private _httpjson: Http) { }

    getMenu() {
        const url = 'assets/JsonData/personmenu.json';
        return this._httpjson.get(url)
        .map((res: Response) => {
            return res.json();
        });
    }
}