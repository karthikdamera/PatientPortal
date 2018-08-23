
import { Api } from './../../../environments/environment.prod';
import { environment, Config } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/delay';
// tslint:disable-next-line:import-blacklist
import 'rxjs/Rx';
import { Http, Headers, Response } from '@angular/http';
import { Route, Router } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { LoaderService } from '../loader/loaderservice';
@Injectable()
export class HttpClient {
    responsemap = new AuthRespose();
    serviceAppend = 'service.';
    httpPrepend = 'https://';
    constructor(private http: Http, private router: Router,
        private loaderService: LoaderService) { }
    private refreshToken = new Subject<string>();
    createJsonHeader(headers: Headers, method: string) {
        const token: any = localStorage.getItem(Config.ID_TOKEN);
        // headers.append('Access-Control-Request-Method', method);
        if (token != null && token !== undefined) {
            headers.append('Authorization', 'bearer ' + token);
        }
        headers.append('Content-Type', 'application/json'); // application/x-www-form-urlencoded
    }
    createHeader(headers: Headers) {
        // const token = localStorage.getItem(Config.ID_TOKEN);
        // if (token != null && token !== undefined) {
        //     // headers.append('Authorization', 'bearer ' + localStorage.getItem(Config.ID_TOKEN));
        // }
        headers.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8'); // application/x-www-form-urlencodeds
    }
    get(url, hasBaseUrl: boolean, returnJson?: boolean) {
        this.loaderService.show();
        const headers = new Headers();
        this.createJsonHeader(headers, 'GET');
        if (!hasBaseUrl) {
            url = Api.base_url + url;

            // let hostname: Array<string>;
            // hostname = window.location.hostname.split('.');
            // const base = this.httpPrepend + hostname[0] + '.' + hostname[1] + this.serviceAppend + hostname[2] + '/' + url;
            // url = base;
        }
        return this.http.get(url, {
            headers: headers
        }).map((res: Response) => {
            // this.tokenRefresh(url,false, true);
            //  this.status = false;
            this.loaderService.hide();
            return returnJson ? res.json() : res;
        }).catch(error => {
            this.loaderService.hide();
            return this.genarateRefreshToken(error);
        });
    }


    post(url, data, hasJsonbody?: boolean, hasBaseUrl?: boolean, returnJson?: boolean) {
        this.loaderService.show();
        if (!hasBaseUrl) {
            url = Api.base_url + url;

            // let hostname: Array<string>;
            // hostname = window.location.hostname.split('.');
            // const base = this.httpPrepend + hostname[0] + '.' + hostname[1] + this.serviceAppend + hostname[2] + '/' + url;
            // url = base;
        }
        const body: string = JSON.stringify(data);
        const headers = new Headers();
        hasJsonbody = (hasJsonbody == null) ? false : hasJsonbody;
        if (hasJsonbody) {
            this.createJsonHeader(headers, 'POST');
        } else {
            this.createHeader(headers);
        }
        return this.http.post(url, data, {
            headers: headers
        }).map((res: Response) => {
            this.loaderService.hide();
            return returnJson ? res.json() : res;
        }).catch(error => {
            this.loaderService.hide();
            return this.genarateRefreshToken(error);
        });
    }
    RefreshToken(): Observable<string> {
        // this.refreshToken = Observable.of(localStorage.getItem(Config.REFRESH_TOKEN).toString());
        return Observable.of(localStorage.getItem(Config.REFRESH_TOKEN));
    }
    genarateRefreshToken(error) {
        if (error.status === 401) {
            //  refresh token
            return this.RefreshToken().flatMap((newToken) => {
                const clientDetails = 'client_id=' + Config.CLIENT_ID + '&client_secret=' + Config.CLIENT_SECRET;
                const data = clientDetails + '&grant_type=' + 'refresh_token' + '&refresh_token=' + newToken;
                const newheaders = new Headers({
                    'Content-Type': 'application/x-www-form-urlencoded',
                });
                return this.post('oauth/token', data, false, false, true).map((response: Response) => {
                    const rawResponse: any = <any>response;
                    const currentResponse = new AuthRespose();
                    if (rawResponse.access_token != null || rawResponse.access_token !== undefined) {
                        // console.log(rawResponse);
                        //  alert();
                        currentResponse.error = null;
                        currentResponse.isLoginSuccessful = true;
                        currentResponse.access_token = rawResponse.access_token;
                        currentResponse.refresh_token = rawResponse.refresh_token;
                    } else {
                        currentResponse.error = 'Incorrect username or password';
                        currentResponse.isLoginSuccessful = false;
                        currentResponse.access_token = undefined;
                        currentResponse.refresh_token = undefined;
                    }
                    return currentResponse;
                }).do(_data => {
                    // console.log('service data  ' + JSON.stringify(_data));
                    localStorage.removeItem(Config.ID_TOKEN);
                    localStorage.setItem(Config.ID_TOKEN, _data.access_token);
                    localStorage.setItem(Config.REFRESH_TOKEN, _data.refresh_token);
                    localStorage.setItem('secure', JSON.stringify(_data));
                }
                );
            });

        } else {
            this.loaderService.hide();
            return Observable.throw(error);
        }
    }
}

export class HTTPDefaultResponse {
    IsSuccess: boolean;
    DataObject: any;
    ErrorMessage: string;
}
export class AuthRespose {
    isLoginSuccessful: boolean;
    access_token: string;
    error: string;
    refresh_token: any;
}
