export class SchedulerModel {
  fromdate: any;
  todate: any;
  providerid: string;
}

export class GetSlotsModel {
  FromDate: string;
  ToDate: string;
  ProviderId: any;
  IsRegular: boolean;
  DOB: string;
  session: string;
  currenttime: string;
}
export class DataPassingModel {
  FirstName: string;
  LastName: string;
  Email: string;
  Birthdate: any;
  Zipcode: string;
  PhoneNo: string;
  Fromdate: any;
  Todate: any;
  Logindob: any;
  location: string;
  constructor() {
    this.FirstName = "";
    this.LastName = "";
    this.Email = "";
    this.Zipcode = "";
    this.PhoneNo = "";
    this.Fromdate = "";
    this.Todate = "";
    this.Logindob = "";
    this.location = "";
  }
}
export enum sessionenum {
  Morning,
  Afternoon,
  AnyTime
}
export enum statusenum {
  Answered,
  Unanswered
}
export enum statusenum1 {
  Approve,
  Decline
}
export class RegistrationModel {
  Id: number;
  FirstName: string;
  Email: string;
  LastName: string;
  PhoneNo: string;
  Address: string;
  Address2: string;
  City: string;
  Country: string;
  State: string;
  Message: string;
  Zipcode: string;
  slotdate: string;
  fromtime: string;
  totime: string;
  DOB: string;
  ProviderId: any;
  AppointmentTypeId: number;
  Gender: string;
  MaritialStatus: string;
  SSN: string;
  CountryId: any;
  StateId: any;
  IsVipPatient: boolean;
  ImageUrl: any;
  Age: any;
  LeadGuid: string;
  LocationId: any;
  constructor() {
    this.Id = 0;
      this.FirstName = '';
      this.Email = '';
      this.LastName = '';
      this.PhoneNo = '';
      this.Address = '';
      this.Address2 = '';
      this.City = '';
      this.State = '';
      this.Message = '';
      this.Zipcode = '';
      this.slotdate = '';
      this.fromtime = '';
      this.totime = '';
      this.DOB = null;
      this.ProviderId = 0;
      this.AppointmentTypeId = 0;
      this.Country = "";
      this.Gender = "";
      this.MaritialStatus = "";
      this.SSN = "";
      this.CountryId = "";
      this.StateId = "";
      this.IsVipPatient = false;
      this.ImageUrl = "";
      this.Age = null;
      this.LeadGuid = null;
      this.LocationId = null;
  }
}
export class PersonalInfo {
  Id: number;
  Address: string;
  Address2: string;
  DOB: string;
  AltPhoneNo: string;
  City: string;
  Country: string;
  Email: string;
  FirstName: string;
  Gender: string;
  LastName: string;
  MaritialStatus: string;
  PhoneNo: string;
  State: string;
  Zipcode: string;
  Date: string;
  SSN: string;
  ImageUrl: any;
  CountryId: any;
  StateId: any;
  IsVipPatient: boolean;
  constructor() {
    this.Id = 0;
    this.Address = "";
    this.Address2 = "";
    this.DOB = "";
    this.City = "";
    this.Country = "";
    this.Email = "";
    this.FirstName = "";
    this.Gender = "";
    this.LastName = "";
    this.MaritialStatus = "";
    this.PhoneNo = "";
    this.State = "";
    this.Zipcode = "";
    this.Date = "";
    this.SSN = "";
    this.ImageUrl = "";
    this.CountryId = "";
    this.StateId = "";
    this.IsVipPatient = false;
  }
}
export class PharmacyModel {
    Id: number;
    PharmacyMasterId:number;
    PreferredPharmacy: string;
    PharmacyAddress1: string;
    PharmacyAddress2: string;
    PharmacyPhoneNumber: string;
    State: string;
    ZipCode: string;
    IsActive: boolean;
    CreatedOn: string;
    CreatedBy: number;
    ModifiedBy: number;
    ModifiedOn: string;
    PersonId: number;
}
export class RefferalModel {
  Id: number;
  HowDidYouHearAboutUs: string;
  HowDidYouHearAboutUsOther: string;
  NameOfReferringProviderFromWebsite: string;
  NameOfReferringProviderOrganization: string;
  WereyouReferredByAnotherProvider: string;
  ReferringProviderOrganizationIfNo: string;
  IsActive: boolean;
  CreatedOn: string;
  CreatedBy: number;
  ModifiedBy: number;
  ModifiedOn: string;
  PersonId: number;
  constructor() {
    this.ReferringProviderOrganizationIfNo = '';
  }
}
export class adminstaff {
  StaffId: number;
  AltPhoneNo: string;
  Email: string;
  FirstName: string;
  LastName: string;
  PhoneNo: string;
  ImageUrl: any;
  DesignationId: any;
  DesignationName: any;
  Date: any;
  StaffName: string;
  Name: string;
  ProviderData: providerdata;
}

export class providerdata {
ProviderId: string;
ProviderName: string;
Email: string;
ServiceTypePKId: number;
ServiceType: any;
ServiceTypeRefId: number;
ProviderTypePKId: number;
ProviderType: string;
ProviderTypeRefId: number;
Description: string;
DesignationId: any;
DesignationName: any;
PhoneNo: string;
AltPhoneNo: string;
ImageUrl: any;
}

export class SubsriberModel {
  Id: number;
  SubscriberType: string;
  IsPatientSameAsSubscriber: boolean;
  SubscriberFirstName: string;
  SubscriberLastName: string;
  SubscriberPhoneNumber: string;
  SubscriberState: string;
  SubscriberCity: string;
  SubscriberDob: string;
  SubscriberGender: string;
  SubscriberHomeAddress: string;
  SubscriberEmail: string;
  RelationshipToPatient: string;
  SubscriberZipCode: string;
  PersonId: number;
  CreatedOn: string;
  CreatedBy: number;
  ModifiedBy: number;
  ModifiedOn: string;
  IsActive: boolean;
}
export interface Slot {
  slotid: number;
  time: string;
}
export interface Dates {
  dayname: string;
  date: string;
  Slots: Slot[];
}

export interface Provider {
  id: string;
  name?: any;
  Dates: Dates[];
}
export interface SlotsData {
  Providers: Provider[];
}
export class FollowUpUser {
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
    AppointmentTypeId: number;
    constructor() {
        this.PatientId = '';
        this.ProviderId = '';
        this.SlotDate = '';
        this.FromTime = '';
        this.ToTime = '';
        this.Message = '';
        this.CancelledSlotId = 0;
        this.CreatedOn = '';
        this.CreatedBy = '';
        this.BookedSlotId = 0;
        this.AppointmentTypeId = 0;
    }
}
export class CreditcardModel {
  Id: number;
  CardType: string;
  CardExpirationDate: string;
  CardNumber: string;
  CreditCardAuthorized: boolean;
  NameOnTheCard: string;
  IsActive: boolean;
  Cvv: string;
  PersonId: number;
  CreatedOn: string;
  CreatedBy: string;
  ModofiedOn: string;
  ModifiedBy: string;
  Expdate: string;
  constructor() {
    this.Id = 0;
    this.CardType = "";
    this.CardExpirationDate = "";
    this.CardNumber = "";
    this.CreditCardAuthorized = false;
    this.NameOnTheCard = "";
    this.IsActive = false;
    this.Cvv = "";
    this.Expdate = "";
    this.PersonId = 0;
    this.CreatedOn = "";
    this.CreatedBy = "";
    this.ModofiedOn = "";
    this.ModifiedBy = "";
  }
}
export class InsuranceModel {
  Id: number;
  InsuranceId: string;
  InsuranceName: string;
  CoverageType: string;
  FrontOnCard: any;
  BackOnCard: any;
  PersonId: number;
  CreatedOn: string;
  CreatedBy: number;
  ModifiedBy: number;
  ModifiedOn: string;
  IsActive: boolean;
  Insurancevalid: string;
  constructor(){
    this.InsuranceId="";
    this.InsuranceName="";
  }
}
export enum CradTypes {
  visa,
  masterCard,
  AmericanExpress
}

export class User {
  id: number;
  name: string;
  age: number;
  height: string;
  weight: string;
  bmi: number;

  constructor() {
    this.height = '';
    this.weight = '';
  }
}
