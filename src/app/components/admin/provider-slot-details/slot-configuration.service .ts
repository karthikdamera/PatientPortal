import { Injectable } from '@angular/core';
import { HttpClient } from '../../../shared/services/httpClient.service';
import { AdminBaseService } from '../adminBaseService';

@Injectable()
export class SlotConfigurationService extends AdminBaseService {
   constructor(private http: HttpClient) {
       super(http);
   }

   /**
    * Provider information: Getting the data of providers;
    */
   getProviders() {
       // const url = Api.base_url + '/api/Provider/GetProvidersList';
       // return this._http.get(url);
       const url = 'api/Provider/GetProvidersList';
       return this.get(url);
   }
   getLocations() {
    // const url = Api.base_url + '/api/Provider/GetProvidersList';
    // return this._http.get(url);
    const url = 'api/Locations/All';
    return this.get(url);
}
   /**
    * Posting the slot configuration data
    * @param slotData :slot configuration data
    */
   slotConfigurationSave(slotData) {
       const url = 'api/Provider/SlotConfigurationSave';
       return this.post(url, slotData);
   }

   /**
    * Config Types get call
    */
   getConfigTypes() {
       const url = '/api/Slot/GetConfigTypes';
       return this.get(url);
   }
   /**
    * By passing provider id getting the provider configurations data
    * @param id: Provider Id
    */
   getProviderConfigs(id) {
       const url = 'api/Provider/GetProviderConfigs?id=' + id;
           console.log(url);
       return this.get(url);
   }

   /**
       } * Posting the data of slot configuration for updating the details
       } * @param slotData:Post data of slot configuration
       } */
   SlotConfigurationUpdate(slotData) {
       const url = 'api/Provider/SlotConfigurationUpdate';
       console.log(url);
       return this.post(url, slotData);
   }
}
