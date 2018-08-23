export class StaffModel {
    StaffId: number;
    StaffName: string;
    Email: any;
    DesignationId: any;
    PhoneNo: string;
    AltPhoneNo: string;
    IsActive: boolean;
    Date: any;
    UserName: string;
    ImageUrl: string;
    constructor() {
        this.StaffId = 0;
        this.StaffName = '';
        this.Email = '';
        this.DesignationId = '';
        this.PhoneNo = "";
        this.AltPhoneNo = "";
        this.IsActive = true;
        this.Date = null;
        this.UserName = 'Usha';
        this.ImageUrl = '';
    }
}
