import { Dashboard } from './../../../models/dashboard.model';
import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
import { StaffService } from '../profile/profile.service';
import { adminstaff } from '../../../models/person-slot.model';
import { AdminDashboardModel } from '../../../models/admindashboard.model';
import { AdminDashboardService } from './admindasboard.service';
import { IMyDpOptions } from 'mydatepicker';
import { DatePipe, AsyncPipe } from '@angular/common';
import { INgxMyDpOptions, IMyDateModel, IMyInputFieldChanged, IMyDate } from 'ngx-mydatepicker';
import { NgxMyDatePickerDirective } from 'ngx-mydatepicker';
import { Toast } from 'ng2-toastr/src/toast';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { MaskedDate } from '../../../shared/services/datemask';
import { ToastService } from '../../../shared/services/toastService';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss'],
  providers: [DatePipe, AdminDashboardService, ToastService]
})
export class AdminDashboardComponent implements OnInit {
  @ViewChild('selectdate') ngxdp: NgxMyDatePickerDirective;
  adminlogindata: any = {};
  profileInfo: adminstaff;
  profileimage: string;
  imageshow: boolean;
  adminDashboardCounts: Dashboard;

  chartType: string = 'bar';
  date: Date = new Date();
  postDateFormat = 'dd/MMM/yyyy';
  validdate: boolean;
  today: string;
  result: any = [];
  enterdatests: boolean;
  ProgressChart: any = [];
  dateMask = MaskedDate;
  chartDatasets: Array<any> = [
    { data: [], label: '' }
  ];

  // chartLabels: Array<any> = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
  chartLabels: Array<any> = [];

  chartColors: Array<any> = [
    {
      backgroundColor: 'rgba(3,168,243,1)',
      borderColor: 'rgba(220,220,220,1)',
      borderWidth: 0,
      pointBackgroundColor: 'rgba(220,220,220,1)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(220,220,220,1)'
    }
    // ,
    // {
    //   backgroundColor: 'rgba(3,168,243,0.2)',
    //   borderColor: 'rgba(151,187,205,1)',
    //   borderWidth: 0,
    //   pointBackgroundColor: 'rgba(151,187,205,1)',
    //   pointBorderColor: '#fff',
    //   pointHoverBackgroundColor: '#fff',
    //   pointHoverBorderColor: 'rgba(151,187,205,1)'
    // }
  ];
  chartOptions: any = {
    responsive: true,
    scales: {
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  };

  dashBoardCounts: Array<AdminDashboardModel>;



  public pieChartType: string = 'pie';

  public pieChartData: Array<any> = [];

  // public pieChartLabels: Array<any> = ['Cancelled', 'Booked', 'No shows', 'Check-in'];
  public pieChartLabels: Array<any> = ['Cancelled', 'Booked', 'No shows', 'Check-in'];
  public pieChartColors: Array<any> = [{
    hoverBorderColor: ['rgba(0, 0, 0, 0.1)', 'rgba(0, 0, 0, 0.1)', 'rgba(0, 0, 0, 0.1)', 'rgba(0, 0, 0, 0.1)'],
    hoverBorderWidth: 0,
    backgroundColor: ['#F7464A', '#46BFBD', '#FDB45C', '#847f79'],
    hoverBackgroundColor: ['#FF5A5E', '#5AD3D1', '#FFC870', '#847f79']
  }];

  public pieChartOptions: any = {
    responsive: true
  };
  model: any = { 'selectdate': '', 'changeselectdate': '' };

  myOptions: INgxMyDpOptions = {
    // other options...
    dateFormat: 'mm/dd/yyyy',
    disableWeekends: true,
    firstDayOfWeek: 'mo',
    markCurrentDay: true,
    disableHeaderButtons: true,
    // disableUntil: { year: this.date.getFullYear(), month: this.date.getMonth() + 1, day: this.date.getDate() - 1 },
    selectorHeight: '232px',
    selectorWidth: '330px'
  };
  chartFromDate: string;
  chartToDate: string;
  constructor(private _toast: ToastService, private _staffService: StaffService, public datepipe: DatePipe,
    private _dashboardService: AdminDashboardService,
    public toastr: ToastsManager,
    vcr: ViewContainerRef, ) {
    this.toastr.setRootViewContainerRef(vcr);
    this.adminDashboardCounts = new Dashboard();
    this.adminlogindata = JSON.parse(localStorage.getItem('loginData'));
    this.profileimage = '';
    this.profileInfo = new adminstaff();
    this.dashBoardCounts = new Array<AdminDashboardModel>();
    this.validdate = false;
    this.chartFromDate = '';
    this.chartToDate = '';
  }

  ngOnInit() {
    this.adminlogindata = JSON.parse(localStorage.getItem('loginData'));
    this.getProfile();
    this.getDashBoardCounts();
    this.getChartDates('Today');
  //   setTimeout(() => {
  //     this.getChartDates('Today');
  // });
  }



  public chartClicked(e: any): void {

  }

  public chartHovered(e: any): void {

  }


  getProfile() {
    this._staffService.getadminProfile(this.adminlogindata.Id).subscribe(
      res => {
       // console.log('dashboard profile info' + (JSON.stringify(this.profileInfo = res.data)));
        this.profileInfo = res.data;
        this.profileInfo = res.data;
        // this.profileimage = 'data:image/jpeg;base64,' + this.profileInfo.ImageUrl;
        this.profileimage = this.profileInfo.ImageUrl += '?random+\=' + Math.random();
   //  console.log('get obj of admin profile' + '   ' + JSON.stringify(this.profileInfo));
        if (this.profileimage === '') {
          this.imageshow = true;
        } else {
          this.imageshow = false;
        }
      }

    );

  }


  getDashBoardCounts() {
    const today = new Date();
    const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July',
      'August', 'September', 'October', 'November', 'December'];
    const thisMonth = months[today.getMonth()];
    // getMonth method returns the month of the date (0-January :: 11-December)
    const fDate = today.getDate() + '/' + thisMonth + '/' + today.getFullYear();
    const fromDate: string = fDate + ' 00:00';
    const toDate: string = fDate + ' 23:59';

    this._staffService.getDashBoardCounts(fromDate, toDate).subscribe(
      res => {
        this.adminDashboardCounts = res.data;
    //    console.log(this.adminDashboardCounts);


        let TodayAppointments = new AdminDashboardModel();
        TodayAppointments.openTitle = 'Today Appointments';
        TodayAppointments.closedTitle = 'Check-IN';
        TodayAppointments.openCount = this.adminDashboardCounts.AppointmentCount;
        TodayAppointments.closedCount = this.adminDashboardCounts.CheckinCount;
        TodayAppointments.navigateUrl = '/admin/patientcheckin';
        TodayAppointments.openCountCssClass = '';
        this.dashBoardCounts.push(TodayAppointments);

        let Checkins = new AdminDashboardModel();
        Checkins.openTitle = 'Appointments Checked-in';
        Checkins.closedTitle = 'Completed';
        Checkins.openCount = this.adminDashboardCounts.CheckinCount;
        Checkins.closedCount = this.adminDashboardCounts.CheckoutCount;
        Checkins.navigateUrl = '/admin/patientcheckout';
        Checkins.openCountCssClass = 'appointment-number';
        this.dashBoardCounts.push(Checkins);

        let TwilioCounts = new AdminDashboardModel();
        TwilioCounts.openTitle = 'Twilio';
        TwilioCounts.closedTitle = 'Completed';
        TwilioCounts.openCount = 0;
        TwilioCounts.closedCount = 0;
        TwilioCounts.navigateUrl = '/admin/chats';
        TwilioCounts.openCountCssClass = 'twilio-number';
        this.dashBoardCounts.push(TwilioCounts);

        let RequestsCount = new AdminDashboardModel();
        RequestsCount.openTitle = 'Requests';
        RequestsCount.closedTitle = 'Completed';
        RequestsCount.openCount = this.adminDashboardCounts.NoOfRequests;
        RequestsCount.closedCount = this.adminDashboardCounts.NoOfApprovedRequests;
        RequestsCount.navigateUrl = '/admin/admin-requests';
        RequestsCount.openCountCssClass = 'requests-number';
        this.dashBoardCounts.push(RequestsCount);
      });
  }

  public pieChartClicked(e: any): void {

  }

  public pieChartHovered(e: any): void {

  }

  // Calendar
  onDateChanged(event: IMyDateModel): void {
    this.model.selectdate = event.formatted;
    this.model.changeselectdate = this.datepipe.transform(this.model.selectdate, 'dd/MMM/yyyy');
  //  console.log(this.model.changeselectdate);
    // this.getAppointmentHistoryChart(this.model.changeselectdate);
  }

  onInputFieldDobChanged(event: IMyInputFieldChanged) {
    this.validdate = false;
    // this.ngxdp.clearDate();
    // console.log('IMyInputFieldChanged' + JSON.stringify(event.value) + ',' + event.value.length + ',' + event.valid);
    this.enterdatests = false;
    if (event.value.length >= 1) {
      //   this.convertDateFormate(event.value);
      this.enterdatests = true;
      this.today = 'Today';
    }
     if(event.value.length === 0){
      this.getChartDates('Today');
    //   setTimeout(() => {
    //     this.getChartDates('Today');
    // });
    } else {
      this.today = '';
    }
    // this.today = '';
 //   console.log('IMyInputFieldChanged' + JSON.stringify(event.value) + ',' + event.value.length + ',' + event.valid);
    if (event.value.length === 10) {
      this.validdate = event.valid;
  //    console.log(this.validdate);
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
      // alert(this.datepipe.transform(selectedDate, 'dd/MMM/yyyy'));
      // alert(event.value);
  //    console.log('dobmodal' + JSON.stringify(dobmodal));
      if (this.validdate) {
        this.onDateChanged(dobmodal);
        this.chartFromDate = this.datepipe.transform(selectedDate, this.postDateFormat) + ' 00:00';
        this.chartToDate = this.datepipe.transform(selectedDate, this.postDateFormat) + ' 23:59';
   //     console.log(this.chartFromDate);
        //serrvice call
        this.getChartInfo();
      } else {
        this.error('Please click on calender icon and select date.', 'date');
        this.ngxdp.clearDate();
      }

    }

  }
  error(errormsg, type) {
    this._toast.ShowAlert(errormsg, '', 'Error');
    // this.toastr.error(errormsg, null, {
    //   dismiss: 'controlled', showCloseButton: true,
    //   positionClass: 'toast-bottom-right', newestOnTop: true, progressBar: false,
    //   showEasing: 'swing', closeButton: false, 'preventDuplicates': false,
    //   'debug': false, 'hideEasing': 'linear',
    //   'showMethod': 'fadeIn',
    //   'hideMethod': 'fadeOut'
    // }).then((toast: Toast) => {
    //   setTimeout(() => {
    //     this.toastr.dismissToast(toast);
    //   }, 2000);
    // });
  }

  // Today,week1,week2 ,Month

  getChartDates(value) {
    //  alert(value);
    this.model = { 'selectdate': '', 'changeselectdate': '' };
    this.today = value;
    if (value === 'Today') {
      // this.chartLabels = [];
      // this.chartLabels.push(this.datepipe.transform(new Date(), this.postDateFormat));
      // // this.result=new Date()
      // alert(this.chartLabels);
      let today: any = new Date();
      // let dd = today.getDate();
      // let mm = today.getMonth() + 1; // January is 0
      // const yyyy = today.getFullYear();
      // if (dd < 10) {
      //   dd = '0' + dd;
      // }
      // if (mm < 10) {
      //   mm = '0' + mm;
      // }
      // const monthName = this._dashboardService.getMonthName(today);
      // today = monthName + '/' + dd + '/' + yyyy;
    //  console.log(today);


      this.chartFromDate = this.datepipe.transform(today, this.postDateFormat) + ' 00:00';
      this.chartToDate = this.datepipe.transform(today, this.postDateFormat) + ' 23:59';

    } else if (value === 'WeekOne') {
      // this.chartLabels = [];
      // this.ChartXaxisDates(value);

      const oneWeekAgo = new Date();
      const oneweek = oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
      const totime = this.datepipe.transform(new Date(), this.postDateFormat) + ' 23:59';
      const fromtime = this.datepipe.transform(oneweek, this.postDateFormat) + ' 00:00';
      // alert(fromtime + '  ' + totime);


      this.chartFromDate = fromtime;
      this.chartToDate = totime;

    } else if (value === 'WeekTwo') {
      // alert(value);
      // this.chartLabels = [];
      // this.ChartXaxisDates(value);

      const oneWeekAgo = new Date();
      oneWeekAgo.setDate(oneWeekAgo.getDate() - 14);
      const totime = this.datepipe.transform(new Date(), this.postDateFormat);
      const fromtime = this.datepipe.transform(oneWeekAgo, this.postDateFormat);
      // alert(fromtime + 'cc  ' + totime)



      this.chartFromDate = fromtime + ' 00:00';
      this.chartToDate = totime + ' 23:59';
    } else if (value === 'month') {

      // const onemonth = new Date();
      // const monthday:any=onemonth.getMonth();
      // onemonth.setDate(monthday - 1);
      // alert(onemonth)
      const d = new Date();
   //   console.log(d.toLocaleDateString());
      const mnth = d.setMonth(d.getMonth() - 1);
   ///   console.log(d.toLocaleDateString());
      const totime = this.datepipe.transform(new Date(), this.postDateFormat);
      const fromtime = this.datepipe.transform(mnth, this.postDateFormat);
      // alert(fromtime + '  ' + totime)


      this.chartFromDate = fromtime + ' 00:00';
      this.chartToDate = totime + ' 23:59';
    }

    //serrvice call
    this.getChartInfo();

  }


  ChartXaxisDates(value) {
    this.chartLabels = [];
    if (value === 'WeekOne') {
      for (let i = 0; i < 7; i++) {
        let d = new Date();
        d.setDate(d.getDate() - i);
        const totime = this.datepipe.transform(d, this.postDateFormat);
        this.chartLabels.push(totime)
      }
      this.chartLabels.join(',');
  //    console.log(this.chartLabels)
    } else if (value === 'WeekTwo') {
      for (let i = 0; i < 14; i++) {
        let d = new Date();
        d.setDate(d.getDate() - i);
        const totime = this.datepipe.transform(d, this.postDateFormat);
        this.chartLabels.push(totime)
      }
      this.chartLabels.join(',');
   //   console.log(this.chartLabels)
    } else if (value === 'month') {

    }
  }
  getChartInfo() {
    // alert();
    // this.chartFromDate= 'May/29/2018 00:00';
    //  this.chartToDate = 'May/29/2018 23:59';
    return this._dashboardService.getProgressChart(this.chartFromDate, this.chartToDate)
      .subscribe(arg => {
        this.ProgressChart = arg.data;
    //    console.log(JSON.stringify(this.ProgressChart));
        // console.log(JSON.stringify((this.ProgressChart.bar.chartLables)));
        this.chartLabels = this.ProgressChart.bar.chartLables;
        this.chartDatasets[0].data = this.ProgressChart.bar.chartDatasets.data;
        this.chartDatasets[0].label = this.ProgressChart.bar.chartDatasets.label;

        this.pieChartLabels = this.ProgressChart.pie.pieChartLabels;
        this.pieChartData = this.ProgressChart.pie.pieChartData;
    //    console.log(this.pieChartLabels)

        // this.LoadAggregateAppointmentsLineChart();chartDatasets
        // chartDatasets: Array<any> = [
        //   { data: [], label: '' }
        // ];

      });
  }
}
