export class BookSlot {
    BookedDate: string;
    BookedDay: string;
    ProviderName: string;
    constructor() {
        this.BookedDate = '';
this.BookedDay = '';
this.ProviderName = '';
    }
}
export class Appointment{
    PersonId:number;
    ProviderId:number;
    Guid:string;
    PersonName:string;
    PersonEmail:string;
    BookedDate:string;
    BookedTime:string;
    ProviderName:string;
    PatientImage:string;
    BookingStatus:string;
    constructor(){
        this.PersonId=0;
        this.ProviderId=0;
        this.Guid="";
        this.PersonName="";
        this.PersonEmail="";
        this.BookedDate="";
        this.BookedTime="";
        this.ProviderName="";
        this.PatientImage="";
        this.BookingStatus="Booked";
    }
}
export class NewAppointment{
    Guid:string;
    PatientId: any;
    ProviderId: any;
    SlotDate: string;
    FromTime: string;
    ToTime: string;
    Message: string;
    CancelledSlotId: number;
    CreatedOn: string;
    CreatedBy: string;
    BookedSlotId: number;
    constructor(){
        this.Guid="";
        this.PatientId= 0;
        this.ProviderId=0;
        this.SlotDate="";
        this.FromTime="";
        this.ToTime="";
        this.Message="";
        this.CancelledSlotId=0;
        this.CreatedOn="";
        this.CreatedBy="";
        this.BookedSlotId=0;

    }

}