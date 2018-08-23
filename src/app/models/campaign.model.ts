export class CampaignModel {
    Id: number;
    Guid: string;
    Name: string;
    Description: string;
    CampaignDate: any;
    Location:string;
    IsActive: boolean;
    CreatedOn: string;
    CreatedBy: number;
    ModifiedBy: number;
    ModifiedOn: string;
    TemplateUrl: string;
    choosefile: any;
   
    // campaignedittime:any;
}
export class CampaignTime{
    campaigntime:any;
}
export class CampaignattendyModel {
    Id: number;
    CampaignId: number;
    Gender: string;
   FirstName: string;
   LastName: string;
    Email: string;
    DOB: any;
    Message: string;
    ContactNumber: string;
    IsActive: boolean;
    CreatedOn: string;
    CreatedBy: string;
    ModifiedBy: number;
    ModifiedOn: string;
    TemplateUrl: string;
    AgeRange: string;
}
