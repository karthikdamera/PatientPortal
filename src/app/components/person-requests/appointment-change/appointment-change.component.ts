import { ToastService } from './../../../shared/services/toastService';
import { ModalDirective } from 'angular-bootstrap-md';
import { GetSlotsModel } from './../../../models/person-slot.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { SchedulerService } from '../../person/scheduler/scheduler.service';
import { DatePipe } from '@angular/common';
import { BookSlot, Appointment, NewAppointment } from '../person-requests.model';
// import { DateFormatPipe } from '../../person/scheduler/dateFormatPipe';
import { ActivatedRoute } from '@angular/router';
import { PersonRequestService } from '../person-requests.service';
import { DateFormatPipe } from 'angular2-moment';
import { SearchModel, Appointments } from '../../../models/appointments.model';
import { EditPatientSlot } from '../../../models/slot-booking.model';
declare var jQuery: any;
import * as moment from 'moment';
import { CarouselModule } from 'angular-bootstrap-md';
import { CarouselComponent } from 'angular-bootstrap-md';
@Component({
  selector: 'app-appointment-change',
  templateUrl: './appointment-change.component.html',
  styleUrls: ['./appointment-change.component.scss'],
  providers: [SchedulerService, DatePipe, PersonRequestService, ToastService]
})
export class AppointmentChangeComponent implements OnInit {
  @ViewChild('carouselRef') carosal: CarouselComponent;
  @ViewChild('showslot') public showslot: ModalDirective;
  images = [];
  schModel: GetSlotsModel;
  Appointments = [];
  // DatesList = [{ 'dayname': '', 'Displaydate': '' }];
  availableSlots: any = [];
  isPrevious: boolean;
  lastDay: any;
  Slotsdisplay: boolean;
  currentslotfromtime: string;
  currentslottotime: string;
  currentslotdate: string;
  sucessmsg: boolean;
  ChangeSlotId: any;
  i: number;
  postDateFormat = 'dd/MMM/yyyy';
  selectedId: number;
  backbuttonsts: boolean;
  newappointmentmodel: NewAppointment;
  appointmentData: Appointment;
  date: Date = new Date();
  dateFormatPipeFilter: DateFormatPipe;
  bookslot: BookSlot;
  Imageshow: boolean;
  serachModel: SearchModel;
  public model: EditPatientSlot;
  nextavailabilitydt: string;
  today = new Date();
  availableSlotsbaesdonDate: boolean = false;
  appointmentsModel: Array<Appointments>;
  slotsdata = [];
  availabledates = [];
  prev = false;
  nextcount: number;
  previouscount: number;
  constructor(public _schedulerService: SchedulerService, public datepipe: DatePipe,
    private router: ActivatedRoute, private _toast: ToastService, private _Requestservice: PersonRequestService) {
    this.schModel = new GetSlotsModel();

    this.bookslot = new BookSlot();
    this.appointmentData = new Appointment();
    this.newappointmentmodel = new NewAppointment();
    this.isPrevious = false;
    this.sucessmsg = false;
    this.backbuttonsts = false;
    this.Slotsdisplay = true;
    this.prev = false;
    this.nextcount = 0;
    this.previouscount = 0;
    this.nextavailabilitydt = '';
    if ((moment(this.today, 'DD-MM-YYYY')) <= (moment(new Date, 'DD-MM-YYYY'))) {
      this.isPrevious = true;
    }
    this.dateFormatPipeFilter = new DateFormatPipe();
    this.appointmentsModel = new Array<Appointments>();
    this.serachModel = new SearchModel();
    this.router.queryParams.subscribe(params => {
      if (params['Guid']) {
        // this.changeslotid = params['ChangeSlotId'];
        this.ChangeSlotId = params['Guid'];
      }
    });
  }
  private selectedLink = 'NoPreference';
  Display: any = [];
  data: any;
  ngOnInit() {
    this.getMyappointmnets();
  }
  getMyappointmnets() {
    this.prev = false;
    this.nextavailabilitydt = '';
    this.appointmentsModel = [];
    this.today = new Date();
   // this.lastDay = new Date(this.today);
   //     this.lastDay.setDate(this.today.getDate() + 7);
    return this._Requestservice.getslotsbyguid(this.ChangeSlotId).subscribe(
      res => {
        console.log('appointmnet data' + (JSON.stringify(this.appointmentData = res.data)));
        if (this.appointmentData.PatientImage === '') {
          this.Imageshow = true;
        } else {
          this.Imageshow = false;
        }
        this.serachModel.ProviderId = this.appointmentData.ProviderId;
        this.serachModel.ScheduleDate = moment(this.today, 'DD-MM-YYYY').format('DD-MMM-YYYY');
        console.log(this.serachModel);
        return this._schedulerService
        .getproviderslotsInfo(this.serachModel)
        .subscribe(Data => {
          this.appointmentsModel = Data.data;
          console.log(this.appointmentsModel);
          let counter = 0;
         for (let p = 0; p <= this.appointmentsModel.length - 1; p++) {
            this.lastDay = new Date(this.today);
            // alert(this.today + ',' + this.lastDay);
            this.lastDay.setDate(this.today.getDate() + 6);
            // console.log(this.lastDay);
            if (counter === 0) {
              this.slotdata(this.today, this.lastDay, this.appointmentsModel[p]);
              //  this.sessionsts = false;
            }
            counter++;
          }
          // console.log(this.appointmentsModel);
        });
      }
    );
  }
  next(provider) {
    console.log('radha');
    this.nextavailabilitydt = '';
    this.carosal.isControls = false;
    this.nextcount++;
    if (this.nextcount == 1) {
    this.prev = false;
    // alert();
    this.Appointments = [];
    this.isPrevious = false;
    if (provider.profile.Settings.DisableSlots === true && provider.profile.Settings.AvailableDates !== '') {
      console.log('radha111');
      this.availabledates = provider.profile.Settings.AvailableDates.split(',');
      if (moment(moment(this.lastDay, 'DD-MM-YYYY').format('DD-MMM-YYYY')).isAfter(this.availabledates[this.availabledates.length - 1])) {
        this.nextavailabilitydt = moment(this.availabledates[0]).format('MMM,dddd DD') + '-' +
        moment(this.availabledates[this.availabledates.length - 1]).format('MMM,dddd DD') ;
        // return;
      // return;
      }

    // this.nextavailabilitydt = moment(provider.profile.Settings.AvailableDates.substr(0, 11)).format('MMM,dddd DD');
    // console.log(this.nextavailabilitydt);
  } else {
    if (provider.profile.Settings.EndInDays != 0) {
    if (moment(moment(this.lastDay, 'DD-MM-YYYY').format('DD-MMM-YYYY')).isAfter(moment(new Date, 'DD-MMM-YYYY')
    .add(provider.profile.Settings.EndInDays, 'days'))) {
        this.nextavailabilitydt = moment(new Date, 'DD-MM-YYYY').format('MMM,dddd DD') + '-' +
        moment(new Date, 'DD-MMM-YYYY').add(provider.profile.Settings.EndInDays, 'days').format('MMM,dddd DD') ;
      }
    }
  }
    // alert(this.lastDay);
    this.today = new Date(this.lastDay);
    this.lastDay = new Date(this.today);
    this.lastDay.setDate(this.today.getDate() + 6);
    console.log(this.today);
    setTimeout(() => {
     this.slotdata(this.today , this.lastDay , provider);
    }, 200);
    }  else {
      setTimeout(() => {
        this.nextcount = 0;
        if( this.carosal.isControls != undefined  ){
          this.carosal.isControls = true;
          }
      }, 1500);
    }
  }
  previous(provider) {
    this.nextavailabilitydt = '';
   
  // else if (moment(new Date, 'DD-MM-YYYY').format('dddd') == 'Saturday') {
  //     this.nextavailabilitydt = moment(new Date).add(2, 'days').format('MMM,dddd DD');
  //     console.log(this.nextavailabilitydt);
  //     } else if (moment(new Date, 'DD-MM-YYYY').format('dddd') == 'Sunday')  {
  //       this.nextavailabilitydt = moment(new Date).add(1, 'days').format('MMM,dddd DD');
  //     } else {
  //       this.nextavailabilitydt = moment(new Date).format('MMM,dddd DD');
  //     }
    this.carosal.isControls = false;
    this.previouscount++;
    if (this.previouscount == 1) {
    this.prev = true;
   //  alert('anu');
    this.Appointments = [];
    this.isPrevious = false;
    this.lastDay = new Date(this.today);
    this.today = new Date(this.lastDay);
    this.today.setDate(this.today.getDate() - 6);
    console.log(this.today);
    if ((moment(this.today, 'DD-MM-YYYY')).isSameOrBefore (moment(new Date, 'DD-MM-YYYY'))) {
      console.log('aaaaaaaaaaaa'+ this.isPrevious);
      this.isPrevious = true;
      if (provider.profile.Settings.DisableSlots === true && provider.profile.Settings.AvailableDates !== '') {
      this.availabledates = provider.profile.Settings.AvailableDates.split(',');
      this.nextavailabilitydt = moment(this.availabledates[0]).format('MMM,dddd DD') + '-' +
      moment(this.availabledates[this.availabledates.length - 1]).format('MMM,dddd DD');
      } else {
        if (provider.profile.Settings.EndInDays != 0) {
          this.nextavailabilitydt = moment(new Date).format('MMM,dddd DD') + '-' +
          moment(new Date, 'DD-MMM-YYYY').add(provider.profile.Settings.EndInDays, 'days').format('MMM,dddd DD') ;
        }
      }
    }
    setTimeout(() => {
      this.slotdata(this.today , this.lastDay , provider);
    }, 200);
 }
  }

  slotdata(today , lastday , p) {
                // this.lastDay = this.today;
     this.getBookedSlots(today, lastday, p);
  }
  getindividualSlotdata(daysname) {
    this.bookslot.BookedDate = daysname.Displaydate;
    this.bookslot.BookedDay = daysname.dayname;
    console.log(daysname);
    this.slotsdata = [];
   if (daysname.slots.length > 0) {
    this.slotsdata = daysname.slots;
   }

  }
  confirm(slotfromtime, slotdate, slotstotime) {
    this.backbuttonsts = true;
    this.Slotsdisplay = false;
    this.currentslotfromtime = slotfromtime;
    this.currentslotdate = slotdate;
    this.currentslottotime = slotstotime;
    // jQuery('#showslot').modal('hide');
  }

   confirmappointment() {
    this._Requestservice.getslotsbyguid(this.ChangeSlotId).subscribe(getres => {
      if (getres.data.BookingStatus === 'Booked') {
        this.backbuttonsts = false;
        // console.log(slottime+","+slotdate);
        // this.sucessmsg = false;
        this.newappointmentmodel.FromTime = this.currentslotfromtime;
        this.newappointmentmodel.ToTime = this.currentslottotime;
        this.newappointmentmodel.SlotDate = this.currentslotdate;
        this.newappointmentmodel.Guid = this.appointmentData.Guid;
        this.newappointmentmodel.PatientId = this.appointmentData.PersonId;
        this.newappointmentmodel.ProviderId = this.appointmentData.ProviderId;
        console.log(JSON.stringify(this.newappointmentmodel));
        this.sucessmsg = true;
        this._schedulerService.followupUser(this.newappointmentmodel).subscribe(
          res => {
            console.log(JSON.stringify(res));
            if (res.Success) {
            } else {
            }
          },
          err => console.log(err)
        );
      } else {
this.appointmentData = getres.data;
      }
    });
  }
  back() {
    this.isPrevious = true;
    this.sucessmsg = false;
    this.backbuttonsts = false;
    this.Slotsdisplay = true;
  }
  getBookedSlots(todaydate, lastdate, p) {
    // alert();
    console.log('radh');
    if (!this.prev) {
      this._schedulerService
        .getproviderBookedslots(
          moment(this.today, 'DD-MM-YYYY').format('DD-MMM-YYYY'),
          moment(this.lastDay, 'DD-MM-YYYY')
            .add(6, 'days')
            .format('DD-MMM-YYYY'),
          p.profile.Id
        )
        .subscribe(response => {
          this.Appointments = response.data;
          console.log(JSON.stringify(this.Appointments));
          this.getAvailableSlots(todaydate, lastdate, p);
        });
    } else {
      this._schedulerService
        .getproviderBookedslots(
          moment(this.today, 'DD-MM-YYYY').subtract(15, 'days').format('DD-MMM-YYYY'),
          moment(this.lastDay, 'DD-MM-YYYY')
            .add(6, 'days')
            .format('DD-MMM-YYYY'),
          p.profile.Id
        )
        .subscribe(response => {
          this.Appointments = response.data;
          console.log(JSON.stringify(this.Appointments));
          this.getAvailableSlots(todaydate, lastdate, p);
        });
    }
  }

  getAvailableSlots(todaydate, lastdate, p) {
    console.log(todaydate + ',' + lastdate);
    const excludeslottime = new Date();
    let slottimemorning: boolean;
    let slottimeafter: boolean;
    let slottimeevening: boolean;
    let availableSlots = [];
    p.emptySlots = [];
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
      let slotscounter = 0 ;
      console.log(p);
      for (let j = 0 ; j <= p.emptySlots.length - 1 ; j++) {
        if (p.emptySlots[j].slots.length === 0) {
          // console.log(slotscounter);
         slotscounter++;
        }
        if (slotscounter === 6) {
          this.lastDay = new Date(this.lastDay);
          // this.nextcount = 0;
         // this.carosal.isControls = true;
         availableSlots = [];
         if (this.nextavailabilitydt === '') {
          this.nextcount = 0;
          this.carosal.isControls = true;
         this.next(p) ;
         }
        }
       }
       availableSlots = [];
    }  else {
      this.lastDay.setDate(new Date(this.lastDay).getDate() + 1);
    }
    if (counter === 6) {
      this.lastDay = new Date(this.lastDay);
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
        // console.log('anuuuuuu'i+','+lastdate);
        slottimemorning = false;
        slottimeafter = false;
        slottimeevening = false;
        let weekdayname = i;
       //  console.log('for' + i);
        // console.log(p.profile.Settings.Workingdays, moment(i).format('dddd'));
        if (this.weekday(p.profile.Settings.Workingdays, moment(weekdayname).format('dddd'))) {
          counter++;
         //  console.log(i+','+counter);
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
          let slotscounter = 0 ;
          console.log(p);
          for (let j = 0 ; j <= p.emptySlots.length - 1 ; j++) {
            if (p.emptySlots[j].slots.length === 0) {
              console.log(slotscounter);
             slotscounter++;
            }
            if (slotscounter === 6) {
              this.today = new Date(i);
              // this.nextcount = 0;
             // this.carosal.isControls = true;
             availableSlots = [];
             if (this.nextavailabilitydt === '') {
              this.previouscount = 0;
              this.carosal.isControls = true;
             this.previous(p) ;
             }
            }
           }
          availableSlots = [];
        } else {
        }
        if (counter === 6) {
         // console.log('counter'+counter);
          this.today = new Date(i); console.log(this.today);
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
    console.log(moment(dayStart) + ',' + moment(new Date()));
    if (((settings.DisableSlots && settings.AvailableDates !== ''
      && settings.AvailableDates.includes(moment(dayStart, 'YYYY-MM-DD').format('DD-MMM-YYYY'))))
      || (settings.DisableSlots == false && ((startHr != 0 && endHr != 0) && (startHr != null && endHr != null)))) {
      if (moment(moment(dayStart, 'YYYY-MM-DD').format('YYYY-MM-DD')).isBefore(moment(new Date(), 'YYYY-MM-DD').format('YYYY-MM-DD')) || 
      (moment(new Date()).add(settings.EndInDays, 'days').isBefore(dayStart, 'day'))) {
        console.log(date.getDay());
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
     // console.log('Appointments');
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
  success(successmsg, type) {
    this._toast.ShowAlert(successmsg, '', 'Success');
    if (type === 'add') {
      // this.showslot.isShown.valueOf();
      this.showslot.hide();
    }
  }
  error(errormsg, type) {
    this._toast.ShowAlert(errormsg, '', 'Error');
    // this.disableButton = false;
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
