import { Api } from './../../../../environments/environment';
import { HttpClient } from './../../../shared/services/httpClient.service';
import { AdminBaseService } from './../adminBaseService';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class ProvidersService extends AdminBaseService {
    constructor(private http: HttpClient) {
        super(http);
    }
    /**
    * To get GetProviderItems
    */
    GetProviderItems() {
        const url = 'api/Provider/GetProviderItems';
        return this.get(url);
    }
    /**
    * To get GetProvidersList
    */
    GetProvidersList() {
        const url = 'api/Provider/GetProvidersList';
        return this.get(url);

    }
    /**
     * post the provider information
     * @param providerData
     */
    postProviderInfo(providerData) {
        //  alert(JSON.stringify(providerData));
        const url = 'api/Provider/ProviderSave';
        return this.post(url, providerData);
    }
    postAvailableSlotData(slotData) {
        const url = 'api/UploadAvailableSlot/UploadSlots';
        return this.post(url, slotData);
    }
    getAvailableSlotData(getobj) {
        const url = 'api/UploadAvailableSlot/GetUploadedSlots';
        console.log(getobj);
        return this.post(url, getobj);
    }
}


