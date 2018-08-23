import { Api } from './../../../../environments/environment';
import { SlotsData } from './../../../models/person-slot.model';
import { HttpClient } from './../../../shared/services/httpClient.service';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { EventList } from '../../../models/slot-booking.model';
import { AdminBaseService } from '../adminBaseService';

@Injectable()
export class AdminSettingsService extends AdminBaseService {
  constructor(private http: HttpClient) {
    super(http);
  }
  getorgdata() {
    const url = 'api/Tenant/GetOrgSettings';
    console.log(url);
    return this.get(url);
  }
  getsliderdata() {
    const url = 'api/Tenant/GetSliderImages';
    return this.get(url);
  }
  getintigartiondata() {
    const url = 'api/Tenant/GetEHRSettings';
    console.log(url);
    return this.get(url);
  }
  postintigartiondata(data) {
    const url = 'api/Tenant/SaveEHRSettings';
    console.log(url);
    return this.post(url, data);
  }
  postorgdata(data) {
    const url = 'api/Tenant/SaveOrgSettings';
    console.log(url);
    return this.post(url, data);
  }
  postsliderdata(data) {
    const url = 'api/Tenant/SaveSliderImage';
    console.log("silders"+JSON.stringify(data));
    return this.post(url, data);
  }
  getappointment(){
    const url = 'api/Tenant/GetAppointmentDaySetting';
    return this.get(url);
  }
  postappointment(data) {
    const url = 'api/Tenant/SaveAppointmentDaySetting';
    console.log(url);
    return this.post(url, data);
  }
  GetSmsSetting() {
    const url = 'api/Tenant/GetSmsSetting';
    console.log(url);
    return this.get(url);
  }

  SaveSmsSetting(data) {
    const url = 'api/Tenant/SaveSmsSetting';
    console.log(url);
    return this.post(url, data);
  }
}
