import { Router } from '@angular/router';
import { Component, OnInit, ViewContainerRef, Input, Output, EventEmitter, NgZone, ViewChild } from '@angular/core';
import { ValidationComponent } from './../../../shared/validation/validation.component';
import { ValidationService } from './../../../shared/validation/validation.service';
import { AsyncValidatorFn, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { DatePipe, AsyncPipe } from '@angular/common';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Toast } from 'ng2-toastr/src/toast';
import { INgxMyDpOptions, IMyDateModel, IMyInputFieldChanged, IMyDate } from 'ngx-mydatepicker';
import { IMyDpOptions } from 'mydatepicker';
import { NgxMyDatePickerDirective } from 'ngx-mydatepicker';
import { AdminAssessmentService } from './adminAssessment.service';
import { Subject } from 'rxjs/Subject';
import { MaskedDate } from '../../../shared/services/datemask';
// import { MaskedDate } from '../../person/scheduler/datemask';
declare var jQuery: any;

@Component({
  moduleId: module.id,
  selector: 'app-admin-assessments',
  templateUrl: './admin-assessments.component.html',
  styleUrls: ['./admin-assessments.component.scss'],
  providers: [DatePipe, AdminAssessmentService]
})
export class AdminAssessmentsComponent implements OnInit {
  @ViewChild('selectschdt') stdate: NgxMyDatePickerDirective;
  @ViewChild('selcteddate') ngxdp: NgxMyDatePickerDirective;
  @Output() getAssessmentCall = new EventEmitter();
  obj = {
    id: 0,
    sid: 0,
    type: 'assessments'
  };
  @Input() patientid: number;
  @Input() parentData: Subject<number>;
  Date;
  selectedId: number;
  dateMask = MaskedDate;
  validdate: boolean;
  disablesave: boolean;
  enterdatests: boolean;
  expanded: string;
  myOptions: INgxMyDpOptions = {
    // other options...
    dateFormat: 'mm/dd/yyyy',
    firstDayOfWeek: 'mo',
    markCurrentDay: true,
    disableHeaderButtons: true,
    disableUntil: { year: new Date().getFullYear(), month: new Date().getMonth() + 1, day: new Date().getDate() - 1 },
    selectorHeight: '232px',
    selectorWidth: '330px'
  };
  isRefresh = true;
  assessmentFrom: boolean;
  providerData: any = [];
  startstsmodel: any = {};
  patientassessmentid: any;
  isexpandallCollapsed: boolean = false;
  closeResult: string;
  Createdate = new Date();
  scheduleObject: Object = {};
  // schdt = this.dateformat(this.Createdate);
  dueDate: any;
  public result: any = [];
  assessmentsSchedule: any = [];
  public Id: number;
  scheduleDate: any;
  ischecked = true;
  individualAssessmentData: any = {};
  // public myOptions: INgxMyDpOptions = {
  //   // other options...
  //   dateFormat: 'mm/dd/yyyy',
  // };
  model: any = { 'DOBModel': '', 'selcteddate': '', 'selectschdt': '' };
  // public myDatePickerOptions: IMyDpOptions;
  // public myDatePickerOptions1: IMyDpOptions;
  todayDate: Date;
  assessmentCSVData = [];
  isScheduleStatus = true;
  ScheduleStatus = 'Single';
  individualScheduleStatus = 'Single';
  response: any = {};
  assessment: any = [];
  sortingOrder: string;
  assessmentSchedule: any = [];
  scheduleStart: ScheduleStart;
  assessmentScheduleDate: any;
  individualSurveys: any = [];
  providerId: number;

  // public isCollapsed = this.IsExpand;
  // private vcr: ViewContainerRef;
  public IsExpand = true;
  constructor(private router: Router, private _assessmentscheduleService: AdminAssessmentService, private formBuilder: FormBuilder,
    public toastr: ToastsManager, vcr: ViewContainerRef, public datepipe: DatePipe, private zone: NgZone) {
    // this.vcr = vcr;
    this.toastr.setRootViewContainerRef(vcr);
    this.validdate = false;
    this.enterdatests = false;
    this.providerId = 4;
    this.selectedId = 0;
    this.disablesave = true;
    // this.getAssessments().add(() => {
    //     this.assessment = this.response.Type;
    //     console.log();
    //   });
    this.sortingOrder = 'Type';
    this.assessmentScheduleDate = new Date();
    this.todayDate = new Date();
    // this.expanded = 'one';
  }
  ngOnInit() {
    // this.getSurveys();
    this.parentData.subscribe(res => {
      // alert('res' + res);
      if (res != null) {
        this.patientid = res;
        console.log(this.patientid);
        this.getAssessments().add(() => {
          this.assessment = this.response.Type;
          console.log();
        });
      }

    });
    this.getAssessments().add(() => {
      this.assessment = this.response.Type;
      console.log();
    });
  }
  onInputFieldDobChanged(event: IMyInputFieldChanged, type) {
    this.enterdatests = false;
    this.validdate = false;
    if (event.value.length >= 0) {
      // alert();
      this.enterdatests = true;

      // alert();
      // console.log('yes its 1');
    }
    console.log('IMyInputFieldChanged' + JSON.stringify(event.value) + ',' + event.value.length + ',' + event.valid + ',' + type);
    if (event.value.length === 10) {
      this.disablesave = false;
      // alert(event.value.length)
      this.validdate = event.valid;
      console.log(this.validdate);
      const selectedDate = new Date(event.value.toString());
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
      // console.log('dobmodal' + JSON.stringify(dobmodal));
      if (this.validdate) {
        if (type === 'schedule') {
          this.enterdatests = false;
          this.onDOBDateChanged(dobmodal);
        } else if (type === 'individualschedule') {
          this.enterdatests = false;
          this.onDOBDateChanged(dobmodal);
        }
      } else {
        if (type === 'schedule') {
          this.stdate.clearDate();
          this.error('Please click on calender icon and select DOB.');
        } else if (type === 'individualschedule') {
          this.ngxdp.clearDate();
          this.error('Please click on calender icon and select DOB.');
        }
      }
    }
  }
  onDOBDateChanged(event: IMyDateModel): void {

    this.enterdatests = false;
    this.model.DOBModel = event;
    if (this.model.DOBModel !== '' || this.model.DOBModel !== null) {
      this.disablesave = false;
    }
    console.log('radha' + JSON.stringify(this.model.DOBModel));
  }
  close() {
    this.model.DOBModel = null;
    this.disablesave = true;
  }
  openModal() {
    let date: any;
    date = new Date();
    console.log(date);
    this.getSurveys();
    this.ScheduleStatus = 'Single';
    this.isScheduleStatus = true;
    //  this.model.tddate = this.datepipe.transform(date, 'MM/dd/yyyy');
    //  console.log(this.model.tddate);
  }
  openIndividualModal(individualAssessmentData) {
    let date: any;
    date = new Date();
    this.individualScheduleStatus = 'Single';
    // this.model.tddate = this.datepipe.transform(date, 'MM/dd/yyyy');
    this.individualAssessmentData = individualAssessmentData;
    console.log(this.individualAssessmentData);
    // console.log(this.model.tddate);
  }
  // <-------for getting type,date and status data from api---------->
  getAssessments() {
    this.isRefresh = false;
    console.log(this.patientid);
    return this._assessmentscheduleService.getAssessmentGroupby(this.patientid)
      .subscribe(arg => {
        this.zone.run(() => {
          this.response = arg.data;
          // console.log('full assessment' + JSON.stringify(this.response));
          this.isRefresh = true;
        });
      });
  }
  // <------for getting all the surveys from api---------->
  getSurveys() {
    return this._assessmentscheduleService.ScheduleAssessment(this.providerId)
      .subscribe(arg => {
        this.assessmentSchedule = arg.data;
        // console.log('schedule ' + JSON.stringify(this.assessmentSchedule));
      });
  }
  sortBy(value) {
    this.sortingOrder = value;
    if (value === 'Type') {
      // alert(this.sortingOrder);
      this.assessment = this.response.Type;
    } else if (value === 'Status') {
      this.assessment = this.response.Status;
    } else if (value === 'Date') {
      // this.DOBModel = {
      //   dateFormat: 'mm/dd/yyyy',
      //   date: { year: new Date().getFullYear(), month: new Date().getMonth() + 1, day: new Date().getDate() }
      // };
      this.assessment = this.response.Date;
    }
  }
  // <--------for starting the assessment----------->
  startAsseessment(assessmentItem) {
    this.assessmentJob(assessmentItem);
  }
  // <------for continue the assessment------>
  continueAssessment(assessmentItem) {
    console.log(assessmentItem);
    this.assessmentJob(assessmentItem);
  }
  // <-------for viewing the assessment--------->
  viewAssessment(assessmentItem) {
    // this.router.navigate(['coa/client/custom', assessmentItem.PatientAssessmentId]);
    // alert(assessmentItem.PatientAssessmentId);
    this.obj.id = assessmentItem.PatientAssessmentId;
    this.obj.sid = 0;
    this.obj.type = 'assessmenttype';
    this.getAssessmentCall.emit(this.obj);
  }
  // <------for getting individual chart data------>
  individualPerformance(Assessments) {
    // this.router.navigate(['coa/client/individualchart', Assessments.PatientAssessmentId, Assessments.SurveyId]);
    this.obj.id = Assessments.PatientAssessmentId;
    this.obj.sid = Assessments.SurveyId;
    // alert(this.obj.sid);
    this.obj.type = 'individualchart';
    this.getAssessmentCall.emit(this.obj);
  }
  // <------for getting overall chart data------>
  overallchart(Assessments) {
    // this.router.navigate(['coa/client/overallchart', Assessments.PatientId, Assessments.SurveyId]);
    this.obj.id = Assessments.PatientId;
    this.obj.sid = Assessments.SurveyId;
    // alert(this.obj.sid);
    this.obj.type = 'overallchart';
    this.getAssessmentCall.emit(this.obj);
  }
  assessmentJob(assessmentItem) {
    this.updateStatus(assessmentItem.PatientAssessmentId);
    this.obj.id = assessmentItem.PatientAssessmentId;
    this.obj.type = 'assessmenttype';
    this.getAssessmentCall.emit(this.obj);
  }
  updateStatus(id) {
    this.Id = this.providerId;
    let today: any = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1; // January is 0!
    const yyyy = today.getFullYear();
    if (dd < 10) {
      dd = '0' + dd;
    }
    if (mm < 10) {
      mm = '0' + mm;
    }
    const date = new Date();
    // let scheduleDate = '';
    let monthName = '';
    monthName = this._assessmentscheduleService.getMonthname(date);
    const scheduleDate = monthName + ' ' + new Date().getDate() + ' ' + new Date().getFullYear() + ' ' + new Date().getHours()
      + ':' + new Date().getMinutes() + ':' + new Date().getSeconds();
    // console.log(scheduleDate);
    today = dd + '/' + mm + '/' + yyyy;
    this.startstsmodel = { 'PatientAssessmentId': id, 'StartedById': this.Id, 'StartDate': scheduleDate };
    this.scheduleStart = this.startstsmodel;
    return this._assessmentscheduleService.postAssessmentUpdateStatus(this.scheduleStart)
      .subscribe(res => {
      },
        err => console.log(err)
      );
  }
  scheduleAssessment(surveyid, selecttype, val) {
    if (this.enterdatests === true && this.validdate === false) {
      // alert(selecttype);
      if (selecttype === 'schedule') {
        this.stdate.clearDate();
        this.error('Please click on calender icon and select DOB.');
      } else if (selecttype === 'individualschedule') {
        // alert(type);
        this.ngxdp.clearDate();
        this.error('Please click on calender icon and select DOB.');
      }
    } else if (this.model.DOBModel !== '') {
      let selecteddate = val;
      let date1 = new Date(selecteddate);
      this.Id = this.providerId;
      let requesObj: any = {};
      const date = new Date();
      let monthName = '';
      console.log(this.model.DOBModel.jsdate + ',' + this.model.DOBModel.formatted);
      if (this.model.DOBModel.jsdate === undefined) {
        // console.log(this.DOBModel.jsdate);
        monthName = this._assessmentscheduleService.getMonthname(date);
      } else {
        console.log(this.model.DOBModel.jsdate);
        monthName = this._assessmentscheduleService.getMonthname(this.model.DOBModel.jsdate);
      }
      this.scheduleDate = monthName + ' ' + date1.getDate() + ' ' + date1.getFullYear();
      console.log('ravindra  ' + this.scheduleDate);
      if (this.model.DOBModel.formatted === undefined) {
        requesObj = {
          'SurveyId': surveyid, 'PatientId': this.patientid,
          'CreatedDate': date, 'ScheduleDate': this.scheduleDate, 'ProviderId': this.Id
        };
      } else {
        requesObj = {
          'SurveyId': surveyid, 'PatientId': this.patientid,
          'CreatedDate': date, 'ScheduleDate': this.scheduleDate, 'ProviderId': this.Id
        };
      }
      this.postAssessmentSchedule(requesObj);
    } else {
      this.error('Please select date from calendar to schedule your assessment');
    }
  }
  scheduleAssessmentToday(surveyid) {
    const date = new Date();
    let scheduleDate = '';
    let monthName = '';
    monthName = this._assessmentscheduleService.getMonthname(date);
    scheduleDate = monthName + ' ' + new Date().getDate() + ' ' + new Date().getFullYear()
      + ' ' + new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds();
    // console.log(scheduleDate);
    //  alert(surveyid);
    this.Id = this.providerId;
    let requesObj = {
      'SurveyId': surveyid, 'PatientId': this.patientid, 'CreatedDate': scheduleDate,
      'ScheduleDate': scheduleDate, 'ProviderId': this.Id
    };
    console.log('requesObj  ' + JSON.stringify(requesObj));
    this.postAssessmentSchedule(requesObj);
  }
  postAssessmentSchedule(request) {
    // this.DOBModel = this.DOBModel.formatted;
    console.log(JSON.stringify(request));
    this._assessmentscheduleService.postAssessmentSchedule(request).subscribe(
      res => {
        console.log(res);
        // this.patientassessmentid = res.json();
        //  console.log('patientassessmentid' + this.patientassessmentid.Id);
        if (res.Success) {
          this.success(res.data);
        } else {
          this.error(res.data);
        }
      },
      err => console.log(err)
    );
  }
  refresh() {
    // alert(this.sortingOrder);
    this.isRefresh = false;
    this.getAssessments().add(() => {
      // this.assessment = this.response.Type;
      this.sortBy(this.sortingOrder);
    });
  }
  stop() {
    this.isRefresh = true;
  }
  updateScheduleStatus(value, scheduleObj) {
    if (value === 'Recurrence') {
      this.ischecked = false;
    }
    this.selectedId = scheduleObj.Id;
    this.ScheduleStatus = value;
    this.scheduleObject = {
      ActionItemId: scheduleObj.Id,
      ActionItemName: 'Assessment'
    };
    // console.log(JSON.stringify(this.scheduleObject));
  }
  updateIndividualScheduleStatus(value, individualServeyId) {
    this.individualScheduleStatus = value;
    this.selectedId = individualServeyId;
    this.scheduleObject = {
      ActionItemId: individualServeyId,
      ActionItemName: 'Assessment'
    };
    // console.log('@@@@@@@@' + JSON.stringify(this.scheduleObject));
  }
  // continue() {
  //     alert();
  //     this.obj.id = 2;
  //     this.obj.type = 'phq9';
  //     this.getAssessmentCall.emit(this.obj);
  // }
  /** Toast messages for success and failure */
  success(successmsg) {
    this.toastr.success(successmsg, null, {
      dismiss: 'controlled', showCloseButton: true,
      positionClass: 'toast-bottom-right', newestOnTop: true, progressBar: false,
      showEasing: 'swing', closeButton: false, 'preventDuplicates': true,
      'debug': false, 'hideEasing': 'linear',
      'showMethod': 'fadeIn',
      'hideMethod': 'fadeOut'
    }).then((toast: Toast) => {
      setTimeout(() => {
        this.toastr.dismissToast(toast);
        this.model.selectschdt = '';
        this.model.selcteddate = '';
        this.getAssessments().add(() => {
          this.assessment = this.response.Type;
        });
      }, 3000);
    });
  }
  error(errormsg) {
    // alert(errormsg);
    this.toastr.error(errormsg, null, {
      dismiss: 'controlled', showCloseButton: true,
      positionClass: 'toast-bottom-right', newestOnTop: true, progressBar: false,
      showEasing: 'swing', closeButton: false, 'preventDuplicates': true,
      'debug': false, 'hideEasing': 'linear',
      'showMethod': 'fadeIn',
      'hideMethod': 'fadeOut'
    }).then((toast: Toast) => {
      setTimeout(() => {
        this.toastr.dismissToast(toast);
      }, 3000);
    });
  }
  expand(selected) {
    alert(selected)
    this.expanded = selected;
  }
}
export class ScheduleStart {
  PatientAssessmentId: any;
  StartedById: any;
  StartDate: Date;
}