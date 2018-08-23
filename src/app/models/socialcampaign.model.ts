export class SocialCampaignModel {
  bidnumber: number;
  endtime: string;
  status: string;
  page: string;
  // isUrl: string;
  check: string;
  Id: number;
  CampaignId: number;
  CampaignName: string;
  BuyingType: boolean;
  CampaignObjective: string;
  ObjectiveId: number;
  AdSetName: string;
  AdName: string;
  CreatedDate: Date;
  CreatedBy: number;
  ModifiedBy: number;
  ModifiedDate: Date;
  IsActive: Boolean;
  budget: string;
  Budget: string;
  optimizationgoal: string;
  event: string;
  constructor() {
    this.event = '';
    this.budget = '';
    this.Budget = '';
    this.Id = 0;
    this.CampaignId = 0;
    this.CampaignName = '';
    this.BuyingType = false;
    this.CampaignObjective = '';
    this.ObjectiveId = null;
    this.AdSetName = null;
    this.AdName = '';
    this.CreatedDate = null;
    this.CreatedBy = null;
    this.ModifiedBy = null;
    this.ModifiedDate = null;
    this.IsActive = true;
    this.bidnumber = 0;
    this.endtime = null;
    this.status = null;
    this.page = null;
    // this.isUrl = null;
    this.check = null;
  }
}
