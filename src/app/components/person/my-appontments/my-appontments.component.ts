import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { AppointmentService } from './my-appointment.service';
import { Route } from '@angular/router/src/config';
import { Router, NavigationExtras } from '@angular/router';
import { SlotbookingService } from '../../admin/slot-booking/slot-booking.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Toast } from 'ng2-toastr/src/toast';
import { DatePipe, AsyncPipe } from '@angular/common';
declare var jQuery: any;
import { PersonComponent } from '../person.component';
@Component({
  selector: 'app-my-appontments',
  templateUrl: './my-appontments.component.html',
  styleUrls: ['./my-appontments.component.scss'],
  providers: [AppointmentService, SlotbookingService, DatePipe]
})
export class MyAppontmentsComponent implements OnInit {
  page: number = 1;
  postDateFormat = 'dd/MMM/yyyy';
  patientData: any = {};
  appointmentData: any = [];
  slotid: number;
  windowWidth: number;
  slotdate: any;
  backbtn: any;
  slotfromtime: any;
  myapponment:boolean;
  model: any = { 'PatientId': '', 'slotdate': '', 'slotfromtime': '', 'slottotime': '', 'providername': '', 'bookedslotID': '', 'Reason': ''};
  routingobject: any = { 'bookedslotID': '' };

  constructor(private _myappointmnetService: AppointmentService, private route: Router, public _slotbookingService: SlotbookingService,
    public toastr: ToastsManager, vcr: ViewContainerRef, public datepipe: DatePipe, public _personcomponent: PersonComponent) {
    this.patientData = JSON.parse(localStorage.getItem('loginData'));
    this.toastr.setRootViewContainerRef(vcr);
    this.backbtn = localStorage.getItem("backbtn");
    this.myapponment=true;
  }

  ngOnInit() {
    // throw new Error("Method not implemented.");
    this.getAllMyappointmnets();
    localStorage.removeItem('backbtn');
  }
  getAllMyappointmnets() {
    let date: any;
    date = new Date();
    const currentdata = this.datepipe.transform(date, this.postDateFormat);
    const currenttime = currentdata + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
    return this._myappointmnetService.GetAppoinments(this.patientData.Id, currenttime).subscribe(
      res => {
       // console.log('appointmnet data' + (JSON.stringify(this.appointmentData = res.data)));
        this.appointmentData = res.data;
        this.model.PatientId = this.patientData.Id;
      }
    );
  }
  cancelData(slotinfo) {
    this.model.bookedslotID = slotinfo.Id;
    this.model.slotdate = slotinfo.Date;
    this.model.slotfromtime = slotinfo.FromTime;
    this.model.slottotime = slotinfo.ToTime;
    this.model.providername = slotinfo.ProviderName;
    this.model.Reason = slotinfo.Reason;
     // tslint:disable-next-line:radix
     this.windowWidth = parseInt( localStorage.getItem('windowWidth'));
     //  console.log( this.windowWidth + ',' + this.navWindowWidth);
     // console.log(this.windowWidth < this.navWindowWidth);
  if (this.windowWidth < 1270) {
     this._personcomponent.Popupopenclose('open');
 }

    // jQuery('#CancelAppointmentInPerson').modal('show');
  }
  cancelappointment() {
    // alert(this.model.bookedslotID);
    const InputInfo = {
      PersonId: this.model.PatientId,
      BookedSlotId: this.model.bookedslotID,
      Reason: this.model.Reason
    };
  // console.log(JSON.stringify(this.model));
    this._slotbookingService.cancelAppointment(InputInfo).subscribe(
      res => {
    //    console.log((JSON.stringify(res)));
        if (res.Success) {
          this.success('Your Appointment has been canceled');
          // tslint:disable-next-line:radix
     this.windowWidth = parseInt( localStorage.getItem('windowWidth'));
          if (this.windowWidth < 1270) {
            this._personcomponent.Popupopenclose('close');
        }
        } else {
          this.error(res.data);
      //    console.log(res);
        }
      }
    );
  }
  toclear() {
    // tslint:disable-next-line:radix
    this.windowWidth = parseInt( localStorage.getItem('windowWidth'));
    if (this.windowWidth < 1270) {
      this._personcomponent.Popupopenclose('close');
  }
  }
  scheduleAppointment() {
    let navigation: NavigationExtras = {
      queryParams: {
        'isshowrating':this.myapponment
      },
      skipLocationChange: true
    };

    this.route.navigate(['./person/schedulerlogin'],navigation);
  }

  ScheduleRouting(slotinfo) {
    this.routingobject.bookedslotID = slotinfo.Id;
    //  this.routingobject.slotdate = slotinfo.Date;
    //  this.routingobject.slotfromtime = slotinfo.FromTime;
    //  this.routingobject.slottotime = slotinfo.ToTime;
    //  this.routingobject.providername = slotinfo.ProviderName;
    let navigation: NavigationExtras = {
      queryParams: {
        'ChangeSlotId': this.routingobject.bookedslotID,
        'isshowrating':this.myapponment
      }, skipLocationChange: true
    };
    this.route.navigate(['./person/schedulerlogin'], navigation);
    // alert(JSON.stringify(navigation));
  }
  showbackbtn() {
    localStorage.removeItem('backbtn');
  }
  addnewappt() {
    this.route.navigate(['./person/schedulerlogin']);
  }
  /** Toast messages for success and failure */
  success(successmsg) {
    this.toastr.success(successmsg, null, {
      dismiss: 'controlled', showCloseButton: true,
      positionClass: 'toast-bottom-right', newestOnTop: true, progressBar: false,
      showEasing: 'swing', closeButton: false, 'preventDuplicates': false,
      'debug': false, 'hideEasing': 'linear',
      'showMethod': 'fadeIn',
      'hideMethod': 'fadeOut'
    }).then((toast: Toast) => {
      this.getAllMyappointmnets();
      setTimeout(() => {
        this.toastr.dismissToast(toast);
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
      }, 3000);
    });
  }
  conform() {

  }

}
