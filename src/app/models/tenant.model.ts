
export class TenantResponse {
    OrganisationSettings: OrganisationModel;
    SliderSettings: SliderModel;
    ImagesUrl: string;
    Domain: string;
    constructor() {
        this.Domain = '';
        this.ImagesUrl = '';
        this.OrganisationSettings = new OrganisationModel();
        this.SliderSettings = new SliderModel();
    }
}

export class OrganisationModel {
    OrgLogo: string;
    OrgShortLogo: string;
    OrgName: string;
    OrgPhoneNo: string;
    OrgEmail: string;
    OrgFax: string;
    OrgLocationurl: string;
    DefaultLocationId: number;
    DefaultAppointmentTypeId: number;
    DefaultAppointmentTypeName: string;
    DefaultLocationName: string;
    constructor() {
        this.OrgName = '';
        this.OrgShortLogo = '';
        this.OrgPhoneNo = '';
        this.OrgEmail = '';
        this.OrgEmail = '';
        this.OrgLocationurl = '';
        this.DefaultLocationId = 0;
        this.DefaultAppointmentTypeId = 0;
        this.DefaultAppointmentTypeName = '';
        this.DefaultLocationName = '';
    }
}

export class SliderModel {
    Name: string;
    Image: string;
    Description: string;
    OrderNo: number;
    Id: string;
    IsActive: boolean;
    constructor() {
        this.Name = '';
        this.Image = '';
        this.Description = '';
        this.OrderNo = 0;
        this.Id = '';
        this.IsActive = true;
    }
}