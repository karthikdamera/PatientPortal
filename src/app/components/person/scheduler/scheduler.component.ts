import {
  Component,
  OnInit,
  ViewContainerRef,
  Input,
  ViewChild,
  ElementRef,
  HostListener
} from '@angular/core';
import { Routes, Router, Params, ActivatedRoute, RoutesRecognized, NavigationExtras } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Toast } from 'ng2-toastr/src/toast';
import { DatePipe } from '@angular/common';
import {
  FormGroup,
  FormBuilder,
  Validators,
  FormControl
} from '@angular/forms';
import { ValidationService } from '../../../shared/validation/validation.service';
import { ValidationComponent } from '../../../shared/validation/validation.component';
import { Appointments, SearchModel } from '../../../models/appointments.model';
import * as moment from 'moment';
import { SchedulerService } from './scheduler.service';
import { PharmacyService } from '../pharmacy/pharmacy.service';

import {
  RegistrationModel,
  FollowUpUser,
  sessionenum
} from './../../../models/person-slot.model';
import {
  INgxMyDpOptions,
  IMyInputFieldChanged,
  IMyDate,
  IMyDateModel
} from 'ngx-mydatepicker';
import { NgxMyDatePickerDirective } from 'ngx-mydatepicker';
import { UnMaskedData } from '../../../shared/services/unmaskdata';
import { MaskedDate } from '../../../shared/services/datemask';
import { Observable } from 'rxjs/Observable';
import { FilterPipe } from '../../../shared/services/FilterPipe';
import { TenantResponse } from '../../../models/tenant.model';
import { AuthService } from '../../../auth/auth.service';
import { ToastService } from '../../../shared/services/toastService';
import { CarouselModule } from 'angular-bootstrap-md';
import { CarouselComponent } from 'angular-bootstrap-md';

@Component({
  moduleId: module.id,
  selector: 'app-scheduler',
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.scss'],
  providers: [DatePipe, SchedulerService, PharmacyService, AuthService, ToastService ,ToastsManager]
})
export class SchedulerComponent implements OnInit {
  @ViewChild('carouselRef') carosal: CarouselComponent;
  @ViewChild('schdate') schngxdp: NgxMyDatePickerDirective;
  @ViewChild('DOB') dobngxdp: NgxMyDatePickerDirective;
  @ViewChild('sortdate') sortngxdp: NgxMyDatePickerDirective;
  @ViewChild('Birthdate') birthngxdp: NgxMyDatePickerDirective;
  Appointments = [];
  tenantData: TenantResponse;
  today = new Date();
  lastDay: any; // new Date(today);
  appointmentsModel: Array<Appointments>;
  private _rootViewContainerRef: ViewContainerRef;
  // fromtime: string;
  // totime: string;
  emailvalid: boolean;
  queryprovider: any;
  date: Date = new Date();
  fromdateDisplay: any;
  todateDisplay: any;
  location: number;
  birthdate: string;
  appointmenttype: any;
  isPrevious: boolean;
  prevnext: boolean;
  prev: boolean;
  // tenantData: TenantResponse;
  // REGISTARTION
  stateNames: any = [];
  regModel: RegistrationModel;
  followupUserPost: FollowUpUser;
  unmask = UnMaskedData;
  phonests: boolean;
  enterdatests: boolean;
  validdate: Boolean = false;
  providerName: string;
  imageUrl: string;
  queryobj = {locationid: 0 , providerid: 0};
  serviceType: string;
  dateMask = MaskedDate;
  modal: any = {
    DOB: '', sortdate: '', Birthdate: '',
    schdate: ''
  };
  userForm: FormGroup;
  message: string;
  successmessage: boolean;
  patientData: any;
  session: string;
  loading: boolean;
  sessionsts: boolean;
  sessionenum: sessionenum;
  sessionnames: any = [];
  providerId: number;
  sortdatests: boolean;
  LeadGuid: string;
  searchsts: boolean;
  errorstatus: boolean;
  postDateFormat = 'MM/dd/yyyy';
  // auto complete
  public filteredList1 = [];
  public selected1 = [];
  public query1 = '';
  items1: any = [];
  allTestimonials: any = {};
  ourallTestimonials: any = [];
  allNews: any = [];
  appintmenttype: string;
  schedulests: boolean;
  // appintmenttypeId: number;
  // auto complete location
  public filteredList2 = [];
  public selected2 = [];
  public query2 = '';
  items2: any = [];
  tendata = {};
  locationtype: string;
  serachModel: SearchModel;
  aftersuccesshide: boolean;
  nextcount: number;
  previouscount: number;
  ratingpopup:boolean;
  ratingpopup1:boolean;
  availabledates = [];
  nextavailabilitydt: string;
  myDOBOptions: INgxMyDpOptions = {
    // other options...
    dateFormat: 'mm/dd/yyyy',
    firstDayOfWeek: 'mo',
    markCurrentDay: true,
    disableHeaderButtons: true,
    disableSince: {
      year: this.date.getFullYear(),
      month: this.date.getMonth() + 1,
      day: this.date.getDate()
    },
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
    disableUntil: {
      year: this.date.getFullYear(),
      month: this.date.getMonth() + 1,
      day: this.date.getDate() - 1
    },
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
    disableUntil: {
      year: this.date.getFullYear(),
      month: this.date.getMonth() + 1,
      day: this.date.getDate() - 1
    },
    // disableSince: { year: this.date.getFullYear(), month: this.date.getMonth() + 1, day: this.date.getDate() + 30 },
    selectorHeight: '232px',
    selectorWidth: '250px'
  };
  schedular:boolean;
  myOptions: INgxMyDpOptions = {
    // other options...
    dateFormat: 'mm/dd/yyyy',
    firstDayOfWeek: 'mo',
    markCurrentDay: true,
    disableHeaderButtons: true,
    disableSince: {
      year: this.date.getFullYear(),
      month: this.date.getMonth() + 1,
      day: this.date.getDate()
    },
    selectorHeight: '232px',
    selectorWidth: '250px'
  };
  public elementRef;
  locationquery: number;
  providerquery: number;
  ratingClicked: number;
 itemIdRatingClicked: number;
  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    public toastr: ToastsManager, vRef: ViewContainerRef,
    public datepipe: DatePipe,
    public _appoinmentservice: SchedulerService,
    private _pharmacyReferralService: PharmacyService, private authservice: AuthService,
    private activatedRoute: ActivatedRoute,
    myElement: ElementRef,
    private _toast: ToastService
  ) {
    this.schedular=false;
    this.loading = false;
    // if (window.location.pathname === '/scheduler') {
    //   localStorage.clear();
    // }
   
    this.appointmentsModel = new Array<Appointments>();
    this._rootViewContainerRef = vRef;
    this.tenantData = new TenantResponse();
    this.LeadGuid = '';
    this.regModel = new RegistrationModel();
    this.followupUserPost = new FollowUpUser();
    this.isPrevious = false;
    this.phonests = false;
    this.providerName = '';
    this.serviceType = '';
    this.location = 0;
    this.appintmenttype = '';
    this.message = '';
    this.emailvalid = false;
    this.imageUrl = '';
    this.session = 'AnyTime';
    this.successmessage = false;
    this.aftersuccesshide = false;
    this.sessionsts = false;
    this.providerId = 0;
    this.sortdatests = false;
    this.appintmenttype = '';
    this.searchsts = false;
    // this.appintmenttypeId = 0;
    this.locationtype = '';
    this.errorstatus = false;
    this.schedulests = false;
    this.prev = false;
    this.ratingpopup=true;
    this.ratingpopup1=true;
    this.serachModel = new SearchModel();
    this.elementRef = myElement;
   this.nextcount = 0;
   this.previouscount = 0;
   this.nextavailabilitydt = '';
    this.userForm = this.formBuilder.group({
      Birthdate: [''],
      FirstName: [
        '',
        Validators.required,
        ValidationService.alphabeticsValidator
      ],
      LastName: [
        '',
        Validators.required,
        ValidationService.alphabeticsValidator
      ],
      Email: ['', Validators.required, ValidationService.emailValidator],
      PhoneNo: ['', Validators.required],
      Address: [''],
      Address2: [''],
      City: [''],
      State: [''],
      Zipcode: [
        '',
        [Validators.required, Validators.minLength(5), Validators.maxLength(5)],
        ValidationService.numericalsValidatorFromone
      ],
      Message: [''],
      Age: ['']
    });
    for (let i = 0; i < 3; i++) {
      this.sessionnames.push(sessionenum[i]);
    }
    this.activatedRoute.queryParams.subscribe(params => {
      if (!params['LocationName']) {
    setTimeout(() => {
      const email = this.activatedRoute.snapshot.queryParamMap.get('em');
      if (email != '' && email != undefined && email != null) {
        this.regModel.FirstName = this.activatedRoute.snapshot.queryParamMap.get('fn');
        this.regModel.LastName = this.activatedRoute.snapshot.queryParamMap.get('ln');
        this.regModel.Email = this.activatedRoute.snapshot.queryParamMap.get('em');
        this.regModel.PhoneNo = this.activatedRoute.snapshot.queryParamMap.get('pn');
        this.regModel.DOB = this.activatedRoute.snapshot.queryParamMap.get('dob');
        this.regModel.Zipcode = this.activatedRoute.snapshot.queryParamMap.get('zc');
        this.regModel.Message = this.activatedRoute.snapshot.queryParamMap.get('co');
        this.regModel.LocationId = this.activatedRoute.snapshot.queryParamMap.get('lc');
        this.regModel.ProviderId = this.activatedRoute.snapshot.queryParamMap.get('pr');
        this.serachModel.ProviderId = this.activatedRoute.snapshot.queryParamMap.get('pr');
      //  alert( this.serachModel.ProviderId);
        this.regModel.Age = this.activatedRoute.snapshot.queryParamMap.get('age');
        // console.log(JSON.stringify(this.regModel));
        this._appoinmentservice
          .postleads(this.regModel)
          .subscribe(res => {
            this.LeadGuid = res.data;
          });
      }
      let appoinmnetid: any;
      let locationid: any;
      const tenantData = localStorage.getItem('TenantData');
      // alert(tenantData);
      const prId = this.activatedRoute.snapshot.queryParamMap.get('pr');
      const lcId = this.activatedRoute.snapshot.queryParamMap.get('lc');
      if (tenantData == null ) {
        let _tenantData = new TenantResponse();
        this.authservice.TenantDetails().subscribe(res => {
          console.log(res.data);
          if (res.Success) {
            _tenantData.OrganisationSettings = res.data.OrgSettings;
            _tenantData.SliderSettings = res.data.SliderSettings;
            _tenantData.ImagesUrl = res.data.ImagesUrl;
            _tenantData.Domain = res.data.Domain;
            // console.log(window.location.hostname);
            // setTimeout(() => {
            localStorage.setItem('TenantData', JSON.stringify(_tenantData));
            // localStorage.setItem('imgurl', ImagesUrl);
            // localStorage.setItem('Domaindata', Domain);
            // }, 2000);
            this.tenantData = _tenantData;
            // console.log(this.tenantData);
            this.appintmenttype = this.tenantData.OrganisationSettings.DefaultAppointmentTypeName;
            appoinmnetid = this.tenantData.OrganisationSettings.DefaultAppointmentTypeId;
            this.serachModel.AppointmentTypeId = appoinmnetid;

            if (prId != '' && prId != undefined && prId != null) {
              this.serachModel.ProviderId = (prId != '' && prId != undefined && prId != null) ? parseInt(prId, 2) : 0;
              this.serachModel.Location = (lcId != '' && lcId != undefined && lcId != null) ? lcId : '0';
              this.setLocation(lcId);
            } else {
              this.locationtype = this.tenantData.OrganisationSettings.DefaultLocationName;
              locationid = this.tenantData.OrganisationSettings.DefaultLocationId;
              this.serachModel.Location = locationid;
            }
            this.getProviderInfo('search', '');
          } else {
            _tenantData = new TenantResponse();
          }
        });
      } else if (tenantData !== null && tenantData !== '') {
        this.tenantData = JSON.parse(tenantData) as TenantResponse;
        // console.log(this.tenantData);
        this.appintmenttype = this.tenantData.OrganisationSettings.DefaultAppointmentTypeName;
        appoinmnetid = this.tenantData.OrganisationSettings.DefaultAppointmentTypeId;
        this.serachModel.AppointmentTypeId = appoinmnetid;

        if (prId != '' && prId != undefined && prId != null) {
          this.serachModel.ProviderId = (prId != '' && prId != undefined && prId != null) ? parseInt(prId, 2) : 0;
          this.serachModel.Location = (lcId != '' && lcId != undefined && lcId != null) ? lcId : '0';
          this.setLocation(lcId);
        } else {
          this.locationtype = this.tenantData.OrganisationSettings.DefaultLocationName;
          locationid = this.tenantData.OrganisationSettings.DefaultLocationId;
          this.serachModel.Location = locationid;
        }
        if (params['em']) {
          this.getProviderInfo('search', 'load');
        } else {
          this.getProviderInfo('search', '');
        }
      } else {

      }
    }, 1000);
  }
});
    // let date = new Date();+
    // console.log(JSON.stringify(this.regModel));
    // this.activatedRoute.queryParams.subscribe(params => {
    //   if (params['LocationName']) {
    //      this.locationtype = params['LocationName'];
    //      this.appointmenttype = params['AppointmentName'];
    //      this.serachModel.ProviderId = params['ProviderId'];
    //      console.log('back button');
    //      console.log(this.locationtype + ',' + this.appointmenttype);
    //      this.serachModel.AppointmentTypeId = this.appointmenttype;
    //      this.serachModel.Location = this.locationtype;
    //      this.serachModel.today = moment(new Date, 'MM/DD/YYYY').format('MM/DD/YYYY');
    //      this.serachModel.ScheduleDate = moment(
    //       this.serachModel.today,
    //       'MM/DD/YYYY'
    //     ).format('DD/MMM/YYYY');
    //      this.getProviderInfo('search');
    //   }
    // });
    this.activatedRoute.queryParams.subscribe(params => {
      if (params['LocationName']) {
        if ((params['queryproviderid'] != 0 && params['queryproviderid'] != undefined ) &&
         (params['querylocation'] != 0 && params['querylocation'] != undefined) ){
          this.queryprovider = params['queryproviderid'];
          this.serachModel.Location = params['querylocation'];
          console.log( this.serachModel.ProviderId + ',' + this.serachModel.Location);
        } else {
        this.serachModel.Location  = params['LocationName'];
        console.log(this.serachModel.Location);
        }
        this.serachModel.AppointmentTypeId = params['AppointmentName'];
        // this.serachModel.ProviderId = params['ProviderId'];
        this.query2 = params['LocationNAME'];
       this.query1 =  params['AppointmentNAME'];
       this.locationtype = params['LocationNAME'];
       this.appintmenttype = params['AppointmentNAME'];
       this.queryobj.locationid = params['querylocation'];
       this.queryobj.providerid = params['queryproviderid'];
      // this.serachModel.Location = params['querylocation'];
         console.log('back button');
        // alert( this.locationtype + ',' +  this.appointmenttype);
         console.log(this.locationtype + ',' + this.appointmenttype);
        //  this.serachModel.AppointmentTypeId = this.appointmenttype;
        //  this.serachModel.Location = this.locationtype;
         this.serachModel.today = moment(new Date, 'MM/DD/YYYY').format('MM/DD/YYYY');
         this.serachModel.ScheduleDate = moment(
          this.serachModel.today,
          'MM/DD/YYYY'
        ).format('DD/MMM/YYYY');
         if ((params['queryproviderid'] != 0 && params['queryproviderid'] != undefined ) &&
         (params['querylocation'] != 0 && params['querylocation'] != undefined) ) {
          this.getProviderInfo('search', 'queryprovider');
         } else {
          this.getProviderInfo('search', '');
         }
      }
    });
  }
  setLocation(lcId) {
    this.locationtype = '';
    this.selected2 = [];
    this.filteredList2 = [];
    this.query2 = '';
    this._appoinmentservice.getLocationtype().subscribe(res => {
      this.items2 = res.data;
      this.locationtype = this.items2.filter(m => m.Id == lcId).length > 0 ?
        this.items2.filter(m => m.Id == lcId)[0].LocationName : '';
    });
  }
  ngOnInit() {
    // this.getProviderInfo();
    this.toastr.setRootViewContainerRef(this._rootViewContainerRef);
    this.getStateNames(231);
    this.getOurTestimonials();
    this.serachModel.today = moment(new Date, 'MM/DD/YYYY').format('MM/DD/YYYY');
    this.modal.schdate = this.serachModel.today;
    // alert(this.modal.DOB);
    this.serachModel.ScheduleDate = moment(
      this.serachModel.today,
      'MM/DD/YYYY'
    ).format('DD/MMM/YYYY');
    //   this.activatedRoute.queryParams.subscribe(params => {
    //   if (params['LocationName']) {
    //      this.locationtype = params['LocationName'];
    //      this.appointmenttype = params['AppointmentName'];
    //     // this.serachModel.ProviderId = params['ProviderId'];
    //     this.query2 = params['LocationNAME'];
    //    this.query1 =  params['AppointmentNAME'];
    //      console.log('back button');
    //      alert( this.locationtype + ',' +  this.appointmenttype);
    //      console.log(this.locationtype + ',' + this.appointmenttype);
    //      this.serachModel.AppointmentTypeId = this.appointmenttype;
    //      this.serachModel.Location = this.locationtype;
    //      this.serachModel.today = moment(new Date, 'MM/DD/YYYY').format('MM/DD/YYYY');
    //      this.serachModel.ScheduleDate = moment(
    //       this.serachModel.today,
    //       'MM/DD/YYYY'
    //     ).format('DD/MMM/YYYY');
    //      this.getProviderInfo('search');
    //   }
    // });
  }
  viewprofile(Id, img) {
    // console.log(this.birthdate);
    // localStorage.setItem('profileproviderId', id);
    // localStorage.setItem('profileInfo', JSON.stringify(profile));
   // alert(this.locationtype + ',' + this.appintmenttype );
   if (this.queryobj.locationid != 0 && this.queryobj.providerid != 0) {
     this.locationquery = this.queryobj.locationid;
    this.providerquery = this.queryobj.providerid;
   } else {
    this.locationquery = this.queryobj.locationid;
    this.providerquery = this.queryobj.providerid;
   }
    let navigation: NavigationExtras = {
      queryParams: {
        'ChangeSlotId': JSON.stringify(Id),
        'image': img,
        'AppointmentTypeId': this.serachModel.AppointmentTypeId,
        'Location': this.serachModel.Location,
        'ScheduleDate': this.serachModel.ScheduleDate,
        'AppointmentName': this.appintmenttype,
        'LocationName': this.locationtype,
        'querylocation': this.locationquery,
        'queryproviderid': this.providerquery
      },
      skipLocationChange: true
    };
   // alert(JSON.stringify(navigation));
    //   alert(JSON.stringify(navigation));
    // this.router.navigate(['./provider-profile',navigation]);
    this.router.navigate(['./provider-profile'], navigation);
  }
  getProviderInfo(type, load) {
    this.nextavailabilitydt = '';
    this.serachModel.ProviderId = null;
    console.log(this.providerId + ',' + this.sessionsts + ',' + type);
    this.searchsts = true;
    this.appointmentsModel = [];
    if (type === 'session') {
      this.ratingpopup=false;
     }
    if (type === 'search') {
      this.ratingpopup1=false;
      this.session = 'AnyTime';
      this.sessionsts = false;
    }
    if (load === 'load') {
     this.serachModel.Location = this.regModel.LocationId;
     this.queryobj.locationid = this.regModel.LocationId;
     this.serachModel.ProviderId = this.regModel.ProviderId;
     this.queryobj.providerid = this.regModel.ProviderId;
    } else if (load === 'queryprovider') {
      this.serachModel.ProviderId = this.queryprovider;
     // this.serachModel.Location = this.regModel.LocationId;
    }
    if (load === '' || load === 'searchbtn') {
    //  this.serachModel.Location = this.regModel.LocationId;
      this.serachModel.ProviderId = null;
      this.queryobj.locationid = 0;
      this.queryobj.providerid = 0;
    }
   // alert( this.serachModel.ProviderId);
    return this._appoinmentservice
      .getproviderslotsInfo(this.serachModel)
      .subscribe(res => {
        
        if (this.sessionsts === true) {
           console.log(this.lastDay);
          this.today = new Date(this.today);
        }
        this.appointmentsModel = res.data;
        console.log(this.appointmentsModel);
        let counter = 0;
        
        for (let p = 0; p <= this.appointmentsModel.length - 1; p++) {
        
          console.log(Math.round(this.appointmentsModel[p].profile.Settings.Rating));
          this.appointmentsModel[p].profile.Settings.Rating=Math.round(this.appointmentsModel[p].profile.Settings.Rating);
          this.appointmentsModel[p].showProviderDetails = p == 0 ? true : false;
          this.lastDay = new Date(this.today);
          // alert(this.today + ',' + this.lastDay);
          this.lastDay.setDate(this.today.getDate() + 3);
          // console.log(this.lastDay);
          if (counter === 0 && !this.sessionsts && !this.sortdatests) {
            this.pushProviderSlots(this.appointmentsModel[p], p, true, false);
            //  this.sessionsts = false;
          } else if (this.appointmentsModel[p].profile.Id === this.providerId) {
            //  console.log('radha');
            this.pushProviderSlots(this.appointmentsModel[p], p, true, false);
           //   break;
          }
          counter++;
        }

        // console.log(this.appointmentsModel);
      });
  }
  pushProviderSlots(p, currentIndex, show, collapsiblests) {

    this.nextavailabilitydt = '';
     console.log(this.today);
    this.providerId = p.profile.Id;
    // console.log(p);
    if (this.schedulests === true && collapsiblests === true) {
      console.log('schedulests');
      this.today = new Date(this.modal.schdate);
      console.log(this.today);
      if (this.today.toString() == 'Invalid Date') {
        // alert(JSON.stringify(this.modal.schdate));
        this.today = new Date(this.modal.schdate.formatted);
        // alert(this.today);
      }
      console.log(this.today);
      //   console.log(this.today);
      this.lastDay = new Date(this.today);
      console.log(this.lastDay);
      this.lastDay.setDate(this.today.getDate() + 3);
      console.log(this.lastDay);
    }
    if (this.sortdatests === true && collapsiblests === true) {
      // console.log('sortdatests');
      // collapsiblests = false;
      // console.log(this.modal.sortdate);
      this.today = new Date(this.modal.sortdate);
      console.log(this.today);
      //   console.log(this.today);
      this.lastDay = new Date(this.today);
      console.log(this.lastDay);
      this.lastDay.setDate(this.today.getDate() + 3);
      console.log(this.lastDay);
    }
    if (
      collapsiblests === true &&
      this.sortdatests === false &&
      this.schedulests === false
    ) {
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
          // console.log(moment(date, 'DD-MM-YYYY').format('h:mm A') + ',' +
          //   moment(date, 'DD-MM-YYYY').add(interval, 'minute').format('h:mm A') + ',' +
          //   moment(momentfromtime, 'DD-MM-YYYY').format('h:mm A') + ',' +
          //   moment(momenttotime, 'DD-MM-YYYY').format('h:mm A') + ',' + 'end time diff-->' + totimediff);
          if ((moment(moment(date, 'DD-MM-YYYY').format('h:mm A'), 'h:mm A').
            isBefore(moment(moment(momentfromtime, 'DD-MM-YYYY').format('h:mm A'), 'h:mm A')))
            && (diff < interval) &&
            (totimediff >= 0)) {
            // console.log('slot from < booked frrom time & slot  and booked from timee diff < interval & slot endtime>0 -->'
            //   + moment(date, 'DD-MM-YYYY').format('h:mm A'));
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
            // console.log('slot fromtime same and totime greater than to booked totime -->' + moment(date, 'DD-MM-YYYY').format('h:mm A'));
            if (totimediff > 0) {
              date.setHours(currentDateBookedSlots.Slots[i].totime24.split(':')[0],
                currentDateBookedSlots.Slots[i].totime24.split(':')[1], 0, 0);
              this.checkSlotConflict(date, interval, enddaydate);
            } else if (totimediff === 0) {
              hasConflict = true;
            }
          }
          // else if ((moment(moment(date, 'DD-MM-YYYY').format('h:mm A'), 'h:mm A').
          // isSameOrAfter(moment(moment(momentfromtime, 'DD-MM-YYYY').format('h:mm A'), 'h:mm A'))) &&
          // (moment(moment(date, 'DD-MM-YYYY').format('h:mm A'), 'h:mm A').
          // isSameOrBefore(moment(moment(momenttotime, 'DD-MM-YYYY').format('h:mm A'), 'h:mm A'))) && (totimediff >= 0)) {
          //   if (totimediff > 0) {
          //     date.setHours(currentDateBookedSlots.Slots[i].totime24.split(':')[0],
          //       currentDateBookedSlots.Slots[i].totime24.split(':')[1], 0, 0);
          //     this.checkSlotConflict(date, interval, enddaydate);
          //   } else if (totimediff === 0) {
          //     hasConflict = true;
          //   }
          // } 
          else if (moment(moment(date, 'DD-MM-YYYY').format('h:mm A'), 'h:mm A').
            isSameOrAfter(moment(moment(momentfromtime, 'DD-MM-YYYY').format('h:mm A'), 'h:mm A')) &&
            moment(moment(date, 'DD-MM-YYYY').add(interval, 'minute').format('h:mm A'), 'h:mm A').
              isSameOrBefore(moment(moment(momenttotime, 'DD-MM-YYYY').format('h:mm A'), 'h:mm A')) && (totimediff >= 0)) {
            // console.log('between slot from time >= and slot totime <=  -->' + moment(date, 'DD-MM-YYYY').format('h:mm A'));
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
    // if ((startHr != 0 && endHr != 0) && (startHr != null && endHr != null)) {
      // if (moment(moment(dayStart, 'YYYY-MM-DD').format('YYYY-MM-DD')).isBefore(moment(new Date(), 'YYYY-MM-DD').format('YYYY-MM-DD'))) {
      //   // console.log(moment(dayStart) + ',' +  moment(new Date()));
      //   console.log('anu');
      //   return timeSlots;
      // }
      if (((settings.DisableSlots && settings.AvailableDates !== ''
        && settings.AvailableDates.includes(moment(dayStart, 'YYYY-MM-DD').format('DD-MMM-YYYY'))))
        || (settings.DisableSlots == false && ((startHr != 0 && endHr != 0) && (startHr != null && endHr != null)))) {
        if (moment(moment(dayStart, 'YYYY-MM-DD').format('YYYY-MM-DD')).isBefore(moment(new Date(), 'YYYY-MM-DD').format('YYYY-MM-DD')) || 
        (moment(new Date()).add(settings.EndInDays, 'days').isBefore(dayStart, 'day'))) {
          // console.log(moment(dayStart) + ',' +  moment(new Date()));
          // console.log('anu');
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
        // const todaytime = dayStart;
// console.log(moment(new Date(), 'DD-MM-YYYY').isSame(dayStart, 'day')+','+ moment(dayStart) +','+ moment(new Date()))
        if (!this.checkSlotConflict(dayStart, settings.interval, dayEnd)) {
          let diff = (dayEnd.getTime() - dayStart.getTime()) / 1000;
          diff /= 60;
          diff = Math.abs(Math.round(diff));
          // console.log(diff);
          if ((diff > settings.interval) || (diff === settings.interval)) {
            if ((moment(new Date(), 'DD-MM-YYYY').isSame(dayStart, 'day')) &&
            moment(dayStart).isBefore(moment(new Date()))){ }
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
        this.appointmentsModel[p].showProviderDetails =
          this.appointmentsModel[p].profile.Id === provider.profile.Id
            ? true
            : false;
      } else {
        this.appointmentsModel[p].showProviderDetails = false;
        this.getProviderInfo('session', '');
      }
    }
  }
  // registartion code start
  onInputFieldDobChanged(event: IMyInputFieldChanged, type) {
    this.toastr.setRootViewContainerRef(this._rootViewContainerRef);
   // this.toastr.error('rrrrr');
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
        } else if (type === 'birthday') {
          this.enterdatests = false;
          this.onbirthdateDateChanged(dobmodal);
        }
      } else {
        if (type === 'schday') {
          this.toastr.setRootViewContainerRef(this._rootViewContainerRef);
          this.toastr.error('Please click on calender icon and select Date.');
          this.schngxdp.clearDate();
        } else if (type === 'bday') {
          this.toastr.error('Please click on calender icon and select DOB.');
          this.dobngxdp.clearDate();
        } else if (type === 'sortdate') {
          this.toastr.error('Please click on calender icon and select Date.');
          this.sortngxdp.clearDate();
        } else if (type === 'bday') {
          this.toastr.error('Please click on calender icon and select DOB.');
          this.birthngxdp.clearDate();
        }
      }
    }
  }
  onDOBDateChanged(event: IMyDateModel): void {
    this.enterdatests = false;

    this.modal.DOB = event.formatted;
    this.serachModel.birthday = this.modal.DOB;
    this.serachModel.DOB = moment(this.modal.DOB, 'MM-DD-YYYY').format(
      'DD/MMM/YYYY'
    );
  }
  onScheduleDateChanged(event: IMyDateModel): void {
    this.enterdatests = false;
    this.today = event.jsdate;
    this.sortdatests = false;
    this.schedulests = true;
    this.isPrevious = false;
    this.modal.schdate = moment(event.formatted, 'MM/DD/YYYY').format('MM/DD/YYYY');
    // console.log(this.modal.schdate);
    // this.today = this.modal.schdate;
    this.serachModel.ScheduleDate = moment(
      this.modal.schdate,
      'MM/DD/YYYY'
    ).format('DD/MMM/YYYY');
  }
  onsortDateDateChanged(event: IMyDateModel): void {
    this.enterdatests = false;
    this.schedulests = false;
    this.isPrevious = false;
    this.modal.sortdate = event.formatted;
    // console.log(this.modal.sortdate);
    this.today = new Date(event.formatted);
    this.sortdatests = true;
    this.getProviderInfo('sort', '');
  }
  onbirthdateDateChanged(event: IMyDateModel): void {
    this.enterdatests = false;
    this.modal.Birthdate = event.formatted;
    console.log(event.date.year);
    this.serachModel.birthday = this.modal.Birthdate;
    let date = new Date();
    this.regModel.Age = date.getFullYear() - event.date.year;
  }
  getNHSNumberMask() {
    return {
      mask: [
        '(',
        /[1-9]/,
        /\d/,
        /\d/,
        ')',
        ' ',
        /\d/,
        /\d/,
        /\d/,
        '-',
        /\d/,
        /\d/,
        /\d/,
        /\d/
      ],
      guide: true,
      placeholderChar: '_',
      keepCharPositions: true
    };
  }
  unmasckphone(event) {
    this.phonests = false;
    let mobnumber: string;
    if (this.regModel.PhoneNo !== '') {
      // console.log('@@@' + this.model.PhoneNo);
      mobnumber = this.unmask(event.target.value);
      // console.log(this.regModel.PhoneNo);
      if (mobnumber.length !== 10) {
        this.phonests = true;
      } else {
        this.regModel.PhoneNo = mobnumber;
        this.phonests = false;
      }
    }
  }
  getStateNames(countryid) {
    return this._pharmacyReferralService
      .getstateNames(countryid)
      .subscribe(arg => {
        this.stateNames = arg.data;
        // console.log(JSON.stringify((this.stateNames)));
      });
  }
  choosedSloat(img, id, providername, servicetype, slot, days, providerinfo) {
    //  alert();
    // this.settings = providerinfo.profile;
    // console.log(providerinfo.profile.Settings.LocationName);
    // this.getlocations();
    this.emailvalid = false;
    this.aftersuccesshide = true;
    // console.log('radha' + this.modal.bdate);
    this.regModel = new RegistrationModel();
    this.modal.Birthdate = '';
    this.providerName = '';
    this.serviceType = '';
    this.message = '';
    this.successmessage = false;
    this.errorstatus = false;
    // console.log(days.Displaydate);
    this.providerName = providername;
    this.serviceType = servicetype;
    this.imageUrl = img;
    this.regModel.ProviderId = id;
    this.regModel.slotdate = days.Displaydate;
    this.regModel.fromtime = slot.fromtime;
    this.regModel.totime = slot.totime;
    console.log(providerinfo);
    if (providerinfo !== undefined) {
      this.regModel.City = providerinfo.profile.Settings.LocationName;
      this.regModel.State = providerinfo.profile.Settings.StateName;
    }
    const email = this.activatedRoute.snapshot.queryParamMap.get('em');
    if (email != '' && email != undefined && email != null) {
      this.regModel.FirstName = this.activatedRoute.snapshot.queryParamMap.get('fn');
      this.regModel.LastName = this.activatedRoute.snapshot.queryParamMap.get('ln');
      this.regModel.Email = this.activatedRoute.snapshot.queryParamMap.get('em');
      this.regModel.PhoneNo = this.activatedRoute.snapshot.queryParamMap.get('pn');
      this.regModel.DOB = this.activatedRoute.snapshot.queryParamMap.get('dob');
      this.regModel.Zipcode = this.activatedRoute.snapshot.queryParamMap.get('zc');
      this.regModel.Message = this.activatedRoute.snapshot.queryParamMap.get('co');
      this.regModel.Age = this.activatedRoute.snapshot.queryParamMap.get('age');
    }
  }
  // getlocations() {
  //   return this._appoinmentservice.getLocationtype().subscribe(res => {
  //     this.items2 = res.data;
  //     //  console.log(this.items2);
  //     for (let i = 0; i <= this.items2.length - 1; i++) {
  //       // console.log(this.settings.Settings.LocationId+","+this.items2[i].Id);
  //       if (this.items2[i].Id == this.settings.Settings.LocationId) {
  //         this.regModel.City = this.items2[i].LocationName;
  //       }
  //     }
  //   });
  // }
  bookslot() {
    // alert();
    this.emailvalid = false;
    if (this.enterdatests === true && this.validdate === false) {
      this.toastr.error('Please click on calender icon and select.');
      // this.ngxdp.clearDate();
    } else if (this.phonests === false) {
      // console.log(this.regModel);
      if (this.userForm.valid) {
        this.loading = true;
        // console.log(this.regModel);
        this.regModel.DOB = this.datepipe.transform(
          this.serachModel.birthday,
          'dd/MMM/yyyy'
        );
        this.regModel.AppointmentTypeId = this.serachModel.AppointmentTypeId;
        if (this.LeadGuid !== '') {
          this.regModel.LeadGuid = this.LeadGuid;
        }
        return this._appoinmentservice.regservice(this.regModel).subscribe(
          res => {
            console.log(res);
            if (res.Success) {
              if (res.data === 'Email already exists.') {
                this.emailvalid = true;
                this.toastr.error(res.data);
              } else {
                this.modal.Birthdate = '';
                this.successmessage = true;
                this.message = 'Registration completed successfully.\n Please check your registered email for your login & appointment details.';
              }
            } else {
              // console.log(res);
             // this.errorstatus = true;
              this.toastr.error(res.data);
             // this.message = res.data;
              // this.message = '';
            }
            this.loading = false;
          },
          err => console.log(err)
        );
      } else {
        this.validateAllFormFields(this.userForm);
      }
    }
  }
  getOurTestimonials() {
    return this._appoinmentservice.getOurTestimonials().subscribe(
      res => {
        this.allTestimonials = res.data;
        // console.log('tester' + JSON.stringify(this.allTestimonials.News));
        this.allNews = this.allTestimonials.News;
        this.ourallTestimonials = this.allTestimonials.Testimonials;
      });
  }
  setSession(e: string): void {
    this.sessionsts = true;
    this.session = e;
    // alert(this.session);
    this.getProviderInfo('session', '');
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

  /** Toast messages for success and failure */
  success(successmsg) { }
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
    // alert('filter');
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
    // console.log('radh');
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
          console.log(JSON.stringify(this.Appointments));
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
                console.log('radha111sche'+lastdate);
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
          console.log('aaaaaaaaaa'+lastdate);
          // if (this.prev === false) {
          this.lastDay = new Date(lastdate);
          // } else if (this.prev === true && this.isPrevious === false) {

          //   this.lastDay = new Date(todaydate); console.log(this.lastDay);
          // }
          //  console.log(this.today + ',' + this.lastDay);
          setTimeout(() => {
            this.nextcount = 0;
            if( this.carosal.isControls != undefined  ){
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
    //  this.appintmenttype = '';
    this.modal.DOB = '';
    this.aftersuccesshide = false;
    // this.serachModel = new SearchModel();
    this.regModel = new RegistrationModel();
    this.getProviderInfo('search','');
  }
  myFunction() {
    //  alert(this.query2);
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
    // this.filteredList1 = [];
    //  this.filteredList2 = [];
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
    // alert(event.target.id);
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
  //  error(errormsg) {
  //   // alert(errormsg);
  //   this._toast.ShowAlert(errormsg, '', 'Error');
  // }
  error(errormsg) {
   // alert(errormsg);
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

        }, 2000);
    });
  }
  @HostListener('keydown.shift.tab', ['$event'])
  backtab(event) {
    // alert(event.target.id);
    if (this.filteredList2.length === 0 && event.target.id === 'appointment') {
      this.filter2();
    } else if (this.filteredList1.length === 0 && event.target.id === '') {
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
 ratingComponetClick(clickObj: any): void {
 console.log(clickObj);
 //appointmentsModel
 
   var item = this.appointmentsModel.filter((item: any) => item.id === clickObj.itemId);
   if(!!item && item.length === 1){
     item[0].profile.Settings.Rating = clickObj.rating;
     this.ratingClicked = clickObj.rating;
     this.itemIdRatingClicked = clickObj.itemId;
     console.log(this.ratingClicked+"       "+this.itemIdRatingClicked);
  // this.ratting.hide();
   }
 }

}
// google.maps.event.addDomListener(window, 'load', init);
