import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { INgxMyDpOptions, NgxMyDatePickerDirective, IMyDateModel, IMyInputFieldChanged, IMyDate } from 'ngx-mydatepicker';
import { DateFormat } from '../../../shared/services/dateFormat';
import { dateModel } from '../../../models/campaigndate.model';
// import { AppointmentHistoryModel } from '../../../models/AppointmentHistory.model';
import { DatePipe } from '@angular/common';
import { SlotConfigurationService } from '../provider-slot-details/slot-configuration.service ';
import { LeadDataService } from './lead-data.service';
import { ToastsManager, Toast } from 'ng2-toastr';
import { leadDataModel } from '../../../models/leaddata.model';
import { LeadDataPipe } from './leaddataPipe';
import { checkAndUpdatePureExpressionInline } from '@angular/core/src/view/pure_expression';
import { MaskedDate } from '../../../shared/services/datemask';

@Component({
  selector: 'app-lead-data',
  templateUrl: './lead-data.component.html',
  styleUrls: ['./lead-data.component.scss'],
  providers: [DatePipe, LeadDataService, SlotConfigurationService]
})
export class LeadDataComponent implements OnInit {
  @ViewChild('CampaignDate') ngxdp: NgxMyDatePickerDirective;
  @ViewChild('editDate') editdate: NgxMyDatePickerDirective;
  @ViewChild('template') choosefile: any;
  @ViewChild('Fromdate') fmdt: NgxMyDatePickerDirective;
  @ViewChild('Todate') todt: NgxMyDatePickerDirective;
  datefilter = {'ProviderId': 0 , 'FromDate': '', 'ToDate': '', 'Status': ''};
  dateFormatPipeFilter: DateFormat;
  userFilter: string;
  firstDay: Date;
  lastDay: Date;
  status: string;
  ApptHistoryForm: any;
  date: Date = new Date();
  camenterdatests1: boolean;
  camvaliddate1: boolean;
  validdate: boolean;
  dateMask = MaskedDate;
  selectedDate: any;
  cmptsts: boolean;
  selectfrom: boolean;
  providerslist : any =[];
  frmdatests: boolean;
  success: boolean;
  todatests: boolean;
  enterdatests1: boolean;
  enterdatests: boolean;
  selectedDate1: any;
  firstdayofmonth: any;
  providerData: any = [];
  lastdayofmonth: any;
  validdate1: boolean;
//   schModel: GetDateModel;
schModel = {'FromDate': '', 'ToDate': '' , 'ProviderName': ''};
datemodel: dateModel;
  postdateformat: 'MM/dd/yyyy';
  leadDataModel: leadDataModel;
  campaigndate: INgxMyDpOptions = {
    // other options...
    dateFormat: 'mm/dd/yyyy',
    disableWeekends: true,
    firstDayOfWeek: 'mo',
    markCurrentDay: true,
    disableHeaderButtons: true,
    disableUntil: { year: this.date.getFullYear(), month: this.date.getMonth() + 1, day: this.date.getDate() - 1 },
};
fromdate: INgxMyDpOptions = {
    // other options...
    dateFormat: 'mm/dd/yyyy',
    disableWeekends: true,
    firstDayOfWeek: 'mo',
    markCurrentDay: true,
    disableHeaderButtons: true,
  //  disableUntil: { year: this.date.getFullYear(), month: this.date.getMonth() + 1, day: this.date.getDate() - 1 },
   //  disableSince: { year: this.date.getFullYear(), month: this.date.getMonth() + 1, day: this.date.getDate() + 30 },
    selectorHeight: '232px',
    selectorWidth: '250px'

};
todate: INgxMyDpOptions = {
    // other options...
};

  constructor(public datepipe: DatePipe,
    private slotConfigurationService: SlotConfigurationService, public toastr: ToastsManager
    , vcr: ViewContainerRef, private _appointmenthistoryService: LeadDataService) {
    this.enterdatests1 = false;
    this.leadDataModel = new leadDataModel;
    this.validdate1 = false;
    this.enterdatests = false;
    this.toastr.setRootViewContainerRef(vcr);
    this.datemodel=new dateModel();
    this.dateFormatPipeFilter = new DateFormat();
    let currentDate = new Date();
    var monthName = '';
    this.status = '';
monthName = this._appointmenthistoryService.getMonthname(currentDate);
//  let curdate: any;
//  curdate = currentDate.getDate()+ '/' + monthName + '/'  + currentDate.getFullYear();
     var date = new Date();
this. firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
// this.firstDay= 1+"/"+monthName+"/"+currentDate.getFullYear();
this. lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);
this.firstdayofmonth = (monthName)+"/"+(this.firstDay.getDate())+"/"+this.firstDay.getFullYear(); 
this.lastdayofmonth = (this.lastDay.getMonth() + 1) + '/'+(this.lastDay.getDate()) + '/' +this.lastDay.getFullYear();
// console.log(this.firstdayofmonth + ',' + this.lastdayofmonth);
// this.schModel.FromDate = this.datepipe.transform(this.firstdayofmonth, this.postdateformat);
// this.schModel.ToDate = this.datepipe.transform(this.lastdayofmonth , this.postdateformat);
this.schModel.FromDate = this.datepipe.transform(this.firstdayofmonth, 'MM/dd/yyyy');
 this.schModel.ToDate = this.datepipe.transform(this.lastdayofmonth , 'MM/dd/yyyy');
this.datefilter.FromDate = this.datepipe.transform(this.firstdayofmonth, 'dd/MMM/yyyy');
this.datefilter.ToDate = this.datepipe.transform(this.lastdayofmonth, 'dd/MMM/yyyy');
// this.datemodel.FromDate = this.schModel.FromDate ;
// this.datemodel.ToDate = this.schModel.ToDate;
this.datefilter.Status = 'Lead';
// console.log(this.datefilter);
// console.log(this.schModel);
// this.todate = {
//     dateFormat: 'mm/dd/yyyy',
//     //  disableUntil: { year: new Date().getFullYear(), month: new Date().getMonth() + 1, day: new Date().getDate() - 1 },
//     //  disableSince: { year: this.date.getFullYear(), month: this.date.getMonth() + 1, day: this.date.getDate() + 30 },
//       disableWeekends: true,
//       firstDayOfWeek: 'mo',
//       markCurrentDay: true,
//       disableHeaderButtons: true,
//       selectorHeight: '232px',
//       selectorWidth: '250px'
//   };
  }

  ngOnInit() {
     this.GetProvidersList();
     this.GetAppointmentList();
  }
  onInputFieldDobChanged(event: IMyInputFieldChanged) {
    this.enterdatests = false;
   this.validdate = false;
if (event.value.length >= 1) {
   //   this.convertDateFormate(event.value);
   this.enterdatests = true;
}
  //  console.log('IMyInputFieldChanged' + JSON.stringify(event.value) + ',' + event.value.length + ',' + event.valid);
    if (event.value.length === 10) {
        this.validdate = event.valid;
        // this.validdatecheck = true;
        // this.validdate=true;
      //  console.log(this.validdate);
        const selectedDate = new Date(event.value.toString());
    //    console.log(selectedDate);
        const mydate: IMyDate = {
            year: selectedDate.getFullYear(),
            month: selectedDate.getMonth(),
            day: selectedDate.getDay()
        };
        const dobmodal: IMyDateModel = {
            date: mydate,
            jsdate: selectedDate,
            formatted: event.value.toString(),
            epoc: 1
        };
        // alert(event.value);
     //   console.log('dobmodal' + JSON.stringify(dobmodal));
        if (this.validdate) {
            this.enterdatests = false;
            this.selectfrom=false;
            this.onDateChanged(dobmodal);
          //  this.todate.disableUntil = { year: selectedDate.getFullYear(), month: selectedDate.getMonth(), day: selectedDate.getDate() + 1 };
          //  this.todate.disableSince = { year: selectedDate.getFullYear() + 5, month: selectedDate.getMonth() + 1, day: selectedDate.getDate() };
            this.todate = {
                dateFormat: 'mm/dd/yyyy',
                disableUntil: { year: selectedDate.getFullYear(), month: selectedDate.getMonth() + 1, day: selectedDate.getDate() },
                disableSince: { year: selectedDate.getFullYear() + 5, month: selectedDate.getMonth() + 1, day: selectedDate.getDate() },
                disableWeekends: true,
                firstDayOfWeek: 'mo',
                markCurrentDay: true,
                disableHeaderButtons: true,
                selectorHeight: '232px',
                selectorWidth: '250px'
              };
        } else {
            this.error('Please click on calender icon and select FromDate.');
            this.fmdt.clearDate();
        }
    }

}
// statuschange() {
//  if (this.datefilter.Status === 'Booked'){
// this.status = 'Booked';
//  }
//  else {
//     this.status = 'Cancelled';
//  }
// }
onInputFieldDobChanged1(event: IMyInputFieldChanged) {
    this.enterdatests1 = false;
    this.validdate1 = false;
    if (event.value.length >= 1) {
        //   this.convertDateFormate(event.value);
        this.enterdatests1 = true;
    }
  //  console.log('IMyInputFieldChanged1' + JSON.stringify(event.value) + ',' + event.value.length + ',' + event.valid);
    if (event.value.length === 10) {
        this.validdate1 = event.valid;
    //    console.log(this.validdate1);
        const selectedDate1 = new Date(event.value.toString());
        const mydate: IMyDate = {
            year: selectedDate1.getFullYear(),
            month: selectedDate1.getMonth(),
            day: selectedDate1.getDay()
        };
        const dobmodal: IMyDateModel = {
            date: mydate,
            jsdate: selectedDate1,
            formatted: event.value.toString(),
            epoc: 1
        };
     //   console.log('dobmodal' + JSON.stringify(dobmodal));
        if (this.validdate1) {
            this.enterdatests = false;
            this.onDateChanged1(dobmodal);
           // this.fromdate.disableSince= { year: selectedDate1.getFullYear(),
               //  month: selectedDate1.getMonth(), day: selectedDate1.getDate() + 1 }
            this.todate={
                  dateFormat: 'mm/dd/yyyy',
                //  disableUntil: { year: new Date().getFullYear(), month: new Date().getMonth() + 1, day: new Date().getDate() - 1 },
             // disableSince : { year: selectedDate1.getFullYear(), month: selectedDate1.getMonth() , day: selectedDate1.getDate() + 1 },
                  disableWeekends: true,
                  firstDayOfWeek: 'mo',
                  markCurrentDay: true,
                  disableHeaderButtons: true,
                  selectorHeight: '232px',
                  selectorWidth: '250px'
              }
        } else {
            this.error('Please click on calender icon and select ToDate.');
            this.todt.clearDate();
        }
    }

}
oncampaignInputFieldDobChanged(event: IMyInputFieldChanged){
    this.camenterdatests1 = false;
    this.camvaliddate1 = false;
    if (event.value.length >= 1) {
        //   this.convertDateFormate(event.value);
        this.camenterdatests1 = true;
    }
  //  console.log('IMyInputFieldChanged1' + JSON.stringify(event.value) + ',' + event.value.length + ',' + event.valid);
    if (event.value.length === 10) {
        this.camvaliddate1 = event.valid;
     //   console.log(this.camvaliddate1);
        const selectedDate1 = new Date(event.value.toString());
        const mydate: IMyDate = {
            year: selectedDate1.getFullYear(),
            month: selectedDate1.getMonth(),
            day: selectedDate1.getDay()
        };
        const dobmodal: IMyDateModel = {
            date: mydate,
            jsdate: selectedDate1,
            formatted: event.value.toString(),
            epoc: 1
        };
    //    console.log('dobmodal' + JSON.stringify(dobmodal));
        if (this.camvaliddate1) {
            this.camenterdatests1 = false;
            this.onDateChanged1(dobmodal);
        }else {
            this.error('Please click on calender icon and select Date.');
            this.ngxdp.clearDate();
        }
    }
}
onFromDateChanged(event: IMyDateModel): void {
    if(this.selectfrom==true){
    const selectedDate = new Date(event.formatted);
 //   console.log(selectedDate);
  //  this.todate.disableUntil = { year: selectedDate.getFullYear(), month: selectedDate.getMonth(), day: selectedDate.getDate() + 1 };
 //   this.todate.disableSince = { year: selectedDate.getFullYear() + 5, month: selectedDate.getMonth() + 1, day: selectedDate.getDate() };
    this.todate = {
        dateFormat: 'mm/dd/yyyy',
     //   disableUntil: { year: selectedDate.getFullYear(), month: selectedDate.getMonth() + 1, day: selectedDate.getDate() },
     //   disableSince: { year: selectedDate.getFullYear() + 5, month: selectedDate.getMonth() + 1, day: selectedDate.getDate() },
        disableWeekends: true,
        firstDayOfWeek: 'mo',
        markCurrentDay: true,
        disableHeaderButtons: true,
        selectorHeight: '232px',
        selectorWidth: '250px'
      };
    }
    let startdate: any;
    startdate = event.formatted;
    this.schModel.FromDate = this.datepipe.transform(startdate, 'MM/dd/yyyy');
    this.datefilter.FromDate=this.datepipe.transform(startdate, 'dd/MMM/yyyy');
    this.frmdatests=true;
    this.selectfrom=true;
}
onToDateChanged(event: IMyDateModel): void {
    let todate: any;
    todate = event.formatted;
   this.schModel.ToDate = this.datepipe.transform(todate, 'MM/dd/yyyy');
   this.datefilter.ToDate= this.datepipe.transform(todate, 'dd/MMM/yyyy');
    // this.todateDisplay = this.dateFormatPipeFilter.transform(this.schModel.ToDate);
    this.todatests=true;
}
onDateChanged(event: IMyDateModel): void {
    this.enterdatests = false;
    // console.log('dddddddddd' + event.formatted);
    this.selectedDate = event.formatted;
  //  console.log('dddddddddd' + this.selectedDate);
    this.frmdatests=true;
    this.todatests=true;
}
onDateChanged1(event: IMyDateModel): void {
    // this.verifydts.todate=event.date.day;
    // this.verifydts.tomonth=event.date.month;
    // this.verifydts.toyear=event.date.year;
    // alert(JSON.stringify(this.verifydts));
   // this.enterdatests = false;
    // console.log('dddddddddd' + event.formatted);
    this.selectedDate1 = event.formatted;
 //   console.log('dddddddddd' + this.selectedDate1);
    this.frmdatests=true;
    this.todatests=true;
}
  GetAppointmentList() {
   // this.disableButton = false;
  // console.log(this.datefilter);
   // this.statuschange();
   if (this.datefilter.FromDate !== '' && this.datefilter.ToDate !== '') {
        return this._appointmenthistoryService.LeaddataPost(this.datefilter).subscribe(
            res => {
                // console.log('provider information' + (JSON.stringify(this.providerData = res.data)
                // ));
                this.providerData = res.data;
            }
        );
    }
}
GetProvidersList() {
    return this._appointmenthistoryService.GetProvidersList().subscribe(
        res => {
this.providerslist = res.data;
 // console.log(this.providerslist);
         });
}
    setproviderid() {
        // alert(this.schModel.ProviderName);
        if(this.schModel.ProviderName ==='' || this.schModel.ProviderName==null){
            this.datefilter.ProviderId=0;
        }else {
 for (let i = 0; i <= this.providerslist.length - 1; i++) {
if (this.schModel.ProviderName === this.providerslist[i].ProviderName) {
    this.datefilter.ProviderId = this.providerslist[i].ProviderId;
    
}
 }
}
    }
PostAppthistorydata() {
    if (this.ApptHistoryForm.dirty && this.ApptHistoryForm.valid )  {
       // alert(JSON.stringify(this.model));
        this._appointmenthistoryService.LeaddataPost(this.leadDataModel).subscribe(
            res => {
                // this.disableButton = true;
                // console.log((JSON.stringify(this.message = res)));
                // this conditions are used for hiding and unhiding forms
                if (res.Success === true) {
                    // this.success = true;
                    this.Success('Profile added successfully', 'add');
                    // this.getStaffInfo();
                } else {
                    //    this.errmsg = true;
                    //    setTimeout(() => {
                    //        this.message = '';
                    //        console.log(this.message);
                    //        this.errmsg = false;
                    //    }, 7000);
                    // this.Error(res.data, 'add');
                }
            });
        // <-----after submit the form ,then form will clear the data ------>
        // this.model.StaffName = '',
        // this.model.Email = '',
        // this.model.DesignationId = '',
        // this.model.PhoneNo = null,
        // this.model.AltPhoneNo = null;
    }
}


Success (successmsg, type) {
  this.toastr.success(successmsg, null, {
      dismiss: 'controlled', showCloseButton: true,
      positionClass: 'toast-bottom-right', newestOnTop: true, progressBar: false,
      showEasing: 'swing', closeButton: false, 'preventDuplicates': false,
      'debug': false, 'hideEasing': 'linear',
      'showMethod': 'fadeIn',
      'hideMethod': 'fadeOut'
  }).then((toast: Toast) => {
      setTimeout(() => {
          this.toastr.dismissToast(toast);
          // if (type === 'add') {
          //     jQuery('#addStaff').modal('hide');
          // }
          // if (type === 'update') {
          //     jQuery('#myModalstaff').modal('hide');
          // }
      // this.addstaff.hide();
      // this.editstaff.hide();
          this.GetProvidersList().add(() => {
            this.leadDataModel = new leadDataModel;
          });
        //  this.disableButton = true;
      }, 2000);
  });
}

 error(errormsg) {
  this.toastr.error(errormsg, null, {
      dismiss: 'controlled', showCloseButton: true,
      positionClass: 'toast-bottom-right', newestOnTop: true, progressBar: false,
      showEasing: 'swing', closeButton: false, 'preventDuplicates': false,
      'debug': false, 'hideEasing': 'linear',
      'showMethod': 'fadeIn',
      'hideMethod': 'fadeOut'
  }).then((toast: Toast) => {
      setTimeout(() => {
         // this.Toastr.dismissToast(toast);
          // this.getcampaigndata().add(() => {
          // });
      }, 3000);
  });
}
    
}

