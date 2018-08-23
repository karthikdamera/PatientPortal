import { Component, ViewContainerRef, AfterViewInit, ViewChild } from '@angular/core';
import { PatientService } from './patientservice.service';
import { OnInit } from '@angular/core/src/metadata/lifecycle_hooks';
import { DatePipe, AsyncPipe } from '@angular/common';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Toast } from 'ng2-toastr/src/toast';
declare var jQuery: any;
import { ModalDirective } from 'angular-bootstrap-md';
import { ToastService } from '../../../shared/services/toastService';
import { PatientCheckinPipe } from './PatientCheckinPipe';

@Component({
  moduleId: module.id,
  selector: 'app-patientcheckin',
  templateUrl: 'patientcheckin.component.html',
  styleUrls: ['patientcheckin.component.scss'],
  providers: [PatientService, DatePipe, ToastService]
})
export class PatientcheckinComponent implements AfterViewInit, OnInit {
  @ViewChild('barcodefocus') barcodenumber: any;
  @ViewChild('demoBasic') public demoBasic: ModalDirective;
  patientDetails: any = [];
  // colorcodes: any = ['','','','',];
  page: Number = 1;
  splitname = [];
  adminLoginData: any = [];
  userFilter:string;
  patientdet = [{ 'name': 'Ravi Shankar', 'phoneno': '64665965649', 'color': 'red', 'splitnames': 'r s' },
  { 'name': 'Kayithi Naresh', 'phoneno': '64665965649', 'color': 'green', 'splitnames': '' },
  { 'name': 'Sai Kiran', 'phoneno': '64665965649', 'color': 'blue', 'splitnames': '' }];

  // userFilter: any = { PhoneNo: '', AppointmentNumber: '', Email: '', PatientName: '' };
  postDateFormat = 'dd/MMM/yyyy';
  temp: any = {
    'AppointmentDateTime': '', 'CheckInDateTime': '', 'PersonId': '', 'AppointmentId': '',
    'IsActive': true, 'Status': '', 'CreatedOn': '', 'CreatedBy': ''
  };
  name: string;
  constructor(private _toast: ToastService, private patientservice: PatientService, public datepipe: DatePipe,
    public toastr: ToastsManager, vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
  }
  ngOnInit() {
    //  this.getPatientDetails();
    this.adminLoginData = JSON.parse(localStorage.getItem('loginData'));
    this.getBookedSlotDetails();
  }

  barcodecheck(barcodenumber) {
    let data: any = [];
 //   console.log(barcodenumber.length);
    if (barcodenumber.length === 13) {
      // alert(barcodenumber);
      data = this.patientDetails.filter(
        filterID => filterID.AppointmentNumber === barcodenumber
      );
    //  console.log(data);
      if (data.length > 0) {
        // alert(data[0].CheckIn);
        if (data[0].CheckIn === 'false') {
          this.patientcheckin(data[0]);
        }
      }
    }
  }

  // getPatientDetails() {

  //     return this.patientservice.getPatientDetails().subscribe(
  //         res => {
  //             console.log(JSON.stringify(this.patientDetails = res.data));
  //         }
  //     );
  // }

  getBookedSlotDetails() {
    this.patientDetails = [{
      'PatientName': '', 'ProviderName': '', 'FromTime': '', 'ToTime': '',
      'colorcode': '', 'firstname': '', 'lastname': ''
    }]
    // alert(this.patientDetails.length);

    let date: any;
    date = new Date();
    const currentdata = this.datepipe.transform(date, this.postDateFormat);
    return this.patientservice.getBookedSlotDetails(currentdata).subscribe(
      res => {
        this.patientDetails = res.data;
        // for(let i=0; i< this.patientDetails.length ; i++){
        //     var pname = this.patientDetails[i].PatientName;
        //     var p=pname.split(' ');
        //     var name=p[0];
        //     var pname=p[1];
        //     this.patientDetails[i].PatientName = name.substring(0, 1);
        //     this.patientDetails[i].splitname = pname.substring(0, 1);
        //     this.patientDetails.colorcode = 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')';


        // }
        for (let i = 0; i < this.patientDetails.length; i++) {
          var pname = this.patientDetails[i].PatientName;
          var p = pname.split(' ');
          var name = p[0];
          var pname = p[1];
      //    console.log(name);
          this.patientDetails[i].firstname = name.substring(0, 1);
          if (pname !== '' || pname !== null || pname != undefined) {
            this.patientDetails[i].lastname = pname.substring(0, 1);
          }
          this.patientDetails[i].colorcode = 'rgb(' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ',' + (Math.floor(Math.random() * 256)) + ')';

        }
     //   console.log(JSON.stringify(this.patientDetails));



      }

    );

  }
  checkin() {
 //   console.log('this.temp check in' + JSON.stringify(this.temp));
    this.patientservice.patientCheckinPost(this.temp).subscribe(
      res => {
        // console.log((JSON.stringify(res)));
        // this.getBookedSlotDetails();
        if (res.Success) {
          // this.barcodenumber.nativeElement.value = '';
          // this.userFilter.AppointmentNumber = '';
          // this.barcodenumber.nativeElement.focus();
          this.success('You are successfully CheckedIn', 'checkin');
        } else {
          this.error('You are not CheckedIn', 'checkin');
     //     console.log(res);
        }
      }
    );

  }
  patientcheckin(checkindata) {
    // alert(checkindata);

    this.name = checkindata.FirstName + ' ' + checkindata.LastName;
    let date: any;
    date = new Date();
    const currentdata = this.datepipe.transform(date, this.postDateFormat);
    const currenttime = currentdata + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
    this.temp = {
      AppointmentDateTime: checkindata.SlotTime,
      CheckInDateTime: currenttime,
      PersonId: checkindata.PatientId,
      AppointmentId: checkindata.BookedSlotId,
      IsActive: true,
      Status: 'CheckIn',
      CreatedOn: currenttime,
      CreatedBy: this.adminLoginData.Id
    };
    this.demoBasic.show();
    // jQuery('#PatientCheckIn').modal('show');
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
  //     this.getBookedSlotDetails();
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
  success(successmsg, type) {
    this._toast.ShowAlert(successmsg, '', 'Success');
    if (type === 'checkin') {
      this.demoBasic.hide();
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
    if (type === 'checkin') {
      this.demoBasic.hide();
    }
  }
  ngAfterViewInit() {
    // this.barcodenumber.nativeElement.focus();
  }
  Cancelcheckin() {
    this.demoBasic.hide();
  }
}
