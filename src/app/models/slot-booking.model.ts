export class EditPatientSlot {
    patinetname: string;
    patientdob: any;
    patientslotdate: any;
    patientage: string;
    selecteddate: any;
    selectedbirthdate: any;
    duration: string;
    PatientId: number;
    BookedSlotId: number;
    providerId: any;
    session: string;
    currenttime: string;
    slotfromtime: string;
    slottotime: string;
    Message: string;
    firstname: string;
    lastname: string;
    mobilenumber: string;
    email: string;
    ImageUrl: string;
    BookingStatus: string;
    LocationId: string;
    AppointmentTypeId: number;
    constructor() {
        this.patinetname = '';
        this.patientdob = '';
        this.patientage = '';
        this.selecteddate = '';
        this.selectedbirthdate = '';
        this.duration = '';
        this.PatientId = 0;
        this.BookedSlotId = 0;
        this.providerId = '';
        this.session = 'NoPreference';
        this.currenttime = '';
        this.slotfromtime = '';
        this.slottotime = '';
        this.Message = '';
        this.firstname = '';
        this.lastname = '';
        this.mobilenumber = '';
        this.email = '';
        this.ImageUrl = '';
        this.BookingStatus = '';
        this.LocationId = '0';
        this.AppointmentTypeId = 0;
    }
}
export class Patient {
    Id: number;
    PatientName: string;
}

export interface EventList {
    title: string;
    start: Date;
    // patient: Patient;
}
export enum SlotbookingStstusEnum {

    Confirm = 1,
    Cancel = 2
}
export class GetSlotInput {
    CurrentDate: string;
    FromDate: string;
    ToDate: string;
    StatusIds: string;
    ProviderIds: string;
    PatientId: number;
    IsAllProviders: boolean;
    IsAllStatus: boolean;
    constructor() {
        this.CurrentDate = '';
        this.FromDate = '';
        this.ToDate = '';
        this.StatusIds = '';
        this.ProviderIds = '';
        this.PatientId = 0;
        this.IsAllProviders = true;
        this.IsAllStatus = true;
    }

}



