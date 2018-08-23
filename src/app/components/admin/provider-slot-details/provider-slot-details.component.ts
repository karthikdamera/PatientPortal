import { Component, OnInit, ViewContainerRef } from '@angular/core';
import {
  TimingModel,
  TimeModel,
  GetSlotTiming , AppointmenttypeModel
} from './provider-slot-details.model';
import { AppointmentTypeService } from '../appointment-settings/appointment-settings.service';
import { SlotConfigurationService } from './slot-configuration.service ';
import { SlotConfigurationModel } from '../../../models/slot-configuration.model';
import { ToastService } from '../../../shared/services/toastService';
import { ToastsManager } from 'ng2-toastr';
declare var jQuery: any;
import { DatePipe, AsyncPipe } from '@angular/common';
@Component({
  moduleId: module.id,
  selector: 'app-provider-slot-details',
  templateUrl: 'provider-slot-details.component.html',
  styleUrls: ['provider-slot-details.component.scss'],
  providers: [AppointmentTypeService, SlotConfigurationService, ToastService, DatePipe]
})
export class ProviderSlotDetailsComponent implements OnInit {
  appointmenttypeinfo = [];
  activeappointments = [];
  workweek = [];
  daypost = [];
  tabledata = [];
  page: number = 1;
  aptid: number;
  appointmentmodel: AppointmenttypeModel;
  timingModel: TimingModel;
  timemodel: TimeModel;
  getSlotTiming: GetSlotTiming;
  getappointment: any;
  select: any;
  endindays: boolean;
  editData: any = {};
  morningfromtime = {'hour': '', 'minute': ''};
  morningtotime = {'hour': '', 'minute': ''};
  afternoonfromtime = {'hour': '', 'minute': ''};
  afternoontotime = {'hour': '', 'minute': ''};
  evngfrmtime = {'hour': '',  'minute': ''};
  evngtotime = {'hour': '', 'minute': ''};
  Endindays: number;
  duration: boolean;
  workdays = [];
  appointmenttypes = [];
  location: string;
  mrngfrmerrormsg: boolean;
  mrngtoerrormsg: boolean;
  aftnfrmerrormsg: boolean;
  aftntoerrormsg: boolean;
  evngfrmerrormsg: boolean;
  arraypushdata = [];
  evngtoerrormsg: boolean;
  postModel: SlotConfigurationModel;
  LocationId: string;
  selecteddata: string;
  displaydata: any;
  validatedata = [];
  last: any;
  Times = [];
  disableadd: boolean;
  arraydata = [];
  Timehour = [];
  minutehr = [];
  adminlogindata: any;
  Locations = [];
  splitdata: string;
  storage: any = {};
  post: string;

  constructor(
    private _Appointmenttypeservice: AppointmentTypeService,
    private slotConfigurationService: SlotConfigurationService,private _toast: ToastService, public toastr: ToastsManager,
    vcr: ViewContainerRef, private datepipe: DatePipe
  ) {
    this.toastr.setRootViewContainerRef(vcr);
    this.Times = [{ hours: [], minutes: [] }];
    this.workweek = [
      { weekname: 'Monday', ISselected: false },
      { weekname: 'Tuesday', ISselected: false },
      { weekname: 'Wednesday', ISselected: false },
      { weekname: 'Thursday', ISselected: false },
      { weekname: 'Friday', ISselected: false },
      { weekname: 'Saturday', ISselected: false },
      { weekname: 'Sunday', ISselected: false }
    ];
    this.timingModel = new TimingModel();
    this.timemodel = new TimeModel();
    this.postModel = new SlotConfigurationModel();
    this.getSlotTiming = new GetSlotTiming();
    this.Endindays = 0;
    this.disableadd = true;
    // this.duration = true;
    // for (let i = 1; i <= 24; i++) {
    //   // this.Times[0].hours.push(i);
    //   if (i < 10) {
    //     this.Timehour.push('0' + i);
    //   } else {
    //     this.Timehour.push(i);
    //   }
    // }
    // console.log(this.Timehour);
    // for (let j = 0; j < 60; j++) {
    //   // this.Times[0].minutes.push(j);
    //   if (j < 10) {
    //     this.minutehr.push('0' + j);
    //   } else {
    //     this.minutehr.push(j);
    //   }
    // }
    // console.log(this.Times);
  }

  ngOnInit() {
    this.storage = JSON.parse(localStorage.getItem('providerData'));
    this.adminlogindata = JSON.parse(localStorage.getItem('loginData'));
    localStorage.setItem('provider', 'providers');
    this.Getlocation();
    this.Getappointmenttype();
  }
  Getappointmenttype() {
    return this._Appointmenttypeservice.getappointment().subscribe(res => {
      this.appointmenttypeinfo = res.data;
      for (let i = 0; i <= this.appointmenttypeinfo.length - 1; i++) {
        this.activeappointments.push(this.appointmenttypeinfo[i]);
      }
   //   console.log(this.activeappointments);
      this.getProviderConfigs();
    });

  }
  getProviderConfigs() {
  //  console.log(this.storage.ProviderId);
    return this.slotConfigurationService
      .getProviderConfigs(this.storage.ProviderId)
      .subscribe(Data => {
        // this.senderrsts = false;
        this.editData = Data.data;
        // console.log('get Providers  Data' + (JSON.stringify(this.editData)));
        this.getSlotTiming = Data.data[0];
      //  console.log(JSON.stringify(this.getSlotTiming));
        this.morningfromtime = this.getSlotTiming.MorningFromTimeFormatted;
        this.morningtotime = this.getSlotTiming.MorningToTimeFormatted;
        this.afternoonfromtime = this.getSlotTiming.AfternoonFromTimeFormatted;
        this.afternoontotime = this.getSlotTiming.AfternoonToTimeFormatted;
        this.evngfrmtime = this.getSlotTiming.EveningFromTimeFormatted;
        this.evngtotime = this.getSlotTiming.EveningToTimeFormatted;
        let splitdays = this.getSlotTiming.Workingdays;
     // this.post=this.getSlotTiming.Workingdays;
        let appointmenttype = this.getSlotTiming.AppointmentTypeIds;
this.appointmenttypes = appointmenttype.split(',');

        // console.log(splitdays);
        if (splitdays != undefined) {
          this.workdays = splitdays.split(',');
          this.daypost = splitdays.split(',');
        }
        // Binding for weeks
        for (let i = 0; i <= this.workweek.length - 1; i++) {
          for (let j = 0; j <= this.workdays.length - 1; j++) {
            if (this.workweek[i].weekname === this.workdays[j]) {
              this.workweek[i].ISselected = true;
            }
          }
        }
        // Binding For Location
        for (let i = 0; i <= this.Locations.length - 1; i++) {
          if (this.Locations[i].Id == this.getSlotTiming.LocationId) {
            this.location = this.Locations[i].LocationName;
            this.LocationId = this.Locations[i].Id;
          }
        }
      //  this.tabledata = this.activeappointments;
// BInding For Appointmenttypes
        for (let i = 0; i <= this.activeappointments.length - 1; i++) {
          for (let j = 0; j <= this.appointmenttypes.length - 1; j++) {
          //  console.log(this.appointmenttypes[j] + ',' + this.activeappointments[i].Id);
            if (this.activeappointments[i].Id == this.appointmenttypes[j]) {
            //  alert(this.activeappointments[i].Id + '' + this.appointmenttypes[j]);
            // this.arraypushdata.push({AppointmentTypeId: this.getSlotTiming.ProviderAppoitmentTypesDuration[j].AppointmentTypeId,
            // AppointmentTypeName: this.activeappointments[i].AppointmentType,
            //   Duration: this.getSlotTiming.ProviderAppoitmentTypesDuration[j].Duration,
            //    Instructions: this.getSlotTiming.ProviderAppoitmentTypesDuration[j].Instructions });
            this.activeappointments.splice(i, 1);
            }
          }
        }
        this.tabledata = this.getSlotTiming.ProviderAppoitmentTypesDuration;
      //  this.tabledata = this.arraypushdata;
       // this.tabledata = this.getSlotTiming.ProviderAppoitmentTypesDuration;
        console.log(JSON.stringify(this.tabledata));
       this.postModel.DisableSlots = this.getSlotTiming.DisableSlots;
       this.Endindays = this.getSlotTiming.EndInDays;
      });
  }
  Getlocation() {
    return this.slotConfigurationService.getLocations().subscribe(res => {
      this.Locations = res.data;
    });
  }
  selecteddays(event, data, index) {
    if (event) {
      this.daypost.push(data);
    //  console.log(this.daypost);
    } else {
   //   console.log(this.daypost);
      for (let j = 0; j < this.daypost.length; j++) {
        if (this.daypost[j] === data) {
        //  alert(data);
          this.daypost.splice(j, 1);
        }
      }
      console.log(this.daypost);
    }
  }
  Selectappointmenttype(selectdata) {
  //  this.select = 'fdf';
 // alert(JSON.stringify(selectdata));
    this.selecteddata = selectdata;
    for (let i = 0; i < this.activeappointments.length - 1; i++) {
      // alert(this.activeappointments[i].AppointmentType + ',' + selectdata);
      if (this.activeappointments[i].Id === selectdata) {
        this.displaydata = this.activeappointments[i];
       // alert(this.activeappointments[i].AppointmentType);
        // this.validatedata = this.activeappointments[i];
      }
    }
    this.disableadd = false;
  // console.log(JSON.stringify(this.displaydata));
  }
  adddata() {
    console.log(JSON.stringify(this.displaydata));
    if (this.displaydata !== undefined) {

    this.tabledata.unshift({AppointmentTypeId: this.displaydata.Id, AppointmentType: this.displaydata.AppointmentType,
      Duration: this.displaydata.Duration,
         Instructions: this.displaydata.Instructions });
      // this.arraydata.push({AppointmentTypeId: this.displaydata.Id, Duration: this.displaydata.Duration,
      //    Instructions: this.displaydata.Instructions });
    //  console.log(JSON.stringify(this.arraydata));
      // this.validatedata.push(this.displaydata);
      this.displaydata = [];
    //  this.validatedata = [];
    }
    for (let i = 0; i < this.activeappointments.length - 1; i++) {
      if (this.activeappointments[i].Id == this.selecteddata) {
        this.activeappointments.splice(i, 1);
      }
    }
    this.disableadd = true;
  }
  deletedata(data, index) {
    this.select = '';
  //  console.log(data);
    this.tabledata.splice(index, 1);
    this.activeappointments.push({
      Id: data.Id,
      AppointmentType: data.AppointmentType,
      Duration: data.Duration,
      Instructions: data.Instructions,
      IsActive: data.IsActive
    });
    if (this.tabledata.length == 0) {
      this.displaydata = '';
    }
    this.disableadd = true;
  }
  save() {
   // alert(this.Endindays);
    if (this.daypost.length > 1 && this.location !== undefined && (this.Endindays !== 0 || this.Endindays !== null)) {
      if ((this.morningfromtime.hour < this.morningtotime.hour) ||
      (this.afternoonfromtime.hour < this.afternoontotime.hour) ||
      (this.evngfrmtime.hour < this.evngtotime.hour)
    ) {
      if (((this.morningtotime.hour <= this.afternoonfromtime.hour) &&
       (this.afternoonfromtime.hour != '00')) ||
      (this.afternoontotime.hour <= this.evngfrmtime.hour) && (this.evngfrmtime.hour != '00')
    ) {
      if (this.mrngfrmerrormsg != true && this.mrngtoerrormsg != true && this.aftnfrmerrormsg != true
      && this.aftntoerrormsg != true && this.evngfrmerrormsg != true && this.evngtoerrormsg != true && this.endindays != true ) {
    this.post = this.itemsToString(this.daypost);
    this.postModel.MorningFromTime = this.morningfromtime.hour + ':' + this.morningfromtime.minute;
    this.postModel.MorningToTime = this.morningtotime.hour + ':' + this.morningtotime.minute;
    this.postModel.AfternoonFromTime = this.afternoonfromtime.hour + ':' + this.afternoonfromtime.minute;
    this.postModel.AfternoonToTime = this.afternoontotime.hour + ':' + this.afternoontotime.minute;
    this.postModel.EveningFromTime = this.evngfrmtime.hour + ':' + this.evngfrmtime.minute;
    this.postModel.EveningToTime = this.evngtotime.hour + ':' + this.evngtotime.minute;
    this.postModel.AppointmentTypeIds = this.itemsToStringappointment(
      this.tabledata
    );
    this.postModel.LocationId = this.LocationId;
    this.postModel.ProviderId = this.storage.ProviderId;
    this.postModel.UserName = this.adminlogindata.FirstName;
    this.postModel.WorkingDays = this.post;
    this.postModel.EndInDays = this.Endindays;
    let date = new Date();
    this.postModel.Date =  this.datepipe.transform(date, 'dd/MMM/yyyy');
   // alert(this.postModel.Date);
    for (let i = 0; i <= this.tabledata.length - 1; i++) {
     this.arraydata.push({AppointmentTypeId: this.tabledata[i].AppointmentTypeId, Duration: this.tabledata[i].Duration,
         Instructions: this.tabledata[i].Instructions });
    }
    this.postModel.ProviderAppoitmentTypesDurations = this.arraydata;
 //   console.log(JSON.stringify(this.postModel));
   // console.log(JSON.stringify(this.tabledata));
    this.slotConfigurationService.slotConfigurationSave(this.postModel).subscribe(
      res => {
       if (res.Success == true) {
         this.Success('Provider slot settings updated successfully');
         this.arraydata = [];
       } else {
            this.error(res.data);
       }
      });
    }
    } else {
      this.error('Please check morining/afternnon/evening timings. Session times should not conflict with each other');
    }
  } else {
     this.error('To time should be greater than from time');
    }
    } else {
      this.error('Please fill all required fields');
    }
  }
  selectlocation(location) {
    //  var getlocation=this.Locations.filter(locat=>{locat.LocationName==location});
    for (let i = 0; i <= this.Locations.length - 1; i++) {
      if (this.Locations[i].LocationName === location) {
        this.LocationId = this.Locations[i].Id;
      }
    }
  }
  validatetime(time, type) {
   // alert(type + ',' + time);
    switch (type) {
      case 'mrngfrmhr':
      if ( ((time >= 0) || (time >= '00' )) && time <= 24) {
       // alert('if');
        this.mrngfrmerrormsg = false;
      } else {
       // alert('else');
        this.mrngfrmerrormsg = true;
      }
       break;
      case 'mrngfrmmin':
      if ( ((time >= 0) || (time >= '00' )) && time <= 59 ) {
        this.mrngfrmerrormsg = false;
      } else {
        this.mrngfrmerrormsg = true;
      }break;
      case 'mrngtohr':
      if ( ((time >= 0) || (time >= '00' )) && time <= 24  ) {
        this.mrngtoerrormsg = false;
      } else {
        this.mrngtoerrormsg = true;
      } break;
      case 'mrngtomin':
      if ( ((time >= 0) || (time >= '00' )) && time <= 59 ) {
        this.mrngtoerrormsg = false;
      } else {
        this.mrngtoerrormsg = true;
      }break;
      case 'aftnfrmhr':
      if ( ((time >= 0) || (time >= '00' )) && time <= 24  ) {
        this.aftnfrmerrormsg = false;
      } else {
        this.aftnfrmerrormsg = true;
      } break;
      case 'aftnfrmmin':
      if ( ((time >= 0) || (time >= '00' )) && time <= 59 ) {
        this.aftnfrmerrormsg = false;
      } else {
        this.aftnfrmerrormsg = true;
      }break;
      case 'aftntohr':
      if ( ((time >= 0) || (time >= '00' )) && time <= 24  ) {
        this.aftntoerrormsg = false;
      } else {
        this.aftntoerrormsg = true;
      } break;
      case 'aftntomin':
      if ( ((time >= 0) || (time >= '00' )) && time <= 59 ) {
        this.aftntoerrormsg = false;
      } else {
        this.aftntoerrormsg = true;
      }break;
      case 'evngfrmhr':
      if ( ((time >= 0) || (time >= '00' )) && time <= 24  ) {
        this.evngfrmerrormsg = false;
      } else {
        this.evngfrmerrormsg = true;
      } break;
      case 'evngfrmmin':
      if ( ((time >= 0) || (time >= '00' )) && time <= 59 ) {
        this.evngfrmerrormsg = false;
      } else {
        this.evngfrmerrormsg = true;
      } break;
      case 'evngtohr':
      if ( ((time >= 0) || (time >= '00' )) && time <= 24  ) {
        this.evngtoerrormsg = false;
      } else {
        this.evngtoerrormsg = true;
      } break;
      case 'evngtomin':
      if ( ((time >= 0) || (time >= '00' )) && time <= 59 ) {
        this.evngtoerrormsg = false;
      } else {
        this.evngtoerrormsg = true;
      } break;
      case 'Endindays':
      if ( ((time >= 1) || (time >= '01' )) && time <= 150 ) {
        this.endindays = false;
      } else {
        this.endindays = true;
      } break;
       case 'Duration':
      if ( ((time >= 5) || (time >= '05' )) && time <= 300 ) {
        this.duration = false;
      } else {
        this.duration = true;
      } break;
    }
  }
  public itemsToString(value: Array<any> = []): string {
    return value
      .map((item: any) => {
        return item;
      })
      .join(',');
  }
  public itemsToStringappointment(value: Array<any> = []): string {
    return value
      .map((item: any) => {
        return item.Id;
      })
      .join(',');
  }
  Success(successmsg) {
    this._toast.ShowAlert(successmsg, '', 'Success');
  }
  error(errormsg) {
    this._toast.ShowAlert(errormsg, '', 'Error');
}
editappointment(data) {
// console.log(JSON.stringify(data));
this.duration = false;
this.appointmentmodel = data;
this.aptid = data.AppointmentTypeId;
}
savedata(model) {
 // alert(this.duration);
  if (this.duration === false || this.duration === undefined) {
    this.aptid = 0;
  } else {
    this.duration = true;
  }

}
Cancel() {
  if (this.duration === false || this.duration === undefined) {
    this.aptid = 0;
  } else {
    this.duration = true;
  }
}
 checkslots(event) {
if (event.target.checked) {
  this.postModel.DisableSlots = true;
} else {
  this.postModel.DisableSlots = false;
}
 }
}
