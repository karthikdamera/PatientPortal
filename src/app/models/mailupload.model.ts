export class mailupload {
    EmailsName: string;
    TemplateUrl: string;
    UserName: string;
    CampaignId: number;
    constructor() {
        this.EmailsName = '';
        this.TemplateUrl = '';
        this.UserName = '';
        this.CampaignId = 0;
    }
}
export class Mailsetting {
    Id: number;
    TenantId: number;
    Host: string;
    Port: string;
    UserName: string;
    Password: string;
    EnableSsl: string;
    IsDefault: boolean;
    IsActive: boolean;
    CreatedBy: number;
    CreatedOn: string;
    ModifiedBy: number;
    ModifiedOn: string;
    EngineType: string;
    SparkKey: string;
    constructor() {
        this.Id = 0;
        this.TenantId = 0;
        this.Host = '';
        this.Port = '';
        this.UserName = '';
        this.Password = '';
        this.EnableSsl = '';
        this.IsDefault = false;
        this.IsActive = false;
        this.CreatedBy = 0;
        this.CreatedOn = '';
        this.ModifiedBy = 0;
        this.ModifiedOn  = '';
        this.EngineType = '';
        this.SparkKey = '';
    }
}
