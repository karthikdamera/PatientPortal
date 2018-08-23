

export class AppointmentDayModel {
    Workingdays: string;
    constructor() {
        this.Workingdays = '';
    }
}
export class IntigrationModel {
    EhrType: string;
    LoginUrl: string;
    CredentialsType: string;
    ServiceAPIurl: string;
    APIkey: string;
    UserName: string;
    Password: string;
    OfficeKey: string;
    AppName: string;
    constructor() {
        this.EhrType = '';
        this.LoginUrl = '';
        this.CredentialsType = '';
        this.ServiceAPIurl = '';
        this.APIkey = '';
        this.UserName = '';
        this.Password = '';
        this.OfficeKey = '';
        this.AppName = '';
    }
}
export class TwilioSmsModel {
    // smstypevalue: string;
    TwilioAccountSid: string;
    TwilioAuthTokenn: string;
    FromNumber: string;
    IsActive: boolean;
    constructor() {
        this.TwilioAccountSid = '';
        this.TwilioAuthTokenn = '';
        this.FromNumber = '';
        this.IsActive = false;
    }
}
