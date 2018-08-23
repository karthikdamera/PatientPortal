import { PersonBaseService } from './../../person/personBaseService';
import { Api } from './../../../../environments/environment.prod';
import { HttpClient } from './../../../shared/services/httpClient.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { HttpModule, Http, Response, RequestOptions, Headers } from '@angular/http';

@Injectable()
export class SchedulerService extends PersonBaseService {

    constructor(private _http: HttpClient, private _httpjson: Http) {
        super(_http);
    }
    getproviderslotsInfo(searchDatabyservice) {
        console.log(JSON.stringify(searchDatabyservice));
        const url = 'api/Provider/GetProviderProfiles';
        return this.post(url, searchDatabyservice);
    }
    getproviderBookedslots(fromdate, todate, id) {
        console.log(fromdate +','+todate + ','+ id);
        // const url = 'assets/JsonData/bookedslot.json';
        // return this._httpjson.get(url)
        // .map((res: Response) => {
        //     return res.json();
        // });
        const url = 'api/Slot/ProviderBookedSlots';
        return this.post(url, { FromDate: fromdate, ToDate: todate, ProviderId: id });
    }
    getAppoinmenttype() {
        const url = 'api/Provider/GetAppointTypes';
        return this.get(url);
    }
    getLocationtype() {
        const url = 'api/Locations/All';
        return this.get(url);
    }
    regservice(regdata) {
        console.log(JSON.stringify(regdata));
        const url = 'api/Account/Register';
        console.log(url);
        return this.post(url, regdata);
    }
    followupUser(data) {
        const url = 'api/Slot/SaveBookedSlot';
        return this.post(url, data);
    }
    getslots(session, fmdt, todt, providerid, isRegular, dob, time) {
        // var result: any;
        let apiPath = 'GetAllSlots';
        const IsRegularUser = localStorage.getItem('IsRegular');
        // if (IsRegularUser !== '' && IsRegularUser === 'false') {
        //     apiPath = 'GetAllFollowupSlots';
        // }
        const url = 'api/Slot/' + apiPath + '?session=' + session + '&FromDate=' + fmdt + '&ToDate=' + todt +
            '&ProviderId=' + providerid + '&IsRegular=' + isRegular + '&DOB=' + dob + '&currenttime=' + time;
       // console.log(url);
        return this.get(url);
    }
    getImages() {
        const url = 'assets/JsonData/slids.json';
        return this._httpjson.get(url)
            .map((res: Response) => {
                return res.json();
            });
    }
    getstateNames(contryid) {
        const url = 'api/Account/GetStates?CountryId='+contryid;
        return this.get(url);
    }
    getOurTestimonials(){
        const url = 'api/NewsTestimoials/GetALL';
        return this.get(url);
    }
    getMonthname(d) {
        // let d = new Date();
        const month = new Array();
        month[0] = 'Jan';
        month[1] = 'Feb';
        month[2] = 'Mar';
        month[3] = 'Apr';
        month[4] = 'May';
        month[5] = 'Jun';
        month[6] = 'Jul';
        month[7] = 'Aug';
        month[8] = 'Sep';
        month[9] = 'Oct';
        month[10] = 'Nov';
        month[11] = 'Dec';
        const n = month[d.getMonth()];
        // console.log(n);
        return n;
    }
    getServiceType(Id) {
        const url = 'api/ProviderAppointmentType/GetProviderAppointments?providerId='+Id;
        return this.get(url);
    }
    postleads(model) {
        console.log(JSON.stringify(model));
        const url = 'api/Lead/Save';
        console.log(url);
        return this.post(url, model);
    }
    ratingPost(model){
        const url = 'api/ProviderRating/Save';
        return this.post(url, model);
    }
}

