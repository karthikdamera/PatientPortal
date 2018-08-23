export class ProvidersModel {
    ProviderId: number;
    ProviderName: string;
    ServiceTypePKId: any;
    ServiceTypeRefId: any;
    ProviderTypePKId: any;
    ProviderTypeRefId: any;
    Email: any;
    DesignationId: any;
    PhoneNo: string;
    AltPhoneNo: string;
    Date: any;
    UserName: string;
    ImageUrl: string;
    Description:string;
    LocationUrl:string;
    Address1:string;
    constructor() {
        this.ProviderId = 0;
        this.ProviderName = '';
        this.ServiceTypePKId = 0;
        this.ServiceTypeRefId = '';
        this.ProviderTypePKId = 0;
        this.ProviderTypeRefId = '';
        this.Email = '';
        this.DesignationId = '';
        this.PhoneNo = '';
        this.AltPhoneNo = '';
        this.Date = null;
        this.UserName = 'Usha';
        this.ImageUrl = '';
        this.Description="";
        this.LocationUrl="";
        this.Address1="";
    }
}

export class Slotavailability {
    ProviderId: number;
    AvailableSlots: Array<AvailableSlots>;
    constructor() {
        this.ProviderId = 0;
        this.AvailableSlots = [];
    }
}
export class AvailableSlots {
    date: string;
    duration: string;
    AvailableTimes: string;
    constructor() {
        this.date = '';
        this.duration = '';
        this.AvailableTimes = '';
    }
}

export class GetcallObj {
    ProviderId: number;
    date: string;
    constructor() {
        this.ProviderId = 0;
        this.date = '';
    }
}
