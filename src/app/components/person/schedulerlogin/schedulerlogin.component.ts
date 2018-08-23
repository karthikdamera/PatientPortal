import { Component, OnInit, ViewContainerRef, Input, ViewChild, HostListener, AfterViewInit } from '@angular/core';
import { Routes, Router, Params, ActivatedRoute, RoutesRecognized, NavigationExtras } from '@angular/router';
import { ToastService } from '../../../shared/services/toastService';
import { ToastsManager } from 'ng2-toastr';
import { DatePipe } from '@angular/common';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { ValidationService } from '../../../shared/validation/validation.service';
import { ValidationComponent } from '../../../shared/validation/validation.component';
import { Appointments, SearchModel, RatingModel } from '../../../models/appointments.model';
import * as moment from 'moment';
import { PharmacyService } from '../pharmacy/pharmacy.service';
import { RegistrationModel, FollowUpUser, sessionenum } from './../../../models/person-slot.model';
import { INgxMyDpOptions, IMyInputFieldChanged, IMyDate, IMyDateModel } from 'ngx-mydatepicker';
import { NgxMyDatePickerDirective } from 'ngx-mydatepicker';
import { UnMaskedData } from '../../../shared/services/unmaskdata';
import { MaskedDate } from '../../../shared/services/datemask';
import { Observable } from 'rxjs/Observable';
import { SchedulerService } from '../scheduler/scheduler.service';
import { FilterPipe } from '../../../shared/services/FilterPipe';
import { AppointmentService } from '../my-appontments/my-appointment.service';
import { TenantResponse } from '../../../models/tenant.model';

import { ModalDirective } from 'angular-bootstrap-md';
import { CarouselModule } from 'angular-bootstrap-md';
import { CarouselComponent } from 'angular-bootstrap-md';
import { PersonComponent } from '../person.component';
@Component({
  selector: 'app-schedulerlogin',
  templateUrl: './schedulerlogin.component.html',
  styleUrls: ['./schedulerlogin.component.scss'],
  providers: [DatePipe, SchedulerService, ToastService, AppointmentService]
})
// ,AfterViewInit
export class SchedulerloginComponent implements OnInit, AfterViewInit {
  @ViewChild('carouselRef') carosal: CarouselComponent;
  @ViewChild('schdate') schngxdp: NgxMyDatePickerDirective;
  @ViewChild('DOB') dobngxdp: NgxMyDatePickerDirective;
  @ViewChild('sortdate') sortngxdp: NgxMyDatePickerDirective;
  @ViewChild('ratting') ratting: ModalDirective;
  Appointments: any = [];
  today = new Date();
  lastDay: any; // new Date(today);
  appointmentsModel: Array<Appointments>;
  tenantData: TenantResponse;
  ratingmodel: RatingModel;
  // fromtime: string;
  // totime: string;
  date: Date = new Date();
  viewprams: {};
  fromdateDisplay: any;
  loading: boolean;
  windowWidth: number;
  todateDisplay: any;
  isPrevious: boolean;
  prevnext: boolean;
  prev: boolean;
  // REGISTARTION
  stateNames: any = [];
  // for followup user post
  followupUserPost: FollowUpUser;
  phonests: boolean;
  enterdatests: boolean;
  validdate: Boolean = false;
  providerName: string;
  imageUrl: string;
  serviceType: string;
  dateMask = MaskedDate;
  modal: any = {
    'DOB': '', 'sortdate': '',
    'schdate': ''
  };
  // userForm: FormGroup;
  message: string;
  changeslotid: number;
  Dob: string;
  successmessage: boolean;
  patientData: any;
  session: string;
  sessionsts: boolean;
  sessionenum: sessionenum;
  sessionnames: any = [];
  providerId: number;
  sortdatests: boolean;
  errorstatus: boolean;
  searchsts: boolean;
  schedular: boolean;
  schedulerloginnav: boolean;
  counter:number;
  // auto complete
  public filteredList1 = [];
  public selected1 = [];
  public query1 = '';
  items1: any = [];
  appintmenttype: string;
  schedulests: boolean;
  schedulerloginnav1: boolean;
  disabled: boolean;
  // appintmenttypeId: number;
  // auto complete location
  public filteredList2 = [];
  public selected2 = [];
  public query2 = '';
  items2: any = [];
  locationtype: string;
  serachModel: SearchModel;
  patientid: any;
  myappointmentData: any = [];
  nextcount: number;
  previouscount: number;
  schedular1: boolean;
  ratingpopup:boolean;
  ratingpopup1:boolean;
  personrating:number;
  availabledates = [];
  nextavailabilitydt: string;
  myDOBOptions: INgxMyDpOptions = {
    // other options...
    dateFormat: 'mm/dd/yyyy',
    firstDayOfWeek: 'mo',
    markCurrentDay: true,
    disableHeaderButtons: true,
    disableSince: { year: this.date.getFullYear(), month: this.date.getMonth() + 1, day: this.date.getDate() },
    selectorHeight: '232px',
    selectorWidth: '250px'
  };
  myschdateOptions: INgxMyDpOptions = {
    // other options...
    dateFormat: 'mm/dd/yyyy',
    disableWeekends: true,
    firstDayOfWeek: 'mo',
    markCurrentDay: true,
    disableHeaderButtons: true,
    disableUntil: { year: this.date.getFullYear(), month: this.date.getMonth() + 1, day: this.date.getDate() - 1 },
    // disableSince: { year: this.date.getFullYear(), month: this.date.getMonth() + 1, day: this.date.getDate() + 30 },
    selectorHeight: '232px',
    selectorWidth: '250px'
  };
  sortDateOptions: INgxMyDpOptions = {
    // other options...
    dateFormat: 'mm/dd/yyyy',
    disableWeekends: true,
    firstDayOfWeek: 'mo',
    markCurrentDay: true,
    disableHeaderButtons: true,
    disableUntil: { year: this.date.getFullYear(), month: this.date.getMonth() + 1, day: this.date.getDate() - 1 },
    // disableSince: { year: this.date.getFullYear(), month: this.date.getMonth() + 1, day: this.date.getDate() + 30 },
    selectorHeight: '232px',
    selectorWidth: '250px'
  };
  ratingClicked: number;
  itemIdRatingClicked: number;
  isshowrating:boolean;
  inpustName:string;
  constructor(private _toast: ToastService, private router: Router, private formBuilder: FormBuilder,
    public toastr: ToastsManager, vcr: ViewContainerRef, public datepipe: DatePipe,
    public _appoinmentservice: SchedulerService,
    private _myappointmnetService: AppointmentService,
    private route: ActivatedRoute,  private _personcomponent: PersonComponent) {
    this.disabled = false;
    this.toastr.setRootViewContainerRef(vcr);
    this.appointmentsModel = new Array<Appointments>();
    this.followupUserPost = new FollowUpUser();
    this.isPrevious = false;
    this.phonests = false;
    this.providerName = '';
    this.ratingpopup=true;
    this.ratingpopup1=true;
    this.serviceType = '';
    this.message = '';
    this.imageUrl = '';
    this.loading = false;
    this.patientid = '';
    this.session = 'AnyTime';
    this.successmessage = false;
    this.sessionsts = false;
    this.providerId = 0;
    this.sortdatests = false;
    this.appintmenttype = '';
    this.errorstatus = false;
    this.searchsts = false;
    this.Dob = '';
    this.schedulests = false;
    this.schedular1 = false;
    this.schedulerloginnav = false;
    this.schedulerloginnav1 = true;
    // this.appintmenttypeId = 0;
    this.locationtype = '';
    this.schedular = true;
    this.prev = false;
    this.nextcount = 0;
    this.previouscount = 0;
    this.nextavailabilitydt = '';
    this.serachModel = new SearchModel();
    this.tenantData = new TenantResponse();
    this.ratingmodel = new RatingModel();
    this.route.queryParams.subscribe(params => {
      this.isshowrating = params['isshowrating'];
  });
    //   this.userForm = this.formBuilder.group({
    //     'Birthdate': [''],
    //     'FirstName': ['', Validators.required, ValidationService.alphabeticsValidator],
    //     'LastName': ['', Validators.required, ValidationService.alphabeticsValidator],
    //     'Email': ['', Validators.required, ValidationService.emailValidator],
    //     'PhoneNo': ['', Validators.required],
    //     'Address': [''],
    //     'Address2': [''],
    //     'City': [''],
    //     'State': [''],
    //     'Zipcode': ['', [Validators.required, Validators.minLength(5), Validators.maxLength(5)],
    //         ValidationService.numericalsValidatorFromone],
    //     'Message': ['']
    // });
    this._personcomponent.Popupopenclose('close');
    for (let i = 0; i < 3; i++) {
      this.sessionnames.push(sessionenum[i]);
    }
    this.patientData = JSON.parse(localStorage.getItem('loginData'));
    this.patientid = this.patientData.Id;
    this.Dob = moment(this.patientData.DOB, 'DD/MMM/YYYY').format('MM/DD/YYYY');
    this.serachModel.DOB = this.patientData.DOB;
    this.serachModel.ProviderId = this.patientData.ProviderData.ProviderId;
    this.serachModel.PersonId= this.patientid ;
    this.route.queryParams.subscribe(params => {
      if (params['ChangeSlotId']) {
        this.changeslotid = params['ChangeSlotId'];
      } else {
        this.changeslotid = 0;
      }
    });
    this.route.queryParams.subscribe(params => {
      this.counter = params['counter'];
    });
    setTimeout(() => {
      this.getInfo();
    }, 1000);
  }
  getInfo() {
    let appoinmnetid: any;
    let locationid: any;
    const tenantData = localStorage.getItem('TenantData');

    if (tenantData != null) {
      this.tenantData = JSON.parse(tenantData) as TenantResponse;
      // console.log(this.tenantData);
      this.appintmenttype = this.tenantData.OrganisationSettings.DefaultAppointmentTypeName;
      this.query1 = this.appintmenttype;
      appoinmnetid = this.tenantData.OrganisationSettings.DefaultAppointmentTypeId;
      this.serachModel.AppointmentTypeId = appoinmnetid;
      // this.locationtype = this.tenantData.OrganisationSettings.DefaultLocationName;
      if (this.patientData.ProviderData.LocationName !== null) {
        this.locationtype = this.patientData.ProviderData.LocationName;
      } else {
        this.locationtype = this.tenantData.OrganisationSettings.DefaultLocationName;
      }
      this.query2 = this.locationtype;
      locationid = this.patientData.ProviderData.LocationId;
      // alert(this.query2);
      // this.tenantData.OrganisationSettings.DefaultLocationId;
      this.serachModel.Location = locationid;

      this.getProviderInfo('search');
    }
  }
  ngOnInit() {
    // this.ratting.show();
    this.ratingpopup1=true;
    this.getAllMyappointmnets();
    // this.getProviderInfo();
    this.serachModel.today = moment(new Date, 'MM/DD/YYYY').format('MM/DD/YYYY');
    this.modal.schdate = this.serachModel.today;
    // alert(this.modal.DOB);
    this.serachModel.ScheduleDate = moment(
      this.serachModel.today,
      'MM/DD/YYYY'
    ).format('DD/MMM/YYYY');
  }
  getAllMyappointmnets() {
    let date: any;
    date = new Date();
    const currentdata = this.datepipe.transform(date, 'dd/MMM/yyyy');
    const currenttime = currentdata + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
    return this._myappointmnetService.GetAppoinments(this.patientid, currenttime).subscribe(
      res => {
        this.myappointmentData = res.data;
        console.log(JSON.stringify(this.myappointmentData));
        // this.model.PatientId = this.patientData.Id;
        
      }
    );
    
  }
  getProviderInfo(type) {
    this.searchsts = true;
    this.appointmentsModel = [];
    if (type === 'session') {
     this.ratingpopup=false;
    }
    if (type === 'search') {
      this.session = 'AnyTime';
      this.sessionsts = false;
    }
   // this.serachModel.ProviderId = null;
    //   if (this.selected1.length === 0 && this.filteredList1.length > 0) {

    //     for (let i = 0; i <= this.filteredList1.length - 1; i++) {
    //       if (this.filteredList1[i].Name.toLowerCase() === this.query1.toLowerCase()) {
    //         this.appintmenttype = this.filteredList1[i].Name;
    //         this.serachModel.AppointmentTypeId = this.filteredList1[i].Id;
    //       }
    //     }

    //   }
    //  // console.log(this.selected2 +','+ this.query2);
    //   if (this.selected2.length === 0 && this.filteredList2.length > 0) {
    //     // alert(this.query2);
    //     for (let i = 0; i <= this.filteredList2.length - 1; i++) {
    //       if (this.filteredList2[i].LocationName.toLowerCase() === this.query2.toLowerCase()) {
    //         this.locationtype = this.filteredList2[i].LocationName;
    //         this.serachModel.Location = this.filteredList2[i].Id;
    //       }
    //     }

    //   }
    // console.log(this.serachModel); console.log('charan');
   
    return this._appoinmentservice.getproviderslotsInfo(this.serachModel).subscribe(
      res => {

        console.log(res);
        if (this.sessionsts === true) {
          // console.log(this.lastDay);
          this.today = new Date(this.today);
        }
        this.appointmentsModel = res.data;
        //  console.log(this.appointmentsModel);
        let counter = 0;
        for (let p = 0; p <= this.appointmentsModel.length - 1; p++) {
          this.appointmentsModel[p].profile.Settings.Rating = Math.round(this.appointmentsModel[p].profile.Settings.Rating);
          this.rating = this.appointmentsModel[p].profile.Settings.Rating;
          this.appointmentsModel[p].profile.Settings.PersonRating = Math.round(this.appointmentsModel[p].profile.Settings.PersonRating);
          this.personrating = this.appointmentsModel[p].profile.Settings.PersonRating;
          this.appointmentsModel[p].showProviderDetails = (p == 0) ? true : false;
          this.lastDay = new Date(this.today);
         // this.onClick();
          // alert(this.today + ',' + this.lastDay);
          this.lastDay.setDate(this.today.getDate() + 3);
          // console.log(this.lastDay);
          if (counter === 0 && !(this.sessionsts) && !(this.sortdatests)) {
            this.pushProviderSlots(this.appointmentsModel[p], p, true, false);
            //  this.sessionsts = false;
          } else if (this.appointmentsModel[p].profile.Id === this.providerId) {
            this.pushProviderSlots(this.appointmentsModel[p], p, true, false);
            break;
          }
          counter++;

        }

        //  console.log(this.appointmentsModel);
      });
  }
  pushProviderSlots(p, currentIndex, show, collapsiblests) {
    this.nextavailabilitydt = '';
    this.providerId = p.profile.Id;
    // console.log(this.sortdatests);
    if (this.schedulests === true && collapsiblests === true) {
      //  console.log(this.modal.schdate);
      this.today = new Date(this.modal.schdate);
      if (this.today.toString() == 'Invalid Date') {
        // alert(JSON.stringify(this.modal.schdate));
        this.today = new Date(this.modal.schdate.formatted);
        // alert(this.today);
      }
      //   console.log(this.today);
      this.lastDay = new Date(this.today);
      this.lastDay.setDate(this.today.getDate() + 3);
    }
    if (this.sortdatests === true && collapsiblests === true) {
      // collapsiblests = false;
      // console.log( this.modal.sortdate );
      this.today = new Date(this.modal.sortdate);
      //   console.log(this.today);
      this.lastDay = new Date(this.today);
      this.lastDay.setDate(this.today.getDate() + 3);
    }
    if (collapsiblests === true && this.sortdatests === false && this.schedulests === false) {
      // alert();
      this.today = new Date();
      this.lastDay = new Date(this.today);
      this.lastDay.setDate(this.today.getDate() + 3);
    }
    // console.log(p);
    this.getBookedSlots(this.today, this.lastDay, p, show);
  }
  checkSlotConflict(date, interval, enddaydate) {
    let hasConflict = false;
    // console.log('Appointments' + JSON.stringify(this.Appointments));
    if (this.Appointments.length > 0) {
      let currentDateBookedSlots = {
        Date: '', Slots: []
      };
      let bookeddate: any;
      let bookedfromtime: any;
      let bookedtotime: any;
      currentDateBookedSlots = this.Appointments.find(m => moment(moment(m.Date, 'DD-MMM-YYYY').
        format('DD-MM-YYYY'), 'DD-MM-YYYY').isSame(date, 'day'));
      // console.log(moment('05-05-2018', 'DD-MM-YYYY').isSame(date, 'day') + '---------------' + moment(date, 'DD-MM-YYYY'));
      //  console.log('currentDateBookedSlots'+ JSON.stringify(currentDateBookedSlots));
      if ((currentDateBookedSlots != undefined) && (currentDateBookedSlots.Slots.length > 0)) {
        for (let i = 0; i <= currentDateBookedSlots.Slots.length - 1; i++) {
          bookeddate = moment(currentDateBookedSlots.Date, 'DD-MMM-YYYY');
          bookedfromtime = new Date(bookeddate);
          bookedfromtime.setHours(currentDateBookedSlots.Slots[i].fromTime24.split(':')[0],
            currentDateBookedSlots.Slots[i].fromTime24.split(':')[1], 0, 0);
          let diff = (bookedfromtime.getTime() - date.getTime()) / 1000;
          diff /= 60;
          diff = Math.abs(Math.round(diff));
          bookedtotime = new Date(bookeddate);
          bookedtotime.setHours(currentDateBookedSlots.Slots[i].totime24.split(':')[0],
            currentDateBookedSlots.Slots[i].totime24.split(':')[1], 0, 0);
          let totimediff = (enddaydate.getTime() - bookedtotime.getTime()) / 1000;
          totimediff /= 60;
          // totimediff = Math.abs(Math.round(totimediff));
          // console.log(date + ',' + enddaydate + ',' + diff + ',' + totimediff);
          // console.log('end time diff-->' + totimediff);
          let fromTime = currentDateBookedSlots.Slots[i].fromTime.replace('AM', ' AM').replace('PM', ' PM');
          let toTime = currentDateBookedSlots.Slots[i].totime.replace('AM', ' AM').replace('PM', ' PM');
          let momentfromtime = moment(bookedfromtime, 'DD-MM-YYYY').
            hours(currentDateBookedSlots.Slots[i].fromTime24.split(':')[0]).minutes(currentDateBookedSlots.Slots[i].fromTime24.split(':')[1]);
          let momenttotime = moment(bookedtotime, 'DD-MM-YYYY').
            hours(currentDateBookedSlots.Slots[i].totime24.split(':')[0]).minutes(currentDateBookedSlots.Slots[i].totime24.split(':')[1]);
          // debugger;
          if ((moment(moment(date, 'DD-MM-YYYY').format('h:mm A'), 'h:mm A').
            isBefore(moment(moment(momentfromtime, 'DD-MM-YYYY').format('h:mm A'), 'h:mm A')))
            && (diff < interval) &&
            (totimediff >= 0)) {
            console.log('slot from < booked frrom time & slot  and booked from timee diff < interval & slot endtime>0 -->'
              + moment(date, 'DD-MM-YYYY').format('h:mm A'));
            if (totimediff > 0) {
              date.setHours(currentDateBookedSlots.Slots[i].totime24.split(':')[0],
                currentDateBookedSlots.Slots[i].totime24.split(':')[1], 0, 0);
              this.checkSlotConflict(date, interval, enddaydate);
            } else if (totimediff === 0) {
              hasConflict = true;
            }
            // this.checkSlotConflict(date , interval );

          } else if (moment(moment(date, 'DD-MM-YYYY').format('h:mm A'), 'h:mm A').
            isSame(moment(moment(momentfromtime, 'DD-MM-YYYY').format('h:mm A'), 'h:mm A')) &&
            moment(moment(date, 'DD-MM-YYYY').add(interval, 'minute').format('h:mm A'), 'h:mm A').
              isAfter(moment(moment(momenttotime, 'DD-MM-YYYY').format('h:mm A'), 'h:mm A')) && (totimediff >= 0)) {
            console.log('slot fromtime same and totime greater than to booked totime -->' + moment(date, 'DD-MM-YYYY').format('h:mm A'));
            if (totimediff > 0) {
              date.setHours(currentDateBookedSlots.Slots[i].totime24.split(':')[0],
                currentDateBookedSlots.Slots[i].totime24.split(':')[1], 0, 0);
              this.checkSlotConflict(date, interval, enddaydate);
            } else if (totimediff === 0) {
              hasConflict = true;
            }
          }
          // else if (moment(moment(date, 'DD-MM-YYYY').format('h:mm A'), 'h:mm A').
          //   isAfter(moment(moment(momentfromtime, 'DD-MM-YYYY').format('h:mm A'), 'h:mm A')) &&
          //   moment(moment(date, 'DD-MM-YYYY').add(interval, 'minute').format('h:mm A'), 'h:mm A').
          //     isAfter(moment(moment(momenttotime, 'DD-MM-YYYY').format('h:mm A'), 'h:mm A')) && (slotbookedtotimediff <= interval) && (totimediff >= 0)) {
          //   console.log('slot fromtime same and totime greater than to booked totime -->' + moment(date, 'DD-MM-YYYY').format('h:mm A'));
          //   if (totimediff > 0) {
          //     date.setHours(currentDateBookedSlots.Slots[i].totime24.split(':')[0],
          //       currentDateBookedSlots.Slots[i].totime24.split(':')[1], 0, 0);
          //   } else if (totimediff === 0) {
          //     hasConflict = true;
          //   }
          // }
          else if (moment(moment(date, 'DD-MM-YYYY').format('h:mm A'), 'h:mm A').
            isSameOrAfter(moment(moment(momentfromtime, 'DD-MM-YYYY').format('h:mm A'), 'h:mm A')) &&
            moment(moment(date, 'DD-MM-YYYY').add(interval, 'minute').format('h:mm A'), 'h:mm A').
              isSameOrBefore(moment(moment(momenttotime, 'DD-MM-YYYY').format('h:mm A'), 'h:mm A')) && (totimediff >= 0)) {
            console.log('between slot from time >= and slot totime <=  -->' + moment(date, 'DD-MM-YYYY').format('h:mm A'));
            if (totimediff > 0) {
              date.setHours(currentDateBookedSlots.Slots[i].totime24.split(':')[0],
                currentDateBookedSlots.Slots[i].totime24.split(':')[1], 0, 0);
              this.checkSlotConflict(date, interval, enddaydate);
            } else if (totimediff === 0) {
              hasConflict = true;
            }
          }
        }
      }
    }
    // iterate through scheduled appointments
    // if 'date' has conflict, return true
    // else, return false
    return hasConflict;
  }
  getTimeSlotsForDay(date, settings, dayType, morning, after, evening) {
    const timeSlots = [];
    const dayStart = new Date(date);
    const dayEnd = new Date(date);
    let startHr = 0;
    let startMin = 0;
    let endHr = 0;
    let endMin = 0;
    if ((dayType === 1) && ((this.session === 'AnyTime') || (this.session === 'Morning')) && !morning) {
      startHr = (settings.MorningFrom == null || settings.MorningFrom === '') ? 0 : settings.MorningFrom.split(':')[0];
      // console.log(startHr);
      startMin = (settings.MorningFrom == null || settings.MorningFrom === '') ? 0 : settings.MorningFrom.split(':')[1];
      // console.log(startMin);
      endHr = (settings.MorningTo == null || settings.MorningTo === '') ? 0 : settings.MorningTo.split(':')[0];
      endMin = (settings.MorningTo == null || settings.MorningTo === '') ? 0 : settings.MorningTo.split(':')[1];
    } else if ((dayType === 2) && ((this.session === 'AnyTime') || (this.session === 'Afternoon')) && !after) {
      startHr = (settings.AfternoonFrom == null || settings.AfternoonFrom === '') ? 0 : settings.AfternoonFrom.split(':')[0];
      startMin = (settings.AfternoonFrom == null || settings.AfternoonFrom === '') ? 0 : settings.AfternoonFrom.split(':')[1];
      endHr = (settings.AfternoonTo == null || settings.AfternoonTo === '') ? 0 : settings.AfternoonTo.split(':')[0];
      endMin = (settings.AfternoonTo == null || settings.AfternoonTo === '') ? 0 : settings.AfternoonTo.split(':')[1];
    } else if ((dayType === 3) && ((this.session === 'AnyTime') || (this.session === 'Afternoon')) && !evening) {
      startHr = (settings.EveningFrom == null || settings.EveningFrom === '') ? 0 : settings.EveningFrom.split(':')[0];
      startMin = (settings.EveningFrom == null || settings.EveningFrom === '') ? 0 : settings.EveningFrom.split(':')[1];
      endHr = (settings.EveningTo == null || settings.EveningTo === '') ? 0 : settings.EveningTo.split(':')[0];
      endMin = (settings.EveningTo == null || settings.EveningTo === '') ? 0 : settings.EveningTo.split(':')[1];
    }
    console.log(dayStart.getDate() + ',' + new Date().getDate());
    if (((settings.DisableSlots && settings.AvailableDates !== ''
      && settings.AvailableDates.includes(moment(dayStart, 'YYYY-MM-DD').format('DD-MMM-YYYY'))))
      || (settings.DisableSlots == false && ((startHr != 0 && endHr != 0) && (startHr != null && endHr != null)))) {
      if (moment(moment(dayStart, 'YYYY-MM-DD').format('YYYY-MM-DD')).isBefore(moment(new Date(), 'YYYY-MM-DD').format('YYYY-MM-DD')) || 
      (moment(new Date()).add(settings.EndInDays, 'days').isBefore(dayStart, 'day'))) {
        return timeSlots;
      }
      switch (date.getDay()) {
        case 0: // Sunday
          return timeSlots;
        case 6: // Saturday
          // dayStart.setHours(startHr, startMin, 0, 0);
          // dayEnd.setHours(endHr, endMin, 0, 0);
          return timeSlots;
        // break;
        default:
          dayStart.setHours(startHr, startMin, 0, 0);
          dayEnd.setHours(endHr, endMin, 0, 0);
      }
      do {
        if (!this.checkSlotConflict(dayStart, settings.interval, dayEnd)) {
          let diff = (dayEnd.getTime() - dayStart.getTime()) / 1000;
          diff /= 60;
          diff = Math.abs(Math.round(diff));
          // console.log(diff);
          if ((diff > settings.interval) || (diff === settings.interval)) {
            if ((moment(new Date(), 'DD-MM-YYYY').isSame(dayStart, 'day')) &&
              moment(dayStart).isBefore(moment(new Date()))) { }
            else {
              timeSlots.push(new Date(dayStart));
            }
          }
        }
        dayStart.setHours(dayStart.getHours(), dayStart.getMinutes() + settings.interval);
      } while (dayStart <= dayEnd);

    }
    return timeSlots;
  }
  previous(prviderinfo, index, status, collapssts) {
    this.nextavailabilitydt = '';
    this.carosal.isControls = false;
    this.previouscount++;
    if (this.previouscount == 1) {
      this.prev = true;
      // console.log(event);
      this.Appointments = [];
      this.isPrevious = false;
      // console.log('sssss'+JSON.stringify(prviderinfo));
      this.lastDay = new Date(this.today);
      this.today = new Date(this.lastDay);
      this.today.setDate(this.today.getDate() - 3);
      // this.lastDay.setDate(this.today.getDate() + 3);
      // console.log(moment(this.today, 'DD-MM-YYYY') + ',' + moment(new Date, 'DD-MM-YYYY'));
      if ((moment(this.today, 'DD-MM-YYYY')) <= (moment(new Date, 'DD-MM-YYYY'))) {
        // alert();
        this.isPrevious = true;
      }
      // this.getBookedSlots(this.today, this.lastDay, prviderinfo);

      setTimeout(() => {
        this.pushProviderSlots(prviderinfo, index, status, collapssts);
      }, 200);
    }
  }
  next(prviderinfo, index, status, collapssts) {
    this.nextavailabilitydt = '';
    this.carosal.isControls = false;
    this.nextcount++;
    if ((this.nextcount == 1) &&
    (moment(new Date()).add(prviderinfo.profile.Settings.EndInDays, 'days').isSameOrAfter(new Date(this.lastDay), 'day'))) {
    this.prev = false;
    this.Appointments = [];
    this.isPrevious = false;
    this.today = new Date(this.lastDay);
    this.lastDay = new Date(this.today);
    this.lastDay.setDate(this.today.getDate() + 3);
    // this.getBookedSlots(this.today, this.lastDay, prviderinfo);
    setTimeout(() => {
      this.pushProviderSlots(prviderinfo, index, status, collapssts);
    }, 200);
  } else {
    setTimeout(() => {
    this.nextcount = 0;
    this.carosal.isControls = true;
  }, 1500);
  }
  }
  providerDetails(provider, currentIndex, show) {
    this.isPrevious = false;
    for (let p = 0; p <= this.appointmentsModel.length - 1; p++) {
      if (show) {
        this.appointmentsModel[p].showProviderDetails = this.appointmentsModel[p].profile.Id === provider.profile.Id ? true : false;
      } else {
        this.appointmentsModel[p].showProviderDetails = false;
      }
    }
  }
  // registartion code start
  onInputFieldDobChanged(event: IMyInputFieldChanged, type) {
    this.validdate = false;
    // this.ngxdp.clearDate();
    // console.log('IMyInputFieldChanged' + JSON.stringify(event.value) + ',' + event.value.length + ',' + event.valid);
    this.enterdatests = false;
    if (event.value.length >= 1) {
      //   this.convertDateFormate(event.value);
      this.enterdatests = true;
    }
    if (event.value.length === 10) {
      this.validdate = event.valid;
      // this.validdatecheck = true;
      // alert(type);
      // console.log(this.validdate);
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
      // alert(event.value);
      // console.log('dobmodal' + JSON.stringify(dobmodal));
      if (this.validdate) {
        // this.onDateChanged(dobmodal);
        if (type === 'schday') {
          this.enterdatests = false;
          this.onScheduleDateChanged(dobmodal);
        } else if (type === 'bday') {
          this.enterdatests = false;
          this.onDOBDateChanged(dobmodal);
        } else if (type === 'sortdate') {
          this.enterdatests = false;
          this.onsortDateDateChanged(dobmodal);
        }
      } else {
        if (type === 'schday') {
          this.error('Please click on calender icon and select Date.');
          this.schngxdp.clearDate();
        } else if (type === 'bday') {
          this.error('Please click on calender icon and select DOB.');
          this.dobngxdp.clearDate();
        } else if (type === 'sortdate') {
          this.error('Please click on calender icon and select Date.');
          this.sortngxdp.clearDate();
        }
      }
    }
  }
  onDOBDateChanged(event: IMyDateModel): void {

    this.enterdatests = false;

    this.modal.DOB = event.formatted;
    this.modal.bdate = this.modal.DOB;
    this.serachModel.DOB = moment(this.modal.DOB, 'MM-DD-YYYY').format('DD/MMM/YYYY');
  }
  onScheduleDateChanged(event: IMyDateModel): void {

    this.enterdatests = false;
    this.today = event.jsdate;
    this.sortdatests = false;
    this.schedulests = true;
    this.isPrevious = false;
    this.modal.schdate = moment(event.formatted, 'MM/DD/YYYY').format('MM/DD/YYYY');
    // console.log(event);
    // this.today = this.modal.schdate;
    this.serachModel.ScheduleDate = moment(this.modal.schdate, 'MM/DD/YYYY').format('DD/MMM/YYYY');
  }
  onsortDateDateChanged(event: IMyDateModel): void {

    this.enterdatests = false;
    this.schedulests = false;
    this.isPrevious = false;
    this.modal.sortdate = event.formatted;
    // console.log(this.modal.sortdate);
    this.today = new Date(event.formatted);
    this.sortdatests = true;
    this.getProviderInfo('sort');
  }

  choosedSloat(img, id, providername, servicetype, slot, days) {
    // console.log('radha' + this.modal.bdate);
    // this.modal.bdate = '05/05/2000';
    this.followupUserPost = new FollowUpUser();
    this.providerName = '';
    this.serviceType = '';
    this.message = '';
    this.successmessage = false;
    this.errorstatus = false;
    // console.log(days.Displaydate);
    this.providerName = providername;
    this.serviceType = servicetype;
    this.followupUserPost.ProviderId = id;
    this.followupUserPost.SlotDate = days.Displaydate;
    this.followupUserPost.FromTime = slot.fromtime;
    this.followupUserPost.ToTime = slot.totime;
    this.followupUserPost.PatientId = this.patientid;
    this.imageUrl = img;
    window.scrollTo(0, 0);
    // window.scrollTo(0,1);
    // alert();
    // tslint:disable-next-line:radix
    this.windowWidth = parseInt( localStorage.getItem('windowWidth'));
    if (this.windowWidth < 1270) {
       this._personcomponent.Popupopenclose('open');
    }
  }
  bookslot() {
    let date: Date;
    date = new Date();
    const currentdate = this.datepipe.transform(date, 'dd/MMM/yyyy');
    if (this.changeslotid === 0) {
      this.followupUserPost.CancelledSlotId = 0;
    } else {
      this.followupUserPost.CancelledSlotId = this.changeslotid;

    }
    // alert(this.followupUserPost.CancelledSlotId );
    this.loading = true;
    this.followupUserPost.CreatedBy = '';
    this.followupUserPost.CreatedOn = currentdate;
    this.followupUserPost.BookedSlotId = 0;
    this.followupUserPost.AppointmentTypeId = this.serachModel.AppointmentTypeId;
    console.log(JSON.stringify(this.followupUserPost));
    this._appoinmentservice.followupUser(this.followupUserPost).subscribe(
      res => {
        console.log(JSON.stringify(res));
        if (res.Success) {
          this.successmessage = true;
          this.message = 'Your Appointment has been confirmed';
        } else {
          this.errorstatus = true;
          this.message = res.data;
        }
        this.loading = false;
      },
      err => console.log(err)
    );
  }
  setSession(e: string): void {
    this.sessionsts = true;
    this.session = e;
    // alert(this.session);
    this.getProviderInfo('session');
    // this.getSlotswithcurrentdate();
  }
  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach(field => {
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }
  // autocomplete
  filter1() {
    this.appintmenttype = '';
    this.selected1 = [];
    this.filteredList1 = [];
    this.query1 = '';
    return this._appoinmentservice.getAppoinmenttype().subscribe(res => {
      this.items1 = res.data;
      this.filteredList1 = this.items1.filter((el: any) => {
        return el;
      });
    });
  }
  select1(item) {
    // alert();
    this.selected1.push(item);
    this.serachModel.AppointmentTypeId = this.selected1[0].Id;
    this.appintmenttype = this.selected1[0].Name;
    // console.log('@@@@@@' + this.appintmenttype);
    this.filteredList1 = [];
  }
  // autocomplete location

  filter2() {
    this.locationtype = '';
    this.selected2 = [];
    this.filteredList2 = [];
    this.query2 = '';
    return this._appoinmentservice.getLocationtype().subscribe(res => {

      this.items2 = res.data;
      this.filteredList2 = this.items2.filter((el: any) => {
        return el; // .FirstName.toLowerCase().indexOf(this.query.toLowerCase()) > -1;
      });
    });
  }
  select2(item) {
    // this.selected2 = [];
    this.locationtype = '';
    // this.query2 = '';
    this.selected2.push(item);
    this.serachModel.Location = this.selected2[0].Id;
    this.locationtype = this.selected2[0].LocationName;
    //  console.log('@@@@@@' + this.locationtype);
    this.filteredList2 = [];
  }
  getBookedSlots(todaydate, lastdate, p, show) {
    console.log('radh');
    if (!this.prev) {
      this._appoinmentservice
        .getproviderBookedslots(
          moment(this.today, 'DD-MM-YYYY').format('DD-MMM-YYYY'),
          moment(this.lastDay, 'DD-MM-YYYY')
            .add(3, 'days')
            .format('DD-MMM-YYYY'),
          p.profile.Id
        )
        .subscribe(response => {
          this.Appointments = response.data;
          //  console.log(JSON.stringify(this.Appointments));
          this.getAvailableSlots(todaydate, lastdate, p, show);
        });
    } else {
      this._appoinmentservice
        .getproviderBookedslots(
          moment(this.today, 'DD-MM-YYYY').subtract(4, 'days').format('DD-MMM-YYYY'),
          moment(this.lastDay, 'DD-MM-YYYY')
            .add(3, 'days')
            .format('DD-MMM-YYYY'),
          p.profile.Id
        )
        .subscribe(response => {
          this.Appointments = response.data;
          console.log(JSON.stringify(this.Appointments));
          this.getAvailableSlots(todaydate, lastdate, p, show);
        });
    }
  }
  getAvailableSlots(todaydate, lastdate, p, show) {
    console.log(todaydate + ',' + lastdate);
    const excludeslottime = new Date();
    let slottimemorning: boolean;
    let slottimeafter: boolean;
    let slottimeevening: boolean;
    let availableSlots = [];
    p.emptySlots = [];
    // let dayend = lastdate;
    // dayend = dayend.setDate(dayend.getDate() + 1);
    // setTimeout(() => {
    let counter = 0;
    if (!this.prev) {
      for (let i = new Date(todaydate); i <= lastdate; i.setDate(i.getDate() + 1)) {
        slottimemorning = false;
        slottimeafter = false;
        slottimeevening = false;
        let weekdayname = i;
        console.log('for' + i);
        // console.log(p.profile.Settings.Workingdays, moment(i).format('dddd'));
        if (this.weekday(p.profile.Settings.Workingdays, moment(weekdayname).format('dddd'))) {
          counter++;
          if ((moment(excludeslottime, 'DD-MM-YYYY').isSame(i, 'day')) &&
            (moment(excludeslottime, 'DD-MM-YYYY').format('HH:MM') >= p.profile.Settings.MorningTo)) {
            slottimemorning = true;
          }
          if ((moment(excludeslottime, 'DD-MM-YYYY').isSame(i, 'day')) &&
            (moment(excludeslottime, 'DD-MM-YYYY').format('HH:MM') >= p.profile.Settings.AfternoonTo)) {
            // console.log(p.profile.Settings.AfternoonTo);
            slottimeafter = true;
          }
          if ((moment(excludeslottime, 'DD-MM-YYYY').isSame(i, 'day')) &&
            (moment(excludeslottime, 'DD-MM-YYYY').format('HH:MM') >= p.profile.Settings.EveningTo)) {
            slottimeevening = true;
          }
          // console.log(moment(excludeslottime, 'DD-MM-YYYY').isSame(i, 'day'));
          // console.log(moment(excludeslottime, 'DD-MM-YYYY').format('HH:MM') >= p.profile.Settings.AfternoonTo));
          // console.log(i + ',' + slottimemorning + ',' + slottimeafter + ',' + slottimeevening);
          // Morning(1), Afternoon(2), Evening(3)
          for (let j = 1; j <= 3; j++) {

            this.getTimeSlotsForDay(i, p.profile.Settings, j, slottimemorning, slottimeafter, slottimeevening).map(function (day) {
              // console.log();
              availableSlots.push({
                'Blocked': 'false', 'slotid': 0, 'SlotStatus': 'free',
                'fromtime': moment(day, 'DD-MM-YYYY').format('hh:mm A'),
                'totime': moment(day, 'DD-MM-YYYY').add(p.profile.Settings.interval, 'minute').format('hh:mm A'),
                'duration': p.profile.Settings.interval
              });
            });
          }
          p.emptySlots.push({
            date: moment(i, 'DD-MM-YYYY').format('DD-MM-YYYY'),
            Displaydate: moment(i, 'DD-MM-YYYY').format('DD-MMM-YYYY'),
            dayname: moment(i, 'DD-MM-YYYY').format('dddd'),
            slots: availableSlots
          });
          console.log(p);
          if (p.profile.Settings.DisableSlots === true && p.profile.Settings.AvailableDates !== '') {
            console.log('anuradha');
            let slotscounter = 0 ;
            for (let j = 0 ; j <= p.emptySlots.length - 1 ; j++) {
              console.log('qqqqq' + JSON.stringify(p.emptySlots[j]));
              if (p.emptySlots[j].slots.length === 0) {
                 console.log(slotscounter);
               slotscounter++;
              }
              if (slotscounter === 3) {
                console.log('radha111');
                this.availabledates = p.profile.Settings.AvailableDates.split(',');
                if (moment(moment(lastdate, 'DD-MM-YYYY').format('DD-MMM-YYYY')).
                isSameOrBefore(this.availabledates[this.availabledates.length - 1])) {
                let afteravailabledate: any;
                afteravailabledate = this.availabledates.filter(m => moment(m).isSameOrAfter(moment(lastdate, 'DD-MM-YYYY').
                format('DD-MMM-YYYY')));
                 if (afteravailabledate.length > 1) {
                  this.nextavailabilitydt = afteravailabledate[0];
                 }
                 console.log(this.nextavailabilitydt);
                }
              }
             }
            }
          availableSlots = [];
        } else {
          // if (this.prev === false) {
          // console.log(lastdate);
          lastdate.setDate(new Date(lastdate).getDate() + 1);
          // } else if (this.prev === true) {
          //   todaydate.setDate(todaydate.getDate() - 1);
          //   console.log(todaydate);
          //   // i = new Date(todaydate);
          //   console.log(i);
          // }
        }
        if (counter === 3) {
          // if (this.prev === false) {
          this.lastDay = new Date(lastdate);
          // } else if (this.prev === true && this.isPrevious === false) {

          //   this.lastDay = new Date(todaydate); console.log(this.lastDay);
          // }
          //  console.log(this.today + ',' + this.lastDay);
          setTimeout(() => {
            this.nextcount = 0;
            if (this.carosal.isControls != undefined) {
              this.carosal.isControls = true;
              }
          }, 1500);
          break;
        }
      }
    } else {
      let dt: any;
      dt = moment(lastdate, 'DD-MM-YYYY').subtract(1, 'days');
      todaydate = dt;
      // todaydate.setDate(new Date(lastdate).getDate() - 1);
      console.log(todaydate);
      for (let i = new Date(todaydate); i <= lastdate; i.setDate(i.getDate() - 1)) {
        slottimemorning = false;
        slottimeafter = false;
        slottimeevening = false;
        let weekdayname = i;
        console.log('for' + i);
        // console.log(p.profile.Settings.Workingdays, moment(i).format('dddd'));
        if (this.weekday(p.profile.Settings.Workingdays, moment(weekdayname).format('dddd'))) {
          counter++;
          if ((moment(excludeslottime, 'DD-MM-YYYY').isSame(i, 'day')) &&
            (moment(excludeslottime, 'DD-MM-YYYY').format('HH:MM') >= p.profile.Settings.MorningTo)) {
            slottimemorning = true;
          }
          if ((moment(excludeslottime, 'DD-MM-YYYY').isSame(i, 'day')) &&
            (moment(excludeslottime, 'DD-MM-YYYY').format('HH:MM') >= p.profile.Settings.AfternoonTo)) {
            // console.log(p.profile.Settings.AfternoonTo);
            slottimeafter = true;
          }
          if ((moment(excludeslottime, 'DD-MM-YYYY').isSame(i, 'day')) &&
            (moment(excludeslottime, 'DD-MM-YYYY').format('HH:MM') >= p.profile.Settings.EveningTo)) {
            slottimeevening = true;
          }
          // console.log(moment(excludeslottime, 'DD-MM-YYYY').isSame(i, 'day'));
          // console.log(moment(excludeslottime, 'DD-MM-YYYY').format('HH:MM') >= p.profile.Settings.AfternoonTo));
          // console.log(i + ',' + slottimemorning + ',' + slottimeafter + ',' + slottimeevening);
          // Morning(1), Afternoon(2), Evening(3)
          for (let j = 1; j <= 3; j++) {

            this.getTimeSlotsForDay(i, p.profile.Settings, j, slottimemorning, slottimeafter, slottimeevening).map(function (day) {
              // console.log();
              availableSlots.push({
                'Blocked': 'false', 'slotid': 0, 'SlotStatus': 'free',
                'fromtime': moment(day, 'DD-MM-YYYY').format('hh:mm A'),
                'totime': moment(day, 'DD-MM-YYYY').add(p.profile.Settings.interval, 'minute').format('hh:mm A'),
                'duration': p.profile.Settings.interval
              });
            });
          }
          // if (p.emptySlots.length > 0) {
          //   for (let a = 0; a <= p.emptySlots.length - 1; a++) {
          //     console.log(p.emptySlots[a].date + ',' + i);
          //     if ((moment(p.emptySlots[a].date, 'DD-MM-YYYY').isSame(i, 'day'))) {
          //       // p.emptySlots.splice(a, 1);
          //     } else {
          //       console.log('else' + i);
          //       p.emptySlots.push({
          //         date: moment(i, 'DD-MM-YYYY').format('DD-MM-YYYY'),
          //         Displaydate: moment(i, 'DD-MM-YYYY').format('DD-MMM-YYYY'),
          //         dayname: moment(i, 'DD-MM-YYYY').format('dddd'),
          //         slots: availableSlots
          //       });
          //       console.log(p);
          //       availableSlots = [];
          //       break;
          //     }
          //   }
          // } else {
          //   p.emptySlots.push({
          //     date: moment(i, 'DD-MM-YYYY').format('DD-MM-YYYY'),
          //     Displaydate: moment(i, 'DD-MM-YYYY').format('DD-MMM-YYYY'),
          //     dayname: moment(i, 'DD-MM-YYYY').format('dddd'),
          //     slots: availableSlots
          //   });
          //   console.log(p);
          //   availableSlots = [];
          // }

          p.emptySlots.push({
            date: moment(i, 'DD-MM-YYYY').format('DD-MM-YYYY'),
            Displaydate: moment(i, 'DD-MM-YYYY').format('DD-MMM-YYYY'),
            dayname: moment(i, 'DD-MM-YYYY').format('dddd'),
            slots: availableSlots
          });
          p.emptySlots = p.emptySlots.sort((a, b) => {
            console.log(a.date);
            let dateA: any;
            dateA = moment(a.date, 'DD-MM-YYYY');
            let dateB: any;
            dateB = moment(b.date, 'DD-MM-YYYY');
            // console.log(dateA - dateB);
            return dateA - dateB;
          });

          console.log(p);
          if (p.profile.Settings.DisableSlots === true && p.profile.Settings.AvailableDates !== '') {
            console.log('anuradha');
            let slotscounter = 0 ;
            for (let j = 0 ; j <= p.emptySlots.length - 1 ; j++) {
              console.log('qqqqq' + JSON.stringify(p.emptySlots[j]));
              if (p.emptySlots[j].slots.length === 0) {
                 console.log(slotscounter);
               slotscounter++;
              }
              if (slotscounter === 3) {
                console.log('radha111');
                this.availabledates = p.profile.Settings.AvailableDates.split(',');
                if (moment(moment(lastdate, 'DD-MM-YYYY').format('DD-MMM-YYYY')).
                isSameOrBefore(this.availabledates[this.availabledates.length - 1])) {
                let afteravailabledate: any;
                afteravailabledate = this.availabledates.filter(m => moment(m).isSameOrAfter(moment(lastdate, 'DD-MM-YYYY').
                format('DD-MMM-YYYY')));
                 if (afteravailabledate.length > 1) {
                  this.nextavailabilitydt = afteravailabledate[0];
                 }
                 console.log(this.nextavailabilitydt);
                }
              }
             }
            }
          availableSlots = [];
        } else {
          // if (this.prev === false) {
          //   // console.log(lastdate);
          //   lastdate.setDate(new Date(lastdate).getDate() + 1);
          // } else if (this.prev === true) {
          //   // todaydate.setDate(todaydate.getDate() - 1);
          //   // console.log(todaydate);
          //   // // i = new Date(todaydate);
          //   // console.log(i);
          // }
        }
        if (counter === 3) {
          // if (this.prev === false) {
          //   this.lastDay = new Date(lastdate);
          // } else if (this.prev === true && this.isPrevious === false) {

          this.today = new Date(i); console.log(this.today);
          // p.emptySlots = p.emptySlots.sort((a: EmptySlotsModel, b: EmptySlotsModel) => {
          //   return new Date(a.date).getTime() < new Date(b.date).getTime();
          // });
          // console.log(p.emptySlots);
          // }
          //  console.log(this.today + ',' + this.lastDay);
          setTimeout(() => {
            this.previouscount = 0;
            if (this.carosal.isControls != undefined) {
              this.carosal.isControls = true;
              }
          }, 1000);
          break;
        }
      }
    }
    // close for
    // this.Appointments = [];
    for (let s = 0; s <= this.appointmentsModel.length - 1; s++) {
      if (show) {
        this.appointmentsModel[s].showProviderDetails = this.appointmentsModel[s].profile.Id === p.profile.Id ? true : false;
      } else {
        this.appointmentsModel[s].showProviderDetails = false;
      }
    }

  }
  //  delay(milliseconds: number) {
  //   return new Promise<void>(resolve => {
  //       setTimeout(resolve, milliseconds);
  //   });
  close() {
    // this.locationtype = '';
    // this.appintmenttype = '';
    this.modal.DOB = '';
    // this.serachModel = new SearchModel();
    this.followupUserPost = new FollowUpUser();
    this.getProviderInfo('search');
    this._personcomponent.Popupopenclose('close');
  }
  myFunction(event) {
    // alert(event.target.value);
    if (this.selected1.length === 0 && this.filteredList1.length > 0) {

      for (let i = 0; i <= this.filteredList1.length - 1; i++) {
        if (this.filteredList1[i].Name.toLowerCase() === this.query1.toLowerCase()) {
          this.appintmenttype = this.filteredList1[i].Name;
          this.serachModel.AppointmentTypeId = this.filteredList1[i].Id;
          // console.log(this.serachModel.AppointmentTypeId+','+this.filteredList1[i].Id);
        }
      }
      // this.filteredList1 = [];
    }
    // console.log(this.selected2 +','+ this.query2);
    if (this.selected2.length === 0 && this.filteredList2.length > 0) {
      // alert(this.query2);
      for (let i = 0; i <= this.filteredList2.length - 1; i++) {
        if (this.filteredList2[i].LocationName.toLowerCase() === this.query2.toLowerCase()) {
          this.locationtype = this.filteredList2[i].LocationName;
          this.serachModel.Location = this.filteredList2[i].Id;
        }
      }
      // console.log(this.serachModel.Location);
    }
    this.filteredList1 = [];
    this.filteredList2 = [];
  }
  weekday(providerweekdays, splitday) {
    // console.log(providerweekdays.split(','));
    let sts: boolean;
    // if (providerweekdays !== '' || providerweekdays != null || providerweekdays !== 'null') {
    let str_array = providerweekdays.split(',');
    for (let i = 0; i < str_array.length; i++) {
      // console.log(splitday +','+ str_array[i]) ;
      if (str_array[i] === splitday) {
        sts = true;
        break;
      } else {
        sts = false;
      }
    } // close for
    // } else {
    //   sts = false;
    // }
    return sts;
  }

  viewprofile(Id, img) {
    // app-schedulerlogin-viewprofile
    // console.log(this.birthdate);
    // localStorage.setItem('profileproviderId', id);
    // localStorage.setItem('profileInfo', JSON.stringify(profile));


    this.viewprams = {
      'providerId': JSON.stringify(Id),
      'image': img,
      'AppointmentTypeId': this.serachModel.AppointmentTypeId,
      'Location': this.serachModel.Location,
      'ScheduleDate': this.serachModel.ScheduleDate
    }
    //   alert(JSON.stringify(navigation));
    // this.router.navigate(['./provider-profile',navigation]);
    this.schedulerloginnav = true;
    this.schedulerloginnav1 = false;

    // this.router.navigate(['./provider-profile'], navigation);
  }
  @HostListener('document:click', ['$event'])
  handleClick(event) {
    // alert(event.target.id);
    const clickedComponent = event.target.tagName;
    if (event.target.id !== 'location') {
      this.filteredList2 = [];
    }
    if (event.target.id !== 'appointment') {
      this.filteredList1 = [];
    }
    // let clickedComponent = event.target;
    // let inside = false;
    // console.log(clickedComponent);
    // console.log(this.elementRef.nativeElement);
    // do {
    //     if (clickedComponent === this.elementRef.nativeElement) {
    //         inside = true;
    //     }
    //    clickedComponent = clickedComponent.parentNode;
    // } while (clickedComponent);
    //  if (!inside) {
    //      this.filteredList2 = [];
    //  }
  }
  onKey(event) {
    if (this.filteredList1.length === 0) {
      this.filter1();
    }
    if (this.selected1.length === 0 && this.filteredList1.length > 0) {
      for (let i = 0; i <= this.filteredList1.length - 1; i++) {
        if (
          this.filteredList1[i].Name.toLowerCase() === this.query1.toLowerCase()
        ) {
          this.appintmenttype = this.filteredList1[i].Name;
          this.serachModel.AppointmentTypeId = this.filteredList1[i].Id;
          // console.log(this.serachModel.AppointmentTypeId+','+this.filteredList1[i].Id);
        }
      }
      // this.filteredList1 = [];
    }
    // console.log(this.selected2 +','+ this.query2);
    if (this.selected2.length === 0 && this.filteredList2.length > 0) {
      // alert(this.query2);
      for (let i = 0; i <= this.filteredList2.length - 1; i++) {
        if (
          this.filteredList2[i].LocationName.toLowerCase() ===
          this.query2.toLowerCase()
        ) {
          this.locationtype = this.filteredList2[i].LocationName;
          this.serachModel.Location = this.filteredList2[i].Id;
        }
      }
      // console.log(this.serachModel.Location);
    }
    if (event.target.id === 'location') {
      this.filteredList2 = [];
    }
    if (event.target.id === 'appointment') {
      this.filteredList1 = [];
    }
  }
  LoginEvent(obj) {
    if (obj.type === 'fomeProviderProfile') {
      this.schedulerloginnav = false;
      this.schedulerloginnav1 = true;
      this.getInfo();
    }
  }

// Rating Popup post data
rating:number;
onClick(rating: number,providerid:number): void {
  //  alert(rating);
  this.rating = rating;
  let abc={'rating':rating,'providerid':providerid};
  // this.ratingClick.emit({
  //     itemId: this.itemId,
  //     rating: rating
  // });
  this.ratingComponetClick(abc);
}
  ratingComponetClick(clickObj: any): void {
    
    console.log(clickObj);
    this.disabled = true;
    var item = this.appointmentsModel.filter((item: any) => item.profile.Id === clickObj.providerid);
    if (!!item && item.length === 1) {
     
      item[0].profile.Settings.Rating = clickObj.rating;
      this.ratingClicked = clickObj.rating;
      this.itemIdRatingClicked = clickObj.providerid;
      let date1 = new Date()
      const fromdt = this.datepipe.transform(date1, 'dd/MMM/yyyy');
      this.ratingmodel.PersonId = this.patientid;
      this.ratingmodel.ProviderId = this.itemIdRatingClicked;
      this.ratingmodel.Rating = this.ratingClicked;
      this.ratingmodel.CreatedBy = this.patientid;
      this.ratingmodel.CreatedOn = fromdt + ' ' + date1.getHours() +
        ':' + date1.getMinutes() + ':' + date1.getSeconds();
      console.log("Ratting model post"+JSON.stringify(this.ratingmodel))
      this._appoinmentservice.ratingPost(this.ratingmodel).subscribe(
        res => {
          // console.log((JSON.stringify(res)));
          if (res.Success==true) {
           this.getProviderInfo('session');
           // tslint:disable-next-line:radix
           this.windowWidth = parseInt( localStorage.getItem('windowWidth'));
           if (this.windowWidth < 1270) {
              this._personcomponent.Popupopenclose('close');
           }
          }
        },
        err => console.log(err)
      );
      this.ratting.hide();
    }
  }
  Toclear() {
    // tslint:disable-next-line:radix
    this.windowWidth = parseInt( localStorage.getItem('windowWidth'));
    if (this.windowWidth < 1270) {
     // alert();
       this._personcomponent.Popupopenclose('close');
    }
  }
  ngAfterViewInit() {
    if (!this.isshowrating==true && this.counter==1) {
    this.ratting.show();
          // tslint:disable-next-line:radix
    this.windowWidth = parseInt( localStorage.getItem('windowWidth'));
    if (this.windowWidth < 1270) {
       this._personcomponent.Popupopenclose('open');
    }
  }
}
 /** Toast messages for success and failure */
 success(successmsg) {
}
error(errormsg) {
  this._toast.ShowAlert(errormsg, '', 'Error');
}
}
