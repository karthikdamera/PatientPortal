export class Appointments {
    profile: ProfileModel;
    emptySlots: Array<EmptySlotsModel>;
    showProviderDetails: boolean;
    constructor() {
        this.profile = new ProfileModel();
        this.emptySlots = [];
        this.showProviderDetails = false;
    }
}
export class ProfileModel {
    Id: number;
    Email: string;
    Name: string;
    ServiceType: string;
    Description: string;
    ImageUrl: string;
    LocationUrl: string;
    Gender: string;
    Settings: SettingsModel;
    constructor() {
        this.Id = 0;
        this.Email = '';
        this.Name = '';
        this.ServiceType = '';
        this.Description = '';
        this.ImageUrl = '';
        this.LocationUrl = '';
        this.Gender = '';
        this.Settings = new SettingsModel();
    }
}
export class SettingsModel {
    MorningFrom: string;
    MorningTo: string;
    AfternoonFrom: string;
    AfternoonTo: string;
    EveningFrom: string;
    EveningTo: string;
    interval: string;
    AppointmentTypeId: string;
    Workingdays: string;
    LocationName: string;
    StateName: string;
    Rating: number;
    AvailableDates: string;
    DisableSlots: boolean;
    EndInDays: number;
    PersonRating:number;
    constructor() {
        this.MorningFrom = '';
        this.MorningTo = '';
        this.AfternoonFrom = '';
        this.AfternoonTo = '';
        this.EveningFrom = '';
        this.EveningTo = '';
        this.interval = '';
        this.Rating = 0;
        this.PersonRating=0;
        this.AppointmentTypeId = '';
        this.Workingdays = '';
        this.LocationName = '';
        this.StateName = '';
        this.AvailableDates = '';
        this.DisableSlots = false;
        this.EndInDays = 0;
    }
}
export class EmptySlotsModel {
    dayname: string;
    date: string;
    Displaydate: string;
    slots: Array<SlotsModel>;
    constructor() {
        this.dayname = '';
        this.date = '';
        this.Displaydate = '';
        this.slots =  [];
    }
}
export class SlotsModel {
    Blocked: string;
    slotid: number;
    SlotStatus: string;
    fromtime: string;
    totime: string;
    duration: string;
    constructor() {
    this.Blocked = 'false';
    this.slotid = 0;
    this.SlotStatus = 'free';
    this.fromtime = '';
    this.totime = '';
    this.duration = '';
    }
}
export class SearchModel {
    AppointmentTypeId: number;
    Location: string;
    DOB: string;
    ScheduleDate: string;
    ProviderId: any;
    PersonId:number;
    birthday: string;
    today: string;
    constructor() {
    this.AppointmentTypeId = 0;
    this.Location = '0';
    this.DOB = '';
    this.ScheduleDate = '';
    this.ProviderId = 0;
    this.birthday = '';
    this.today = '';
    this.PersonId=0;
    }
}
    export class AppointmentModel {
        ProviderName: string;
        PersonEmail: string;
        PersonName: string;
        PersonId: number;
        ProviderId: number;
        PatientImage: string;
        Guid: string;
        BookingStatus: string;
        BookedTime: string;
        BookedDate: string;
        ProviderImage: string;
        constructor() {
        this.ProviderName = '';
        this.PersonEmail = '';
        this.PersonName = '';
        this.PersonId = 0;
        this.ProviderId = 0;
        this.PatientImage = '';
        this.Guid = '';
        this.BookingStatus = 'Booked';
        this.BookedTime = '';
            this.BookedDate = '';
            this.ProviderImage = '';
        }
    }

export class RatingModel{
    PersonId:number;
    ProviderId:number;
    Rating:number;
    Review:string;
    IsActive:boolean;
    CreatedOn:string;
    CreatedBy:number;
    TenantId:number;
    constructor(){
        this.PersonId=0;
        this.CreatedBy=0;
        this.CreatedOn='';
        this.IsActive=true;
        this.ProviderId=0;
        this.Rating=0;
        this.Review='';
        this.TenantId=0;

    }

}