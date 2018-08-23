import { ValidationComponent } from './../../../shared/validation/validation.component';
import { ValidationService } from './../../../shared/validation/validation.service';
import { ToastService } from './../../../shared/services/toastService';
import { Router } from '@angular/router';
import { Patient } from './../../../models/slot-booking.model';
import { Component, OnInit, ViewChild, ViewContainerRef, Output, EventEmitter, NgZone, HostListener } from '@angular/core';
import { CalendarComponent } from 'ap-angular2-fullcalendar';
import { DatePipe, AsyncPipe } from '@angular/common';
import { SlotbookingService } from './slot-booking.service';
import { EditPatientSlot, SlotbookingStstusEnum, GetSlotInput } from '../../../models/slot-booking.model';
import { INgxMyDpOptions, IMyDateModel, IMyInputFieldChanged, IMyDate } from 'ngx-mydatepicker';
import { NgxMyDatePickerDirective } from 'ngx-mydatepicker';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Toast } from 'ng2-toastr/src/toast';
import { AsyncValidatorFn, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { PatientService } from '../patientcheckin/patientservice.service';
import { UnMaskedData } from '../../../shared/services/unmaskdata';
import { MaskedDate } from '../../../shared/services/datemask';
declare var jQuery: any;
import { ModalDirective } from 'angular-bootstrap-md';
import * as moment from 'moment';
import { SearchModel, Appointments } from '../../../models/appointments.model';
import { PatientDetailsService } from '../patient-details/patient-details.service';
import { SchedulerService } from '../../person/scheduler/scheduler.service';
@Component({
  moduleId: module.id,
  selector: 'app-slot-booking',
  templateUrl: 'slot-booking.component.html',
  styleUrls: ['slot-booking.component.scss'],
  providers: [DatePipe, SlotbookingService, PatientService, PatientDetailsService,
    SchedulerService] // HttpClient
})
export class SlotBookingComponent implements OnInit {
  @ViewChild('fullCalModal') public fullcalmodel: ModalDirective;
  @ViewChild('CancelAppointment') public cancelappoinmentmodel: ModalDirective;
  Appointments = [];
  IsNameEditable: boolean;
  items: any = [];
  public filteredList = [];
  public selected = [];
  public query = '';
  public mask: Array<string | RegExp>;
  email: string = '';
  phonestssec: boolean;
  unmask = UnMaskedData;
  items1: any = [];
  public filteredList1 = [];
  public selected1 = [];
  public query1 = '';
  public currentmonth: string;
  email1: string = '';
  slotForm: FormGroup;
  @ViewChild(CalendarComponent) myCalendar: CalendarComponent;
  @ViewChild('selectedbirthdate') ngxdp: NgxMyDatePickerDirective;
  @ViewChild('selecteddate') selecteddt: NgxMyDatePickerDirective;
  @Output()
  monthChanged = new EventEmitter();
  data: any;
  AppointmentNumber: string;
  SlotTime: string;
  addnewevent: boolean;
  Newnewevent: boolean;
  checkInsts: string;
  postDateFormat = 'dd/MMM/yyyy';
  availableSlots: any = [];
  provider = [];
  date: Date = new Date();
  cancelCheckinMsg: string;
  cancelCheckinHeading: string;
  slectdt: any;
  todaydt: any;
  cancelidts: boolean;
  appointmentsModel: Array<Appointments>;
  serachModel: SearchModel;
  today = new Date();
  lastDay: any;
  myOptions: INgxMyDpOptions = {
    // other options...
    dateFormat: 'mm/dd/yyyy',
    firstDayOfWeek: 'mo',
    markCurrentDay: true,
    disableHeaderButtons: true,
    disableSince: { year: this.date.getFullYear(), month: this.date.getMonth() + 1, day: this.date.getDate() },
    // selectorHeight: '50px',
    selectorWidth: '330px'
  };
  appointmentdate: INgxMyDpOptions = {
    // other options...
    dateFormat: 'mm/dd/yyyy',
    disableWeekends: true,
    firstDayOfWeek: 'mo',
    markCurrentDay: true,
    disableHeaderButtons: true,
    disableUntil: { year: this.date.getFullYear(), month: this.date.getMonth() + 1, day: this.date.getDate() - 1 },
    // selectorHeight: '232px',
    selectorWidth: '330px'
  };
  // patientcheckifnew: boolean = false;
  dob: any = {};
  availableSlotsbaesdonDate: boolean = false;
  providerdata: any = [];
  providerdata1: any = [];
  globaldata: any = [];
  providerstscount: any = [];
  stscount: any = [];
  selectedSlot: number;
  loading: boolean;
  // buttonloading: boolean = true;
  validdate: boolean;
  isbdaydt: boolean;
  dateMask = MaskedDate;
  enterdatests: boolean;
  //  senterdatests:boolean;
  public model: EditPatientSlot;
  public getSlotInput: GetSlotInput;
  // editpatientinfoModel: EditPatientSlot;
  calendarDefaultDate: string;
  calendarOptions: any = {
    // 2018-06-04: '',
    defaultDate: '',
    navLinks: true,
    fixedWeekCount: true,
    showNonCurrentDates: false,
    defaultView: 'agendaDay',
    header: {
      left: 'prev,next today',
      center: 'title',
      right: 'month,agendaWeek,agendaDay'
    },
    validRange: {
      start: moment().format('YYYY-MM-DD'),
      end: moment().add('years', 2)
    },
    // validRange: function (nowDate) {
    //   return {
    //     start: nowDate,
    //     end: nowDate.clone().add(1, 'months')
    //   };
    // },
    editable: true,
    eventLimit: true,
    eventClick: this.editevent.bind(this),
    dayClick: this.addevent.bind(this),
    viewRender: this.nextevent.bind(this),
    //   viewRender: function (view, element) {
    //     // view.intervalStart.month();
    //     // if (
    //     //   !this.date.isWithin(view.intervalStart, view.intervalEnd)) {
    //     //   console.log(view);

    //     //   }
    //     alert('sai');
    //     console.log(view);
    // },

    events: []
  };
  constructor(public router: Router,
    private patientdetailsservice: PatientDetailsService,
    public _slotbookingService: SlotbookingService,
    public datepipe: DatePipe,
    private formBuilder: FormBuilder,
    public toastr: ToastsManager, vcr: ViewContainerRef, private patientservice: PatientService,
    public _appoinmentservice: SchedulerService, ) {
    this.loading = true;
    this.slectdt = '';
    this.mask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
    this.todaydt = '';
    this.phonestssec = false;
    this.addnewevent = false;
    this.Newnewevent = false;
    this.validdate = false;
    this.enterdatests = false;
    this.cancelidts = false;
    // this.senterdatests = false;
    this.isbdaydt = false;
    this.toastr.setRootViewContainerRef(vcr);
    this.model = new EditPatientSlot();
    this.getSlotInput = new GetSlotInput();
    this.serachModel = new SearchModel();
    this.appointmentsModel = new Array<Appointments>();
    this.slotForm = this.formBuilder.group({
      'firstname': ['', Validators.required, ValidationService.alphabeticsValidator],
      'lastname': ['', Validators.required, ValidationService.alphabeticsValidator],
      'selectedbirthdate': [''],
      'email': ['', [Validators.required, Validators.maxLength(50)], ValidationService.emailValidator],
      'providerId': ['', Validators.required],
      'mobilenumber': ['', Validators.required],
      'selecteddate': ['', Validators.required],
      'slotfromtime': [''],
      'slottotime': [''],
      'Message': ['']
    });
    console.log(this.model);
    this.IsNameEditable = true;
  }

  ngOnInit() {
    this.availableSlotsbaesdonDate = false;
    // console.log(moment());
    this.calendarDefaultDate = new Date().toDateString();
    this.initCalendar();
  }
  initCalendar() {
    this.myCalendar.fullCalendar('removeEvents');
    this.calendarOptions.defaultDate = this.calendarDefaultDate;
    this.myCalendar.fullCalendar('gotoDate', this.calendarDefaultDate);
    this.myCalendar.fullCalendar('changeView', 'agendaDay');
    this.myCalendar.fullCalendar(this.calendarOptions);
  }
  changeCalendarView() {
    this.myCalendar.fullCalendar('removeEvents');
    this.calendarOptions.defaultDate = this.calendarDefaultDate;
    this.myCalendar.fullCalendar('changeView', this.calendarOptions);
  }
  onCalendarInit(event) {
  }
  nextevent(event) {
    // alert(event.intervalEnd.month());
    this.currentmonth = this.datepipe.transform(event.start._d, this.postDateFormat);
    console.log(this.currentmonth);
    this.getlookupdata();
  }
  getEvents() {
    // console.log(this.myCalendar.fullCalendar('getDate'));
    this.myCalendar.fullCalendar('removeEvents');
    let date: any;
    date = new Date();
    const FromDate = this.datepipe.transform(date, this.postDateFormat);
    this.getSlotInput.FromDate = this.currentmonth;
    this.getSlotInput.CurrentDate = FromDate + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
    this.data = [];
    this.calendarOptions.events = [];
    this._slotbookingService.geteventslotsnew(this.getSlotInput).subscribe(
      Data => {
        console.log('radha');
        // console.log(JSON.stringify(Data.data));
        this.data = Data.data;
        this.calendarOptions.events = this.data.bookedSlotList;
        this.stscount = this.data.StatusList;
        this.providerstscount = this.data.ProviderList;
        this.myCalendar.fullCalendar('renderEvents', this.calendarOptions.events, true);
      }
    );
  }
  onInputFieldDobChanged(event: IMyInputFieldChanged, type) {
    this.enterdatests = false;
    this.validdate = false;
    this.isbdaydt = false;
    if (event.value.length >= 1) {
      this.enterdatests = true;
    }
    if (type === 'bday') {
      this.isbdaydt = true;
    }
    console.log('IMyInputFieldChanged' + JSON.stringify(event.value) + ',' + event.value.length + ',' + event.valid);
    if (event.value.length === 10) {

      this.validdate = event.valid;
      // this.validdatecheck = true;
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
      // alert(event.value);
      console.log('dobmodal' + JSON.stringify(dobmodal));
      if (this.validdate) {
        if (type === 'bday') {
          this.enterdatests = false;
          this.isbdaydt = false;
          this.onDatebirthdateChanged(dobmodal);
        } else {
          this.enterdatests = false;
          this.onDateChanged(dobmodal);
        }
      } else {
        if (type === 'bday') {
          this.error('Please click on calender icon and select DOB.');
          this.ngxdp.clearDate();
        } else {
          this.error('Please click on calender icon and select Date');
          this.selecteddt.clearDate();
        }
      }
    }
  }
  onDateChanged(event: IMyDateModel): void {
    this.enterdatests = false;
    this.availableSlotsbaesdonDate = false;
    this.model.patientslotdate = event.formatted;
    if (this.model.patientslotdate !== '' && this.model.providerId !== '') {
      this.ChangeDateEvent();
    }
    console.log('dddddddddd' + this.model.patientslotdate + ',' + this.model.providerId);
  }
  providerClick() {

    this.ChangeDateEvent();
  }
  ChangeDateEvent() {
    this.serachModel = new SearchModel();
    this.appointmentsModel = [];
    console.log('ChangeDateEvent' + this.model.patientslotdate + ',' + this.model.providerId);
    this.availableSlotsbaesdonDate = false;
    this.loading = false;
    let date: any;
    date = new Date();
    const fromdt = date;
    this.model.currenttime = this.datepipe.transform(fromdt, this.postDateFormat) + ' ' +
      date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
    // alert(this.model.currenttime);
    if (this.model.PatientId !== 0) {
      console.log('patient' + this.model.PatientId);
      console.log(this.model.providerId);
      //  alert();
      this.serachModel.AppointmentTypeId = this.model.AppointmentTypeId;
      this.serachModel.Location = this.model.LocationId;
      this.serachModel.ScheduleDate = this.datepipe.transform(this.model.patientslotdate, this.postDateFormat);
      // alert(this.model.patientdob);
      if (this.model.patientdob === '' || this.model.patientdob == null) {
        this.serachModel.DOB = '';
      } else {
        this.serachModel.DOB = this.datepipe.transform(this.model.patientdob, this.postDateFormat);
      }
      this.serachModel.ProviderId = this.model.providerId;
      // alert(patientdob);
      this._appoinmentservice
        .getproviderslotsInfo(this.serachModel).subscribe(
          Data => {
            // console.log(Data.data.Providers.length);
            if (Data.success) {
              //  console.log(Data.data.Providers.length);
              this.appointmentsModel = Data.data;
              if (this.appointmentsModel.length > 0) {
                this.today = new Date(this.model.patientslotdate);
                for (let p = 0; p <= this.appointmentsModel.length - 1; p++) {
                  this.lastDay = new Date(this.today);
                  this.getBookedSlots(this.today, this.lastDay, this.appointmentsModel[p]);
                }
              } else {
                this.availableSlotsbaesdonDate = true;
              }
            } else {
              this.availableSlotsbaesdonDate = true;
              console.log(Data.data);
            }
          }
        );
    } else {
      //  alert('new patient');
      console.log('new patient');
      this.serachModel.ScheduleDate = this.datepipe.transform(this.model.patientslotdate, this.postDateFormat);
      // alert(this.model.patientdob);
      if (this.model.patientdob === '' || this.model.patientdob == null) {
        this.serachModel.DOB = '';
      } else {
        this.serachModel.DOB = this.datepipe.transform(this.model.patientdob, this.postDateFormat);
      }
      this.serachModel.ProviderId = this.model.providerId;
      this._appoinmentservice
        .getproviderslotsInfo(this.serachModel).subscribe(
          Data => {
            // console.log(Data.data.Providers.length);
            if (Data.success) {
              //  console.log(Data.data.Providers.length);
              this.appointmentsModel = Data.data;
              if (this.appointmentsModel.length > 0) {
                this.today = new Date(this.model.patientslotdate);
                for (let p = 0; p <= this.appointmentsModel.length - 1; p++) {
                  this.lastDay = new Date(this.today);
                  this.getBookedSlots(this.today, this.lastDay, this.appointmentsModel[p]);
                }
              } else {
                this.availableSlotsbaesdonDate = true;
              }
            } else {
              this.availableSlotsbaesdonDate = true;
              console.log(Data.data);
            }
          }
        );

    }
  }
  onDatebirthdateChanged(event: IMyDateModel): void {
    this.enterdatests = false;
    this.isbdaydt = false;
    this.availableSlotsbaesdonDate = false;
    this.model.patientdob = event.formatted;
    if (this.model.providerId !== '') {
      this.ChangeDateEvent();
    }
    console.log('dob' + this.model.patientdob);
  }
  addevent(event) {
    // alert();
    this.appointmentsModel = [];
    console.log(event);
    let d: any;
    d = new Date();
    d = d.setDate(d.getDate() - 1);
    // alert(d);
    if (d < event._d) {
     // console.log('this.providerdata   ' +JSON.stringify(this.providerdata));
      this.providerdata =  this.providerdata1.filter((item, index) =>  {
        if (this.providerstscount[index].IsSelected) {
       return item.ProviderId === this.providerstscount[index].ProviderId;
      }
      });
      this.addnewevent = true;
      this.Newnewevent = true;
      this.model = new EditPatientSlot();
      this.model.selecteddate = this.datepipe.transform(event._d, 'MM/dd/yyyy');
      this.slectdt = this.model.selecteddate;
      this.model.patientslotdate = this.datepipe.transform(event._d, 'MM/dd/yyyy');
      this.todaydt = this.model.patientslotdate;
      console.log(this.model.patientslotdate);
      this.availableSlots = [];
      this.fullcalmodel.show();
    } else {
      this.error('Please click on valid date to book an Appointment');
    }
    this.IsNameEditable = true;
  }
  editevent(event) {
    this.providerdata = this.providerdata1;
    this.appointmentsModel = [];
    this.IsNameEditable = false;
    // this.checkInsts = 'false';
    this.addnewevent = false;
    this.Newnewevent = false;
    this.model = new EditPatientSlot();
    this.availableSlotsbaesdonDate = false;
    this.availableSlots = [];
    console.log(event.patient);
    this.checkInsts = event.patient.CheckIn;
    // alert(this.checkInsts);
    this.AppointmentNumber = event.patient.AppointmentNumber;
    this.SlotTime = event.patient.SlotTime;
    this.model.patinetname = event.title;
    this.model.patientage = event.patient.Age;
    this.model.selectedbirthdate = event.patient.DOB;
    this.model.patientdob = event.patient.DOB;
    this.model.selecteddate = this.datepipe.transform(event.start._i, 'MM/dd/yyyy');
    this.model.patientslotdate = this.datepipe.transform(event.start._i, 'MM/dd/yyyy');
    // this.model.duration = event.patient.Duration;
    this.model.PatientId = event.patient.PatientId;
    this.model.BookedSlotId = event.patient.BookedSlotId;
    this.model.providerId = event.patient.ProviderId;
    this.model.firstname = event.patient.FirstName;
    this.model.lastname = event.patient.LastName;
    this.model.email = event.patient.Email;
    this.model.mobilenumber = event.patient.PhoneNo;
    this.model.slotfromtime = event.patient.FromTime;
    this.model.slottotime = event.patient.ToTime;
    this.model.Message = event.patient.Problem;
    this.model.BookingStatus = event.patient.BookingStatus;
    this.model.LocationId = event.patient.LocationId;
    this.model.AppointmentTypeId = event.patient.AppointmentTypeId;
    if (event.patient.ImageUrl === '') {
      this.model.ImageUrl = '';
    } else if (event.patient.ImageUrl !== null) {
      this.model.ImageUrl = event.patient.ImageUrl;
    }
    // console.log('this.model.ImageUrl' + this.model.ImageUrl);
    this.fullcalmodel.show();
  }
  updateevent() {
    console.log(this.model);
    if (this.slotForm.dirty && this.slotForm.valid && this.phonestssec == false) {
      // alert();
      let date: any;
      date = new Date();
      const fromdt = this.datepipe.transform(date, this.postDateFormat);

      this.model.currenttime = fromdt + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
      if (this.model.PatientId !== 0) {
        // this.buttonloading = false;
        //  this.loading = false;
        // alert('withpatientid');
        let inputmodel = {
          'PatientId': this.model.PatientId,
          'ProviderId': this.model.providerId,
          'SlotDate': this.serachModel.ScheduleDate,
          'FromTime': this.model.slotfromtime,
          'ToTime': this.model.slottotime,
          'Message': this.model.Message,
          'CreatedOn': this.model.currenttime,
          'BookedSlotId': 0,
          'CancelledSlotId': this.model.BookedSlotId
        };
        this._slotbookingService.updateEvent(inputmodel).subscribe
          (
          res => {
            console.log(res);
            if (res.Success) {
              this.success('Your appointment booked successfully');
            } else {
              this.error(res.data);
              console.log(res);
            }
          },
          err => console.log(err)
          );
      } else {
        // alert(this.enterdatests+','+this.validdate);
        if ((this.enterdatests === true && this.validdate === false) || (this.enterdatests === true && this.validdate === true)) {
          this.error('Please click on calender icon and select DOB.');
          this.ngxdp.clearDate();
        } else {
          // this.buttonloading = false;
          // this.loading = false;
          // alert('new patient');
          if (this.model.patientdob === '' || this.model.patientdob == null) {
            this.serachModel.DOB = '';
          } else {
            this.serachModel.DOB = this.datepipe.transform(this.model.patientdob, this.postDateFormat);
          }
          let registration = {
            'FirstName': this.model.firstname,
            'LastName': this.model.lastname,
            'Email': this.model.email,
            'PhoneNo': this.model.mobilenumber,
            'DOB': this.serachModel.DOB,
            'CreatedOn': this.model.currenttime,
            'slotdate': this.serachModel.ScheduleDate,
            'fromtime': this.model.slotfromtime,
            'totime': this.model.slottotime,
            'Message': this.model.Message,
            'ProviderId': this.model.providerId
          };
          this._slotbookingService.regservicewithslotbooking(registration).subscribe
            (
            res => {
              console.log(res);
              if (res.Success) {
                this.success('Your Registration has been completed successfully');
                this.addnewevent = false;
                this.Newnewevent = false;
              } else {
                console.log(res);
                this.error(res.data);
              }
            },
            err => console.log(err)
            );
        }
      }
    }
  }
  getlookupdata() {
    this._slotbookingService.lookupdata().subscribe(
      Data => {
        // console.log(JSON.stringify(Data));
        this.providerdata = Data.Providers;
        // this.selectedproviderids = Data.Providers;
        this.providerdata1 = Data.Providers;
        this.globaldata = Data.GlobalTypes;
        this.getEvents();
        // this.data = Data.data;
      }
    );
  }
  getslottime(slots, i) {
    this.selectedSlot = i;
    this.model.slotfromtime = slots.fromtime;
    this.model.slottotime = slots.totime;
    // alert(slots.fromtime);
  }
  close() {
    this.getEvents();
  }
  cancel(type) {
    this.cancelCheckinHeading = '';
    this.cancelCheckinMsg = '';
    if (type === 'checkin') {
      this.cancelCheckinHeading = 'Checkin';
      this.cancelCheckinMsg = 'Do you want to Checkin this appointment with-' + this.model.firstname + this.model.lastname;
    } else if (type === 'cancel') {
      this.cancelCheckinHeading = 'Cancel';
      this.cancelCheckinMsg = 'Do you want to cancel this appointment  (' + this.model.patientslotdate +
        ',' + this.model.slotfromtime + '-' + this.model.slottotime + ')';
    }
    this.cancelappoinmentmodel.show();
  }
  cancelappointment() {
    // alert('cancelled');
    const InputInfo = {
      PersonId: this.model.PatientId,
      BookedSlotId: this.model.BookedSlotId
    };
    this._slotbookingService.cancelAppointment(InputInfo).subscribe(
      res => {
        console.log((JSON.stringify(res)));
        if (res.Success) {
          this.success('Your Appointment has been cancelled');
        } else {
          this.error(res.data);
          console.log(res);
        }
      }
    );
  }
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
      this.loading = true;
      // this.buttonloading = true;
      // this.myCalendar.fullCalendar('removeEvents');
      this.getEvents();
      setTimeout(() => {
        this.toastr.dismissToast(toast);
        this.fullcalmodel.hide();
        this.cancelappoinmentmodel.hide();
        this.query = "";
        // this.model.selecteddate="";
      }, 3000);
    });
  }
  error(errormsg) {
    this.toastr.error(errormsg, null, {
      dismiss: 'controlled', showCloseButton: true,
      positionClass: 'toast-bottom-right', newestOnTop: true, progressBar: false,
      showEasing: 'swing', closeButton: false, 'preventDuplicates': true,
      'debug': false, 'hideEasing': 'linear',
      'showMethod': 'fadeIn',
      'hideMethod': 'fadeOut'
    }).then((toast: Toast) => {
      this.loading = false;
      // this.buttonloading = true;
      setTimeout(() => {
        this.toastr.dismissToast(toast);
      }, 3000);
    });
  }
  checkin() {
    let date: any;
    date = new Date();
    const currentdata = this.datepipe.transform(date, this.postDateFormat);
    const currenttime = currentdata + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
    const temp = {
      'AppointmentDateTime': this.SlotTime,
      'CheckInDateTime': currenttime,
      'PersonId': this.model.PatientId,
      'AppointmentId': this.model.BookedSlotId,
      'IsActive': true,
      'Status': 'CheckIn'
    };
    console.log(temp);
    this.patientservice.patientCheckinPost(temp).subscribe(
      res => {
        console.log((JSON.stringify(res)));
        if (res.Success) {
          this.success('You are successfully CheckedIn');
        } else {
          this.error(res.data);
          console.log(res);
        }
      }
    );

  }
  filter() {
    // alert(this.query);
    this.selected = [];
    this.filteredList = [];
    if (this.query !== '' && this.query.length >= 1) {
      return this.patientdetailsservice.getListofPersons(this.query).subscribe(
        res => {
          this.items = res.data;
          this.filteredList = this.items.filter((el: any) => {
            return el; // .FirstName.toLowerCase().indexOf(this.query.toLowerCase()) > -1;
          });
          console.log(this.filteredList);
        }
      );
    } else {
      this.filteredList = [];
    }
  }
  select(item) {
    this.appointmentsModel = [];
    // alert(this.addnewevent+','+item.CheckIn);
    this.selected.push(item);
    console.log(item);
    this.email = this.selected[0].Email;
    // alert(this.email);
    // this.query = '';
    // alert();
    this.addnewevent = false;
    this.filteredList = [];
    console.log(item);
    let selectedDate: any;
    selectedDate = this.model.selecteddate;

    this.model = new EditPatientSlot();
    this.availableSlotsbaesdonDate = false;
    this.availableSlots = [];
    this.checkInsts = item.CheckIn;
    // alert(this.checkInsts);
    // this.model.patinetname = event.title;
    this.model.patientage = item.Age;
    // this.model.selecteddate = this.datepipe.transform(item.DOB, 'yyyy-MM-dd');
    this.model.selectedbirthdate = this.datepipe.transform(item.DOB, 'MM/dd/yyyy');
    this.model.patientdob = this.datepipe.transform(item.DOB, 'MM/dd/yyyy');
    // alert(this.datepipe.transform(item.DOB, 'yyyy-MM-dd'));
    this.model.selecteddate = this.slectdt;
    this.model.patientslotdate = this.todaydt;
    // this.model.duration = event.patient.Duration;
    this.model.PatientId = item.Id;
    // this.model.BookedSlotId = event.patient.BookedSlotId;
    // this.model.providerId = event.patient.ProviderId;
    this.model.firstname = item.FirstName;
    this.model.lastname = item.LastName;
    this.model.email = item.Email;
    this.model.mobilenumber = item.PhoneNo;
    // this.model.AppointmentTypeId = item.AppointmentTypeId;
    // this.model.LocationId = item.LocationId;
    // this.model.slotfromtime = event.patient.FromTime;
    // this.model.slottotime = event.patient.ToTime;
    this.model.Message = '';
    if (item.ImageUrl === '' || item.ImageUrl == null) {
      this.model.ImageUrl = '';
    } else if (item.ImageUrl !== null) {
      this.model.ImageUrl = item.ImageUrl;
    }
    this.model.selecteddate = this.datepipe.transform(selectedDate, 'MM/dd/yyyy');
    // alert(this.datepipe.transform(selectedDate, 'yyyy-MM-dd'));
    // this.addnewevent = false;
    this.IsNameEditable = false;
    this.availableSlotsbaesdonDate = false;
  }
  remove(item) {
    this.selected.splice(this.selected.indexOf(item), 1);
  }
  clear() {
    this.query = '';
    this.filteredList = [];
    this.appointmentsModel = [];
  }
  enableEdit() {
    if (this.IsNameEditable === false) {
      this.IsNameEditable = true;
    }
  }

  newPatient() {
    this.appointmentsModel = [];
    this.query = '';
    this.addnewevent = true;
    this.Newnewevent = true;
    this.model = new EditPatientSlot();
    this.IsNameEditable = true;
    this.model.selecteddate = this.slectdt;
    this.model.patientslotdate = this.todaydt;
    this.availableSlotsbaesdonDate = false;
  }
  // patient search field on calander
  filter1() {
    let selecteddatefromcal1: any;
    const currntdt = moment(new Date, 'DD-MMM-YYYY').format('DD-MMM-YYYY');
    // alert(this.query);
    this.selected1 = [];
    this.filteredList1 = [];
    if (this.query1 !== '' && this.query1.length >= 1) {
      return this.patientdetailsservice.getListofPersonswithfuturedate(this.query1, currntdt).subscribe(
        res => {
          this.items1 = res.data;
          console.log(res.data);
          this.filteredList1 = this.items1.filter((el: any) => {
            return el; // .FirstName.toLowerCase().indexOf(this.query.toLowerCase()) > -1;
          });
          console.log(this.filteredList1);
        }
      );
    } else {
      this.filteredList1 = [];
      this.selected1 = [];
      selecteddatefromcal1 = moment(this.currentmonth, 'DD/MMM/YYYY');
      console.log(moment(new Date(selecteddatefromcal1))+','+ moment(new Date(), 'YYYY-MM-DD').format('YYYY-MM-DD'));
      if (moment(new Date(selecteddatefromcal1)).isSame( moment(new Date(), 'YYYY-MM-DD').format('YYYY-MM-DD'))) {
        console.log('anu');
        this.getSlotInput.PatientId = 0;
        this.getEvents();
      } else {
      this.getSlotInput.PatientId = 0;
      this.calendarDefaultDate = new Date().toDateString();
      this.initCalendar();
      }
    }
  }
  select1(item) {
    let selecteddatefromcal: any;
    this.selected1.push(item);
    console.log(this.selected1);
    this.email1 = this.selected1[0].Email;
    // alert(this.email);
    // this.query = '';
    // alert();
    console.log(this.currentmonth);
    selecteddatefromcal = moment(this.currentmonth, 'DD/MMM/YYYY');
    this.filteredList1 = [];
    if (this.selected1.length > 0) {
      console.log(moment(new Date(selecteddatefromcal))+','+ moment(this.selected1[0].NextBookedDate,'YYYY-MM-DD').format('YYYY-MM-DD'));
      if (moment(new Date(selecteddatefromcal)).isSame(moment(this.selected1[0].NextBookedDate, 'YYYY-MM-DD').format('YYYY-MM-DD'))) {
        // alert('if');
        this.getSlotInput.PatientId = this.selected1[0].Id;
        this.getEvents();
      } else {
       // alert('else');
        this.calendarDefaultDate = moment(this.selected1[0].NextBookedDate, 'YYYY-MM-DD').format('YYYY-MM-DD');
        this.getSlotInput.PatientId = this.selected1[0].Id;
        console.log(this.calendarDefaultDate+','+this.getSlotInput.PatientId);
         this.initCalendar();
      }
    }
  }
  remove1(item) {
    this.selected1.splice(this.selected1.indexOf(item), 1);
  }
  patientcard() {
    if (this.selected1.length > 0) {
      this.getSlotInput.PatientId = this.selected1[0].Id;
      console.log(this.getSlotInput.PatientId);
      //  this.myCalendar.fullCalendar('removeEvents');
      // this.getSlotInput.IsAllProviders = false;
      // this.getSlotInput.IsAllStatus = false;
      this.getEvents();
    }
  }
  updateStatus(stsval, value) {
    // console.log(this.stscount);
    if (value.target.checked === false) {
      for (let i = 0; i < this.stscount.length; i++) {
        if (stsval.Id == this.stscount[i].Id) {
          //  alert(stsval.Id+','+this.stscount[i].Id);
          // this.stscount.splice(i, 1);
          this.stscount[i].IsSelected = false;
          console.log(this.stscount);
        }
      }
    } else {
      //  alert(stsval)
      // console.log(this.stscount);
      for (let i = 0; i < this.stscount.length; i++) {
        if (stsval.Id == this.stscount[i].Id) {
          if (this.stscount[i].IsSelected === true) {
            this.stscount.push(stsval);
          } else {
            this.stscount[i].IsSelected = true;
          }
        }
      }
    }
    this.getSlotInput.StatusIds = this.itemsToStringStatus(this.stscount);
    console.log(this.stscount);
    if (stsval.Id === 2) {

    }
    this.getSlotInput.IsAllStatus = false;
    // this.myCalendar.fullCalendar('removeEvents');
    this.getEvents();

  }
  selectAll(selctedlist) {
    if (selctedlist.target.checked === false) {
      for (let i = 0; i < this.providerstscount.length; i++) {
        this.providerstscount[i].IsSelected = false;
      }
    } else {
      for (let i = 0; i < this.providerstscount.length; i++) {
        this.providerstscount[i].IsSelected = true;
      }
    }
    this.getSlotInput.ProviderIds = this.itemsToString(this.providerstscount);
    this.getSlotInput.IsAllProviders = false;
    // this.myCalendar.fullCalendar('removeEvents');
    this.getEvents();

  }
  checkprovidersList(providerinfo, value) {
    this.providerdata = this.providerdata1;
    // alert(value.target.checked + ',' + stsval);
    // alert(this.selectedproviderids.length);
    if (value.target.checked === false) {
      for (let i = 0; i < this.providerstscount.length; i++) {
        if (providerinfo.ProviderId == this.providerstscount[i].ProviderId) {
          //  alert(this.selectedproviderids[i].ProviderId + ',' + providerinfo.ProviderId);
          // this.providerstscount.splice(i, 1);
          this.providerstscount[i].IsSelected = false;
        }
      }
    } else {
      for (let i = 0; i < this.providerstscount.length; i++) {
        if (providerinfo.ProviderId == this.providerstscount[i].ProviderId) {
          if (this.providerstscount[i].IsSelected === true) {
            this.providerstscount.push(providerinfo);
          } else {
            this.providerstscount[i].IsSelected = true;
          }
        }
      }
    }
    // console.log(this.providerdata);
   // console.log(this.providerstscount);
    this.getSlotInput.ProviderIds = this.itemsToString(this.providerstscount);
    this.getSlotInput.IsAllProviders = false;
    // this.myCalendar.fullCalendar('removeEvents');
    this.getEvents();
  }
  public itemsToStringStatus(value: Array<any> = []): string {
    return value
      .map((item: any) => {
        if (item.IsSelected === true) {
          return item.Id;
        }
      }).join(',');
  }
  public itemsToString(value: Array<any> = []): string {
    return value
      .map((item: any) => {
        if (item.IsSelected === true) {
          return item.ProviderId;
        } else {
          return 0;
        }
      }).join(',');
  }
  getphoneno() {
    return {
      mask: ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
      guide: true,
      placeholderChar: '_',
      keepCharPositions: true
    };
  }
  unmasckphone() {
    this.phonestssec = false;
    if (this.model.mobilenumber !== '') {
      console.log('@@@' + this.model.mobilenumber);
      this.model.mobilenumber = this.unmask(this.model.mobilenumber);
      console.log(this.model.mobilenumber);
      if (this.model.mobilenumber.length !== 10) {
        this.phonestssec = true;
      } else {
        this.phonestssec = false;
      }
      console.log(this.phonestssec);
    }
  }
  getBookedSlots(todaydate, lastdate, p) {
    // alert();
    console.log('radh');
    this._appoinmentservice
      .getproviderBookedslots(
        moment(this.today, 'DD-MM-YYYY').format('DD-MMM-YYYY'),
        moment(this.lastDay, 'DD-MM-YYYY').format('DD-MMM-YYYY'),
        p.profile.Id
      )
      .subscribe(response => {
        this.Appointments = response.data;
        console.log(JSON.stringify(this.Appointments));
        this.getAvailableSlots(todaydate, lastdate, p);
      });
  }
  getAvailableSlots(todaydate, lastdate, p) {
    console.log(todaydate + ',' + lastdate);
    const excludeslottime = new Date();
    let slottimemorning: boolean;
    let slottimeafter: boolean;
    let slottimeevening: boolean;
    let availableSlots = [];
    p.emptySlots = [];
    for (let i = new Date(todaydate); i <= lastdate; i.setDate(i.getDate() + 1)) {
      slottimemorning = false;
      slottimeafter = false;
      slottimeevening = false;
      let weekdayname = i;
        console.log('for' + i);
        // console.log(p.profile.Settings.Workingdays, moment(i).format('dddd'));
        if (this.weekday(p.profile.Settings.Workingdays, moment(weekdayname).format('dddd'))) {
      if ((moment(excludeslottime, 'DD-MM-YYYY').isSame(i, 'day')) &&
        (moment(excludeslottime, 'DD-MM-YYYY').format('HH:MM') >= p.profile.Settings.MorningTo)) {
        slottimemorning = true;
      }
      if ((moment(excludeslottime, 'DD-MM-YYYY').isSame(i, 'day')) &&
        (moment(excludeslottime, 'DD-MM-YYYY').format('HH:MM') >= p.profile.Settings.AfternoonTo)) {
        slottimeafter = true;
      }
      if ((moment(excludeslottime, 'DD-MM-YYYY').isSame(i, 'day')) &&
        (moment(excludeslottime, 'DD-MM-YYYY').format('HH:MM') >= p.profile.Settings.EveningTo)) {
        slottimeevening = true;
      }
      console.log(p.profile.Settings.AfternoonTo);
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
      console.log(this.availableSlots.length);
      if (p.emptySlots[0].slots.length === 0) {
        // alert();
        this.availableSlotsbaesdonDate = true;
      }
      console.log(this.availableSlots);
      console.log(p);
      availableSlots = [];
    } else  {
        this.availableSlotsbaesdonDate = true;
    }
  }
  }
  getTimeSlotsForDay(date, settings, dayType, morning, after, evening) {
    const timeSlots = [];
    const dayStart = new Date(date);
    const dayEnd = new Date(date);
    let startHr = 0;
    let startMin = 0;
    let endHr = 0;
    let endMin = 0;
    if ((dayType === 1) && !morning) {
      startHr = (settings.MorningFrom == null || settings.MorningFrom === '') ? 0 : settings.MorningFrom.split(':')[0];
      // console.log(startHr);
      startMin = (settings.MorningFrom == null || settings.MorningFrom === '') ? 0 : settings.MorningFrom.split(':')[1];
      // console.log(startMin);
      endHr = (settings.MorningTo == null || settings.MorningTo === '') ? 0 : settings.MorningTo.split(':')[0];
      endMin = (settings.MorningTo == null || settings.MorningTo === '') ? 0 : settings.MorningTo.split(':')[1];
    } else if ((dayType === 2) && !after) {
      startHr = (settings.AfternoonFrom == null || settings.AfternoonFrom === '') ? 0 : settings.AfternoonFrom.split(':')[0];
      startMin = (settings.AfternoonFrom == null || settings.AfternoonFrom === '') ? 0 : settings.AfternoonFrom.split(':')[1];
      endHr = (settings.AfternoonTo == null || settings.AfternoonTo === '') ? 0 : settings.AfternoonTo.split(':')[0];
      endMin = (settings.AfternoonTo == null || settings.AfternoonTo === '') ? 0 : settings.AfternoonTo.split(':')[1];
    } else if ((dayType === 3) && !evening) {
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
          } else if (moment(moment(date, 'DD-MM-YYYY').format('h:mm A'), 'h:mm A').
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
  @HostListener('document:click', ['$event'])
  handleClick(event) {
    // alert(event.target.id);
     const clickedComponent = event.target.tagName;
    if (event.target.id !== 'withoutappoinmentfilter') {
      this.filteredList = [];
    }
     if (event.target.id !== 'listofappoinmentfilter') {
      this.filteredList1 = [];
    }
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
}
