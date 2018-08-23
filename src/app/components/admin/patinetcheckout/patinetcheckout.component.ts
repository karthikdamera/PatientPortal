import { Component, OnInit, ViewContainerRef, ViewChild } from '@angular/core';
import { DatePipe, AsyncPipe } from '@angular/common';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Toast } from 'ng2-toastr/src/toast';
import { CheckOutService } from './checkoutservice';
import { ToastService } from '../../../shared/services/toastService';
declare var jQuery: any;
import { ModalDirective } from 'angular-bootstrap-md';
import * as moment from 'moment';
@Component({
  selector: 'app-patinetcheckout',
  templateUrl: './patinetcheckout.component.html',
  styleUrls: ['./patinetcheckout.component.scss'],
  providers: [CheckOutService, DatePipe, ToastService]
})
export class PatinetcheckoutComponent implements OnInit {
  patientDetails: any = [];
  postDateFormat = 'dd/MMM/yyyy';
  name: string;
  adminLoginData: any = []
  @ViewChild('checkoutBasic') public checkoutBasic: ModalDirective;
  patientdet = [{ 'name': 'Ravi Shankar', 'phoneno': '64665965649', 'color': 'red', 'splitnames': 'r s' },
  { 'name': 'Kayithi Naresh', 'phoneno': '64665965649', 'color': 'green', 'splitnames': '' },
  { 'name': 'Sai Kiran', 'phoneno': '64665965649', 'color': 'blue', 'splitnames': '' }];
  // temp: any = { 'AppointmentDateTime': '', 'CheckInDateTime': '', 'PersonId': '', 'AppointmentId': '', 'IsActive': true, 'Status': '' };

  temp: any = { 'CheckOutDateTime': '', 'ModifiedOn': '', 'ModifiedBy': '', 'AppointmentId': '', 'IsActive': true, 'Status': '' };


  userFilter: any = { PhoneNo: '', AppointmentNumber: '', Email: '', PatientName: '' };
  constructor(private checkoutservice: CheckOutService, private _toast: ToastService,
    public datepipe: DatePipe, public toastr: ToastsManager, vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.getBookedSlotDetails();
    this.adminLoginData = JSON.parse(localStorage.getItem('loginData'));
    // alert(this.patientDetails.PatientName)
  }
  getBookedSlotDetails() {
    this.patientDetails = [{
      'PatientName': '', 'ProviderName': '',
      'FromTime': '', 'ToTime': '', 'colorcode': '', 'firstname': '', 'lastname': ''
    }];
    let date: any;
    date = new Date();
    const currentdata = this.datepipe.transform(date, this.postDateFormat);
    return this.checkoutservice.getBookedSlotDetails(currentdata).subscribe(
      res => {
        this.patientDetails = res.data;
     //   console.log(JSON.stringify(this.patientDetails));
        for (let i = 0; i < this.patientDetails.length; i++) {
          // this.patientDetails[i].SlotDate = moment(this.patientDetails[i].SlotTime).format("MM/DD/YYYY");
          // this.patientDetails[i].Sloattime = moment(this.patientDetails[i].SlotTime).format("hh:mm A");
          var pname = this.patientDetails[i].PatientName;
          var p = pname.split(' ');
          var name = p[0];
          var pname = p[1];
          // console.log(name);
          this.patientDetails[i].firstname = name.substring(0, 1);
          if (pname !== '' || pname !== null || pname != undefined) {
            this.patientDetails[i].lastname = pname.substring(0, 1);
          }
          this.patientDetails[i].colorcode = 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')';

        }

        // console.log('patientDetails' + JSON.stringify(this.patientDetails));



      }

    );

  }
  checkin() {

    // console.log('post obj'+JSON.stringify(this.temp));
    this.checkoutservice.patientCheckinPost(this.temp).subscribe(
      res => {
        // console.log('res temp' + JSON.stringify(res));
        // this.getBookedSlotDetails();
        if (res.Success) {
          // this.barcodenumber.nativeElement.value = '';
          // this.userFilter.AppointmentNumber = '';
          // this.barcodenumber.nativeElement.focus();
          this.success('You are successfully Checkedout', 'checkout');
        } else {
          // this.error(res.data);
          this.error('You are not Checkedout', 'checkout');
          // console.log(res);
        }
      }
    );

  }
  patientcheckin(checkindata) {

    this.name = checkindata.FirstName + ' ' + checkindata.LastName;
    let date: any;
    date = new Date();
    const currentdata = this.datepipe.transform(date, this.postDateFormat);
    const currenttime = currentdata + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
    this.temp = {
      // AppointmentDateTime: checkindata.SlotTime,
      // CheckInDateTime: currenttime,
      // PersonId: checkindata.PatientId,
      CheckOutDateTime: currenttime,
      ModifiedOn: currenttime,
      ModifiedBy: this.adminLoginData.Id,
      AppointmentId: checkindata.BookedSlotId,
      IsActive: true,
      Status: 'CheckOut'
    };
    this.checkoutBasic.show();
    // jQuery('#PatientCheckIn').modal('show');
  }


  success(successmsg, type) {
    this._toast.ShowAlert(successmsg, '', 'Success');
    if (type === 'checkout') {
      this.checkoutBasic.hide();
    }
    this.getBookedSlotDetails();
    // if (type === 'update') {
    //     this.edit.hide();
    // }
    // this.GetPharma().add(() => {
    // });
  }
  error(errormsg, type) {
    this._toast.ShowAlert(errormsg, '', 'Error');
    if (type === 'checkout') {
      this.checkoutBasic.hide();
    }
  }
  // success(successmsg) {
  //   this.toastr.success(successmsg, null, {
  //     dismiss: 'controlled', showCloseButton: true,
  //     positionClass: 'toast-bottom-right', newestOnTop: true, progressBar: false,
  //     showEasing: 'swing', closeButton: false, 'preventDuplicates': false,
  //     'debug': false, 'hideEasing': 'linear',
  //     'showMethod': 'fadeIn',
  //     'hideMethod': 'fadeOut'
  //   }).then((toast: Toast) => {
  //     // this.getBookedSlotDetails();
  //     setTimeout(() => {
  //       this.toastr.dismissToast(toast);
  //     }, 3000);
  //   });
  // }
  // error(errormsg) {
  //   this.toastr.error(errormsg, null, {
  //     dismiss: 'controlled', showCloseButton: true,
  //     positionClass: 'toast-bottom-right', newestOnTop: true, progressBar: false,
  //     showEasing: 'swing', closeButton: false, 'preventDuplicates': false,
  //     'debug': false, 'hideEasing': 'linear',
  //     'showMethod': 'fadeIn',
  //     'hideMethod': 'fadeOut'
  //   }).then((toast: Toast) => {
  //     setTimeout(() => {
  //       this.toastr.dismissToast(toast);
  //     }, 3000);
  //   });
  // }
  ngAfterViewInit() {
    // this.barcodenumber.nativeElement.focus();
  }
  Cancelcheckin() {
    this.checkoutBasic.hide();
  }
}
