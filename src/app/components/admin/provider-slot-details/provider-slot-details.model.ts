export class TimingModel {
  MorningFromTime: string;
  MorningToTime: string;
  AfternooonFromTime: string;
  AfternoonToTime: string;
  EveningFromTime: string;
  EveningToTime: string;
  constructor() {
    this.MorningFromTime = "";
    this.MorningToTime = "";
    this.AfternooonFromTime = "";
    this.AfternoonToTime = "";
    this.EveningFromTime = "";
    this.EveningToTime = "";
  }
}

export class PostModel {
  TimingModel: Array<Object>;
  WorkWeeks: "";
  AppointmentTypes: Array<object>;
}
export class TimeModel {
  morningfrmhour: string;
  morningfrmmin: string;
  morningtohour: string;
  morningtomin: string;
  aftfrmhour: string;
  aftfrmmin: string;
  afttohour: string;
  afttomin: string;
  Evngfrmhr: string;
  Evngfrmmin: string;
  evngtohr: string;
  evengtomin: string;
  constructor() {
    this.morningfrmhour = "";
    this.morningfrmmin = "";
    this.morningtohour = "";
    this.morningtomin = "";
    this.aftfrmhour = "";
    this.aftfrmmin = "";
    this.afttohour = "";
    this.afttomin = "";
    this.Evngfrmhr = "";
    this.Evngfrmmin = "";
    this.evngtohr = "";
    this.evengtomin = "";
  }
}
export class GetSlotTiming{
  Id: number;
  ProviderId: number;
  SlotDuration = "";
  ProviderName:string;
  ProviderType:string;
  AppointmentsLimitPerSlot: number;
  MorningFromTime = "";
  MorningToTime = "";
  AfternoonFromTime = "";
  AfternoonToTime = "";
  EveningFromTime = "";
  EveningToTime = "";
  IsActive: boolean;
  Date = new Date();
  UserName: string;
  ConfigTypeId = "";
  ConfigType = ""; 
  MorningFromTimeFormatted :{'hour':"",'minute':""};
  MorningToTimeFormatted:{'hour':"",'minute':""};
  AfternoonFromTimeFormatted :{'hour':"",'minute':""} ;
  AfternoonToTimeFormatted:{'hour':"",'minute':""}; 
  EveningFromTimeFormatted :{'hour':"",'minute':""} ;
  EveningToTimeFormatted:{'hour':"",'minute':""}; 
  Workingdays: string;
  AppointmentTypeIds: string;
  LocationId: string;
  DisableSlots: boolean;
  EndInDays: number;
  ProviderAppoitmentTypesDuration: Array<Providertypes>;
  constructor() {
    this.Id = 0;
    this.ProviderId = 0;
    this.SlotDuration = null;
    this.AppointmentsLimitPerSlot = 1;
    this.MorningFromTime = "";
    this.MorningToTime = "";
    this.AfternoonFromTime = "";
    this.AfternoonToTime = "";
    this.EveningFromTime = "";
    this.EveningToTime = "";
    this.IsActive = true;
    // this.Date = new Date();
    this.UserName = "";
    this.ConfigTypeId = "";
    this.ConfigType = "";
    this.MorningFromTimeFormatted={'hour':"",'minute':""};
    this.MorningToTimeFormatted={'hour':"",'minute':""};
    this.AfternoonFromTimeFormatted={'hour':"",'minute':""};
    this.AfternoonToTimeFormatted={'hour':"",'minute':""};
    this.EveningFromTimeFormatted={'hour':"",'minute':""};
    this.EveningToTimeFormatted={'hour':"",'minute':""};
    this.Workingdays = "";
    this.AppointmentTypeIds = "";
    this.LocationId = "";
    this.DisableSlots = false;
    this.EndInDays = 0;
}
}

export class AppointmenttypeModel {
  Id: number;
  AppointmentType: string;
  Duration: number;
  Instructions: string;
  IsActive: boolean;
  CreatedOn: string;
  CreatedBy: number;
  ModifiedBy: number;
  ModifiedOn: string;
  TenantId: number;
}

export class Providertypes {
  AppointmentTypeId: number;
  Duration: number;
  Instructions: string;
}
