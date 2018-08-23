import { Api } from './../../../../environments/environment';
import { HttpClient } from './../../../shared/services/httpClient.service';
import { AdminBaseService } from './../adminBaseService';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class DesignationService extends AdminBaseService {
    constructor(private http: HttpClient) {
        super(http);
    }
    /**
     * Get call for staff roles
     */
    getDesigntion() {
        const url = 'api/Designation/GetStaffRoles';
        return this.get(url);
    }

    /**
     * Posting the provider designation data
     * @param opt:post data of provider designation
     */
    postDesigntion(opt) {
        const url = '/api/Designation/SaveDesignation';
        return this.post(url, opt);
    }
}


