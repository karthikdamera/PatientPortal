
export class PatientCard {
    PatientDetails: Person;
    Subscriber: Array<PersonSubscriber>;
    Referral: Array<PersonReferral>;
    Insurance: Array<PersonInsurance>;
    PaymentMethods: Array<PaymentMethods>;
    Pharmacy: Array<Pharmacy>;
    Appointments: Array<PersonBookedAppointmentResponse>;
    Attendence: Array<Attendence>;
    Encounter: Array<Encounter>;
    CareTeam: Array<CareTeam>;
}


export class Person {
    ProviderId: number;
    Id: number;
    FirstName: string;
    LastName: string;
    Email: string;
    PhoneNo: string;
    AltPhoneNo: string;
    Address: string;
    Address2: string;
    Gender: string;
    Age: number;
    DOB: any;
    MaritialStatus: string;
    State: string;
    City: string;
    Country: string;
    CreatedOn: any;
    Zipcode: string;
    CreatedBy: string;
    ModifiedOn: any;
    ModifiedBy: string;
    IsActive: boolean;
    slotid: string;
    slotdate: string;
    password: string;
    ImageUrl: any;
    fromtime: string;
    totime: string;
    Message: string;
    SSN: string;
    IsVipPatient: boolean;
}

export class PersonSubscriber {
    Id: number;
    SubscriberType: string;
    IsPatientSameAsSubscriber: string;
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
    PersonId: number;
    CreatedOn: any;
    CreatedBy: number;
    ModifiedBy: number;
    ModifiedOn: any;
    IsActive: boolean;
    SubscriberZipCode: string;
}

export class PersonReferral {
    Id: number;
    ReferringProviderOrganizationIfNo: string;
    WereyouReferredByAnotherProvider: string;
    HowDidYouHearAboutUs: string;
    NameOfReferringProviderFromWebsite: string;
    NameOfReferringProviderOrganization: string;
    HowDidYouHearAboutUsOther: string;
    CreatedBy: number;
    CreatedOn: any;
    ModifiedBy: number;
    ModifiedOn: any;
    PersonId: number;
    IsActive: boolean;
}

export class PersonInsurance {
    Id: number;
    InsuranceId: string;
    InsuranceName: string;
    PersonId: number;
    CoverageType: string;
    FrontOnCard: string;
    BackOnCard: string;
    IsActive: boolean;
    CreatedOn: any;
    CreatedBy: number;
    ModifiedBy: number;
    ModifiedOn: any;
}
export class PaymentMethods {
    Id: number;
    CardExpirationDate: string;
    CardNumber: string;
    CreditCardAuthorized: boolean;
    NameOnTheCard: string;
    IsActive: boolean;
    Cvv: string;
    PersonId: number;
    CreatedOn: any;
    CreatedBy: number;
    ModofiedOn: any;
    ModifiedBy: number;
    CardType: string;
}
export class Pharmacy {
    Id: number;
    PreferredPharmacy: string;
    PharmacyPhoneNumber: string;
    PharmacyAddress1: string;
    ZipCode: string;
    IsActive: boolean;
    CreatedOn: any;
    CreatedBy: number;
    ModifiedBy: number;
    ModifiedOn: any;
    PersonId: number;
    PharmacyAddress2: string;
    State: string;
}

export class PersonBookedAppointmentResponse {
    Id: number;
    ServiceType: string;
    ProviderName: string;
    FromTime: string;
    ToTime: string;
    Date: string;
    BookingStatus: string;

}
export class Attendence {
    Id: number;
    AppointmentDateTime: string;
    AppointmentNumber: string;
    CheckInDateTime: any;
    LateMinutes: number;
    LateNotes: string;
    BookedFrom: string;
    BookedTo: string;
    AppointmentId: number;
    ProviderId: number;
    ProviderName: string;

}

class Encounter {
    Title: string;
    Description: string;
    Date: any;
}
export class CareTeam {
    Id: number;
    Email: string;
    DesignationId: number;
    PhoneNo: string;
    IsActive: boolean;
    Name: string;
    Gender: string;
    ServiceType: string;
    Description: string;
    ImageUrl: string;
    LocationUrl: string;
    LocationName: string;
}