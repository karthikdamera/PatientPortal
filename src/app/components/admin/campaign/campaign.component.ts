import { CampaignService } from './campaign.service';
import { CampaignModel, CampaignTime } from './../../../models/campaign.model';
import { Component, OnInit, ViewContainerRef, ViewChild } from '@angular/core';
import { ValidationComponent } from './../../../shared/validation/validation.component';
import { ValidationService } from './../../../shared/validation/validation.service';
import { AsyncValidatorFn, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Toast } from 'ng2-toastr/src/toast';
import { DatePipe, AsyncPipe } from '@angular/common';
import { INgxMyDpOptions, IMyDateModel, IMyInputFieldChanged, IMyDate } from 'ngx-mydatepicker';
import { NgxMyDatePickerDirective } from 'ngx-mydatepicker';
// import { App } from './../../../../environments/environment';
import { SchedulerService } from '../../person/scheduler/scheduler.service';
import { GetSlotsModel } from '../../../models/person-slot.model';
import { dateModel, GetDateModel, verifydates } from '../../../models/campaigndate.model';
import { DateFormat } from '../../../shared/services/dateFormat';
import { MaskedDate } from '../../../shared/services/datemask';
import { ModalDirective } from 'angular-bootstrap-md';
import { CampaignPipe } from './campaignPipe';
declare var jQuery: any;
@Component({
  moduleId: module.id,
  selector: 'app-campaign',
  templateUrl: './campaign.component.html',
  styleUrls: ['./campaign.component.scss'],
  providers: [DatePipe, CampaignService, SchedulerService]
})
export class CampaignComponent implements OnInit {
  sanitizer: any;
  base64: any;
  Template: string;
  camenterdatests1: boolean;
  camvaliddate1: boolean;
  @ViewChild('addcampaign') public addcampaign: ModalDirective;
  @ViewChild('editcampaign') public editcampaign: ModalDirective;
  @ViewChild('CampaignDate') ngxdp: NgxMyDatePickerDirective;
  @ViewChild('editDate') editdate: NgxMyDatePickerDirective;
  @ViewChild('template') choosefile: any;
  @ViewChild('Fromdate') fmdt: NgxMyDatePickerDirective;
  @ViewChild('Todate') todt: NgxMyDatePickerDirective;
  step1: boolean;
  step2: boolean;
  userFilter: string;
  dateMask = MaskedDate;
  filestatus: boolean;
  isCopied1: boolean;
  filename: string;
  isUrl: boolean;
  campaigntimhreerrormsg: boolean;
  campaigntimmineerrormsg: boolean;
  data: {email: ''};
  selectfrom: boolean;
  fromdate1: any;
  createdUrl: string;
  validdate: boolean;
  cmptsts: boolean;
firstdayofmonth: any;
 lastdayofmonth: any;
  campaignModel: CampaignModel;
  campaigntimemodel: CampaignTime;
  disableButton: boolean;
  campaigntime = {'hour' : '', 'minute': ''};
  campaignData = [];
  campaignForm: any;
  page: number;
  back: boolean;
  selectedDate1: any;
  enterdatests: boolean;
  date: Date = new Date();
  patientData: any;
  postDateFormat = 'dd/MMM/yyyy';
  selectedDate: any;
  campaignidarray = [];
  minutehr = [];
  first: boolean;
  validationtime: boolean;
  second: boolean;
  postid: any;
  verify: boolean;
  lastDay: Date;
  Timehour = [];
  datefilter = {'FromDate': '', 'ToDate': '', IsActive: 'true'};
  firstDay: Date;
  CampaignDate: string;
  enterdatests1: boolean;
  verifydts: verifydates;
  validdate1: boolean;
  postguid: any;
  postdate: any;
  campaignForm1: any;
  order: string ;
 reverse: boolean = false;
  posttime: any;
  schModel: GetDateModel;
  frmdatests: boolean;
  todatests: boolean;
  datemodel: dateModel;
  dateFormatPipeFilter: DateFormat;
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
  constructor(private _campaignService: CampaignService, private router: Router, private formBuilder: FormBuilder,
      public toastr: ToastsManager, vcr: ViewContainerRef, public datepipe: DatePipe, public _schedulerService: SchedulerService) {
      this.validdate = false;
      this.validdate1 = false;
      this.enterdatests = false;
      this.enterdatests1 = false;
      this.validationtime = false;
      this.selectfrom=true;
      this.campaignModel = new CampaignModel();
      this.campaigntimemodel=new CampaignTime();
      this.schModel=new GetDateModel();
      this.toastr.setRootViewContainerRef(vcr);
      this.patientData = JSON.parse(localStorage.getItem('loginData'));
      this.disableButton = false;
      this.isUrl = false;
      this.filename = '';
      this.isCopied1 = false;
      this.datemodel=new dateModel();
      this.page = 1;
      this.step1 = true;
      this.step2 = false;
      this.first = false;
      this.second = true;
      this.cmptsts = false;
      this.back = true;
      this.verify=false;
      this.frmdatests = false;
      this.todatests=false;
      this.schModel = new GetSlotsModel();
      this.verifydts=new verifydates();
      this.filestatus = true;
      this.dateFormatPipeFilter = new DateFormat();
      // this.base64 = this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpeg;base64,');
      // validations
      this.campaignForm = this.formBuilder.group({
          'Name': ['', Validators.required],
          'Description': ['', Validators.required],
          'CampaignDate': ['', Validators.required],
          'createdUrl': [''],
         'Location': ['', Validators.required],
         'campaigntimehr': ['', Validators.required],
        'campaigntimemin': ['', Validators.required]
      });
      this.campaignForm1 = this.formBuilder.group({
        'Name': ['', Validators.required],
        'Description': ['', Validators.required],
        'CampaignDate': ['', Validators.required],
        'createdUrl': [''],
       'Location': ['', Validators.required],
       'campaigntimehr': ['', Validators.required],
      'campaigntimemin': ['', Validators.required]
    });
    this.todate = {
      dateFormat: 'mm/dd/yyyy',
      //  disableUntil: { year: new Date().getFullYear(), month: new Date().getMonth() + 1, day: new Date().getDate() - 1 },
      //  disableSince: { year: this.date.getFullYear(), month: this.date.getMonth() + 1, day: this.date.getDate() + 30 },
        disableWeekends: true,
        firstDayOfWeek: 'mo',
        markCurrentDay: true,
        disableHeaderButtons: true,
        selectorHeight: '232px',
        selectorWidth: '250px'
    }
    
      let currentDate = new Date();
          var monthName = '';
      monthName = this._campaignService.getMonthname(currentDate);
      //  let curdate: any;
      //  curdate = currentDate.getDate()+ '/' + monthName + '/'  + currentDate.getFullYear();
           var date = new Date();
      this. firstDay = new Date(date.getFullYear(), date.getMonth(), 1);
  //this.firstDay= 1+"/"+monthName+"/"+currentDate.getFullYear();
      this. lastDay = new Date(date.getFullYear(), date.getMonth() + 1, 0);   
      this.firstdayofmonth =(monthName)+"/"+(this.firstDay.getDate())+"/"+this.firstDay.getFullYear(); 
      this.lastdayofmonth = (this.lastDay.getMonth() + 1) + '/'+(this.lastDay.getDate()) + '/' +this.lastDay.getFullYear();
      this.schModel.FromDate = this.datepipe.transform(this.firstdayofmonth, 'MM/dd/yyyy');
      this.schModel.ToDate = this.datepipe.transform(this.lastdayofmonth , 'MM/dd/yyyy');
      this.datefilter.FromDate=this.datepipe.transform(this.firstdayofmonth, 'dd/MMM/yyyy');
      this.datefilter.ToDate=this.datepipe.transform(this.lastdayofmonth, 'dd/MMM/yyyy');
      this.datemodel.FromDate= this.schModel.FromDate ;
      this.datemodel.ToDate= this.schModel.ToDate;
      this.datemodel.IsActive='true'; 
  //    console.log(this.datefilter);
   // this.datemodel={FromDate:this.firstdayofmonth,ToDate:this.lastdayofmonth,IsActive: 'true'};
  }
  // on page load get call
  ngOnInit() {
      this.getcampaigndata();
  }

  validatetime(time, type) {
     // alert(time)
    // alert(type + ',' + time);
     switch (type) {
       case 'campaignhr':
       if ( ((time >= 1) || (time >= '01' )) && time <= 24) {
        // alert('if');
         this.campaigntimhreerrormsg = false;
         this.validationtime = true;
       } else {
        // alert('else');
         this.campaigntimhreerrormsg = true;
         this.validationtime = false;
       }
        break;
        case 'campaignmin':
        if ( ((time >= 0) || (time >= '00' )) && time <= 59 ) {
            this.campaigntimhreerrormsg = false;
            this.validationtime = true;
          } else {
            this.campaigntimhreerrormsg = true;
            this.validationtime = false;
          }break;
    }
}
setOrder(value: string) {
    // if (this.order === value) {
      this.reverse = !this.reverse;
    // }
 //   console.log(this.orderPipe.transform(this.providerData, this.order));
    // this.providerData = this.orderPipe.transform(this.providerData, this.order);
    this.order = value;
  }
  changeListener($event): void {
  //    console.log($event);
      this.filestatus = false;
      this.readThis($event.target);
      // alert($event.target.value);
  }

  readThis(inputValue: any): void {
      const file: File = inputValue.files[0];
    //  console.log(file.name);
       this.filename = file.name;
      const myReader: FileReader = new FileReader();

      myReader.onloadend = (e) => {
       //   console.log(e);
          this.Template = myReader.result;
       //   console.log('file data' + JSON.stringify(this.Template));
          //   this.isImageExist ? this.file_srcs[0].slice(23, this.file_srcs[0].length) : '';
          this.cmptsts = true;
      };
      myReader.readAsDataURL(file);
  }
  onInputFieldDobChanged(event: IMyInputFieldChanged) {
      this.enterdatests = false;
     this.validdate = false;
if (event.value.length >= 1) {
     //   this.convertDateFormate(event.value);
     this.enterdatests = true;
 }
  //    console.log('IMyInputFieldChanged' + JSON.stringify(event.value) + ',' + event.value.length + ',' + event.valid);
      if (event.value.length === 10) {
          this.validdate = event.valid;
          // this.validdatecheck = true;
          // this.validdate=true;
       //   console.log(this.validdate);
          const selectedDate = new Date(event.value.toString());
        //  console.log(selectedDate);
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
      //    console.log('dobmodal' + JSON.stringify(dobmodal));
          if (this.validdate) {
              this.enterdatests = false;
              this.selectfrom=false;
              this.onDateChanged(dobmodal);
              this.todate.disableUntil = { year: selectedDate.getFullYear(), month: selectedDate.getMonth(), day: selectedDate.getDate() + 1 };
              this.todate.disableSince = { year: selectedDate.getFullYear() + 5, month: selectedDate.getMonth() + 1, day: selectedDate.getDate() };
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
  onInputFieldDobChanged1(event: IMyInputFieldChanged) {
      this.enterdatests1 = false;
      this.validdate1 = false;
      if (event.value.length >= 1) {
          //   this.convertDateFormate(event.value);
          this.enterdatests1 = true;
      }
   //   console.log('IMyInputFieldChanged1' + JSON.stringify(event.value) + ',' + event.value.length + ',' + event.valid);
      if (event.value.length === 10) {
          this.validdate1 = event.valid;
     //     console.log(this.validdate1);
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
     //     console.log('dobmodal' + JSON.stringify(dobmodal));
          if (this.validdate1) {
              this.enterdatests = false;
              this.onDateChanged1(dobmodal);
             // this.fromdate.disableSince= { year: selectedDate1.getFullYear(),
             // month: selectedDate1.getMonth(), day: selectedDate1.getDate() + 1 }
              this.todate={
                    dateFormat: 'mm/dd/yyyy',
                  //  disableUntil: { year: new Date().getFullYear(), month: new Date().getMonth() + 1, day: new Date().getDate() - 1 },
                  //  disableSince : { year: selectedDate1.getFullYear(),
                //   month: selectedDate1.getMonth() , day: selectedDate1.getDate() + 1 },
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
  //    console.log('IMyInputFieldChanged1' + JSON.stringify(event.value) + ',' + event.value.length + ',' + event.valid);
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
    //  console.log(selectedDate);
     // this.todate.disableUntil = { year: selectedDate.getFullYear(), month: selectedDate.getMonth(), day: selectedDate.getDate() + 1 };
     // this.todate.disableSince = { year: selectedDate.getFullYear() + 5,
     // month: selectedDate.getMonth() + 1, day: selectedDate.getDate() };
      this.todate = {
          dateFormat: 'mm/dd/yyyy',
        //  disableUntil: { year: selectedDate.getFullYear(), month: selectedDate.getMonth() + 1, day: selectedDate.getDate() },
        //  disableSince: { year: selectedDate.getFullYear() + 5, month: selectedDate.getMonth() + 1, day: selectedDate.getDate() },
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
     this.datefilter.ToDate= this.datepipe.transform(todate, 'dd/MMM/yyyy')
      // this.todateDisplay = this.dateFormatPipeFilter.transform(this.schModel.ToDate);
      this.todatests=true;
  }
  searchdate(){
      // alert(JSON.stringify(this.verifydts));
      // alert(JSON.stringify(this.verifydts.frmmonth)+","+JSON.stringify(this.verifydts.tomonth));
      // if(this.verifydts.frmmonth<this.verifydts.tomonth ){
      //     this.error('ToDate Is Not Lower Than FromDate');
      //     this.verify=true;
      // }
      this.datefilter.FromDate =  this.datefilter.FromDate;
      this.datefilter.ToDate = this.datefilter.ToDate;
      // if( this.verify===false){
      // if(this.frmdatests===true && this.todatests===true ){
        this.getcampaigndata();
      
      //  }        
//   else{
//       this.error('plz Fill Both From and To Dates');
//   }
//}
}
//   next() {
//       this.step2 = true;
//       this.step1 = false;
//       this.first = true;
//       this.second = false;
//       this.back = false;
//   }
next(){
    if(this.campaignForm.valid){

    }
}
  onDateChanged(event: IMyDateModel): void {
      this.enterdatests = false;
      // console.log('dddddddddd' + event.formatted);
      this.selectedDate = event.formatted;
   //   console.log('dddddddddd' + this.selectedDate);
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
  getcampaigndata() {
   //   console.log(this.datefilter);
      return this._campaignService.getcampaigndata(this.datefilter).subscribe(
          res => {
              this.campaignData = res.data;
         //   console.log('get campaign' + (JSON.stringify(this.campaignData)));
             this.disableButton = false;
             this.frmdatests = false ;
             this.todatests = false;
             this.order = 'Name';
          }
      );
  }
  getattendieId(id, guid) {
      localStorage.setItem('attendeeUrl', guid);
      localStorage.setItem('attendieId', id);
  }
  onEditCampaign(campaigndata) {
      this.campaigntimhreerrormsg = false;
      this.first = false;
      this.second = true;
      this.step2 = false;
      this.step1 = true;
       let t = campaigndata.CampaignDate;
    //   console.log(t);
        var a = t.split(" ");
        var date = a[0];
        var time = a[1];
        var p=time.split(":");
       var h=p[0];
        var m=p[1];
        this.campaigntime.hour = h;
        this.campaigntime.minute = m;
    //   var campaigntime={hour:h,minute:m};
    //   this.campaigntimemodel.campaigntime=campaigntime;
    //  console.log(campaigndata);
      this.campaignModel = campaigndata;
      let base =
      "http://" +
      window.location.hostname.split(".")[0] +
      "." +
      window.location.hostname.split(".")[1] +
      "." +
      window.location.hostname.split(".")[2] +
      "/" ;
      this.campaignModel.CampaignDate = campaigndata.CampaignDate;
      this.createdUrl = base + 'campaign-attendee/' + campaigndata.Guid;
      this.selectedDate = this.dateFormatPipeFilter.transform(campaigndata.CampaignDate);
     this.selectedDate = this.datepipe.transform(this.selectedDate, 'MM/dd/yyyy');

  }
  statusChange(id, value) {
      const model = {
          Id: id,
          IsActive: value
      };
    //  console.log(JSON.stringify(model));
      this._campaignService.campaignDeleted(model).subscribe(
          Data => {
         //     console.log('status change' + JSON.stringify(Data));
              if (Data.Success) {
                  if(model.IsActive){
                  this.success('Campaign status Activated', '');
                  }
                  else{
                  this.success('Campaign status Deactivated', '');
                  }
                  this.disableButton = true;
              }  else {
                  this.error(Data.data);
              }
          }
      );
  }
  campainPost(event) {
     // console.log(event);
      // const finalTemplate = this.Template.replace('data:text/html;base64,', '');
      // alert(this.enterdatests);
      if (this.enterdatests === true && this.validdate === false) {
          // alert('if');
          this.error('Please click on calender icon and select DOB.');
          this.ngxdp.clearDate();
      } else {
          if (this.campaignForm.valid) {
          this.campaignModel.CreatedBy = this.patientData.Id;
          this.campaignModel.IsActive = true;
          this.campaignModel.Id = 0;
          const fromdt = this.datepipe.transform(this.date, 'dd/MMM/yyyy');
          this.campaignModel.CreatedOn = fromdt + ' ' + this.date.getHours() +
              ':' + this.date.getMinutes() + ':' + this.date.getSeconds();
         // this.campaignModel.CampaignDate = this.datepipe.transform(this.selectedDate, this.postDateFormat);
          this.postdate =  this.datepipe.transform(this.selectedDate, this.postDateFormat);
          this.posttime = this.campaigntime.hour + ':' + this.campaigntime.minute ;
        //  alert(this.posttime);
          this.campaignModel.CampaignDate = this.postdate + ' ' + this.posttime;
          // alert(this.postdate+','+ JSON.stringify(this.posttime));
          // alert(JSON.stringify(this.campaignModel.CampaignDate));
         // this.campaignModel.
          this.campaignModel.TemplateUrl = '';
         console.log('post data' + JSON.stringify( this.campaignModel));
          this._campaignService.campaignPost(this.campaignModel).subscribe(
              Data => {
           //       console.log('Designtion Responce' + JSON.stringify(Data.data));
                  localStorage.setItem('postid', Data.data.Id);
                  localStorage.setItem('postguid', Data.data.Guid);
                  if (Data.Success) {
                      this.step1 = false;
                      this.step2 = true;
                      this.back = false;
                      // this.success('Campaign added', 'add');
                      this.isUrl = true;
                      this.disableButton = true;
                      let base =
                      "http://" +
                      window.location.hostname.split(".")[0] +
                      "." +
                      window.location.hostname.split(".")[1] +
                      "." +
                      window.location.hostname.split(".")[2] +
                      "/" ;
                      this.createdUrl = base + 'campaign-attendee/' + Data.data.Guid;
                       this.getcampaigndata().add(() => {
                       });
                      // this.campaignModel = new CampaignModel();
                  //    this.campaignidarray.push(this.campaignData.Id);
                  //     console.log(this.campaignidarray);
                      //   jQuery('#campaign').modal('hide');
                  } else {
                      this.error(Data.data);
                  }
              }
          );
      } else {
         // alert('error');
      }
    }
      // jQuery('#editcampaign').modal({
      //     show: 'true'
      // });
  }
  editPost() {
    //  alert();
 //   console.log(JSON.stringify(this.campaignModel));
      this.postid = localStorage.getItem('postid');
      this.postguid = localStorage.getItem('postguid');
      if(this.Template!=undefined){
      const finalTemplate = this.Template.replace('data:text/html;base64,', '');
      this.campaignModel.TemplateUrl = finalTemplate;
      }
      else{
          this.campaignModel.TemplateUrl ="";
      }
      if (this.enterdatests === true && this.validdate === false) {
          // alert('if');
          this.error('Please click on calender icon and select DOB.');
          this.editdate.clearDate();

      } else {
         // alert(this.campaigntimhreerrormsg );
          if (this.campaigntimhreerrormsg === true) {
               this.error('please enter valid campaign time');
        } else {
           // alert(1);
          const fromdt = this.datepipe.transform(this.date, 'dd/MMM/yyyy');
          this.campaignModel.ModifiedOn = fromdt + ' ' + this.date.getHours() +
              ':' + this.date.getMinutes() + ':' + this.date.getSeconds();
          this.campaignModel.ModifiedBy = this.patientData.Id;
          this.postdate =  this.datepipe.transform(this.selectedDate, this.postDateFormat);
          this.posttime = this.campaigntime.hour + ":" + this.campaigntime.minute;
        // alert(this.posttime);
          this.campaignModel.CampaignDate = this.postdate + " " + this.posttime;
          if (this.campaignModel.Id === 0) {
              this.campaignModel.Id = this.postid;
          }
          if (this.campaignModel.Guid === undefined) {

              this.campaignModel.Guid = this.postguid;
          }
          // alert(this.campaignModel.Guid);
          //  this.campaignModel.Guid = this.postguid;
         // this.campaignModel.CampaignDate = this.datepipe.transform(this.selectedDate, this.postDateFormat);
     //      console.log(JSON.stringify(this.campaignModel));
          this._campaignService.campaignPost(this.campaignModel).subscribe(
              Data => {
                //  console.log('Designtion Responce' + JSON.stringify(Data));
                  if (Data.Success) {
                      this.success('Campaign Template updated', 'edit');
                      this.isUrl = true;
                      this.disableButton = true;
                      this.campaignModel = new CampaignModel();
                      this.filename = '';
                  } else {
                      this.error(Data.data);
                  }
              }
          );
        } 
      }
  }
  wizardback() {
      this.first = false;
      this.second = true;
      this.step2 = false;
      this.step1 = true;
      this.back = true;
  }
  cancel() {
      this.getcampaigndata();
      this.isUrl = false;
      this.step2 = false;
      this.step1 = true;
      this.first = false;
      this.second = true;
      this.back = true;
      this.cmptsts = false;
  }
  toClear() {
      this.campaignModel = new CampaignModel();
      this.isUrl = false;
      this.campaigntimemodel = new CampaignTime();
      this.campaigntime.hour = '';
      this.campaigntime.minute = '';
      this.selectedDate = '';
      this.selectedDate1 = '';
      this.campaignModel.CampaignDate = '';
      this.filename = '';
      this.campaigntimhreerrormsg = false;
     this.validationtime = false;
      // this.ngxdp.clear Date();
  }
  routing(campaigndata) {
      let name = campaigndata.Name;
      let description = campaigndata.Description;
      let date = campaigndata.CampaignDate;
      let url = campaigndata.Guid;
      localStorage.setItem('campaignid', campaigndata.Id);
      localStorage.setItem('campaignname', name);
      localStorage.setItem('campaigndes', description);
      localStorage.setItem('campaigndate', date);
      localStorage.setItem('campaignurl', url);
  }
  /** Toast messages for success and failure */
  success(successmsg, type) {
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
              if (type === 'add') {
                  this.campaigntime.hour = '';
                  this.campaigntime.minute = '';
                //   jQuery('#campaign').modal('hide');
                //   jQuery('#editCampaign').modal('show');
                this.addcampaign.hide();
                this.editcampaign.hide();
                if (this.choosefile !== undefined){
                    this.choosefile.nativeElement.value = '';
                  }
                  this.step2 = false;
                  this.step1 = true;
                  this.first = false;
                  this.second = true;
              }
              if (type === 'edit') {
                this.addcampaign.hide();
                this.editcampaign.hide();
                //   jQuery('#campaign').modal('hide');
                //   jQuery('#editCampaign').modal('hide');
                this.selectedDate = '';
                this.campaigntime.hour = '';
                this.campaigntime.minute = '';
                if(this.choosefile!==undefined){
                  this.choosefile.nativeElement.value = '';
                }
                  this.step2 = false;
                  this.step1 = true;
                  this.first = false;
                  this.second = true;
                  this.filestatus = true;
              }
              // this.campaignModel = new CampaignModel();
              // this.getcampaigndata().add(() => {
              // });
          }, 3000);
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
              this.toastr.dismissToast(toast);
              // this.getcampaigndata().add(() => {
              // });
          }, 3000);
      });
  }


}
