
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Api } from '../../../environments/environment.prod';
import { HttpClient } from '../../shared/services/httpClient.service';
import { PersonBaseService } from '../../components/person/personBaseService';

@Injectable()
export class ForgotService extends PersonBaseService {

    constructor(private _http: HttpClient) {
        super(_http);
    }
    /**
     *
     * @param opt for forgot password
     */
    ForgotPassword(opt) {
        const url = 'api/Account/ForgotPassword';
        return this.post(url, opt);
    }
    /**
     *
     * @param opt for otp post
     */
    OtpRequest(opt) {
        const url = 'api/Account/OtpVerification';
        console.log(url);
        return this.post(url, opt);
    }
    /**
     *
     * @param opt for new password
     */
    ChangePassword(opt) {
        const url = 'api/Account/ChangePassword';
        return this.post(url, opt);
    }
}


