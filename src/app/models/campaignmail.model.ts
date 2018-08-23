export class CampaignMail {
    campaignid: number;
    personid: string;
}
export class CampaignEmails {
    campaignid: number;
    emails: Array<Emails>;
}
export class Emails {
    email:string;
}
export class MailArray {
    Id: number;
    FirstName: string;
    LastName: string;
    Email: string;
    PhoneNo: string;
    DOB: string;
    Gender: string;
    Checked: boolean;
    constructor() {
        this.Id = 0;
        this.FirstName = '';
        this.LastName = '';
        this.Email = '';
        this.PhoneNo = '';
        this.DOB = '';
        this.Gender = '';
        this.Checked = false;
    }
}