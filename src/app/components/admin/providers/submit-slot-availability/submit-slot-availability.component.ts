import { Component, OnInit, ViewChild, ViewContainerRef } from '@angular/core';
 import { Http, Response } from '@angular/http';
import * as moment from 'moment';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Toast } from 'ng2-toastr/src/toast';
import { Slotavailability, AvailableSlots, GetcallObj } from '../../../../models/providers.model';
import { ProvidersService } from '../providers.service';
import { Observable } from 'rxjs';
import { DatePipe } from '@angular/common';
import { OrderBy } from '../../../../shared/services/orderformatPipe';

@Component({
  selector: 'app-submit-slot-availability',
  templateUrl: './submit-slot-availability.component.html',
  styleUrls: ['./submit-slot-availability.component.scss'],
  providers: [ProvidersService, DatePipe]
})
export class SubmitSlotAvailabilityComponent implements OnInit {
  @ViewChild('csvfile') choosefile: any;
  sloavailabilityModel: Slotavailability;
  availableslots: AvailableSlots;
  storage: any;
  filestatus: boolean;
  filename: string;
  Template: any;
  timeslots = [];
  SlotsData = [];
  csvData: any = [];
  page: number;
  orderpipr: OrderBy;
  validateslots = [];
  slotstime: string;
  slotetime: string;
  slotdate: string;
  validatedata: boolean;
  getcalObj: GetcallObj;
  fileReaded: any;
  slidsImage: any = [];
  post: string;
  constructor(private http: Http,
    public toastr: ToastsManager, vcr: ViewContainerRef,
    private _providersService: ProvidersService, public datepipe: DatePipe , private datePipe: DatePipe) {
    this.toastr.setRootViewContainerRef(vcr);
    this.storage = '';
    this.filestatus = true;
    this.filename = '';
    this.Template = '';
    this.validatedata = true;
    this.orderpipr = new OrderBy();
    this.sloavailabilityModel = new Slotavailability();
    this.getcalObj = new GetcallObj();
    this.availableslots = new AvailableSlots();
    this.page = 1;
  }

  ngOnInit() {
    // ProviderId
    this.storage = JSON.parse(localStorage.getItem('providerData'));
    this.getAvailableSlotData();
  }
  changeListener($event) {
    this.filestatus = false;
    if ($event.target !== undefined) {
      var allowedExtensions = /(\.csv)$/i;
      if (!allowedExtensions.exec($event.srcElement.value)) {
            this.error('Please upload file having extensions .csv only.');
            return false;
      } else {
          this.readThis($event.target);
      }
    }
  }
  readThis(inputValue: any): void {

    this.csvData = [];
    this.Template = '';
    let file: File = inputValue.files[0];
    if (file.name !== undefined) {
      this.filename = file.name;
    }
    let myReader: FileReader = new FileReader();
    myReader.readAsText(file);
    myReader.onloadend = (e) => {
      this.Template = myReader.result;
       this.extractData (this.Template);
    };
  }
  downloadtemplate(data: any) {
    const datename = moment(new Date()).format('YYYY-MM-DD HH:mm');
    const col1 = 'Date' + '\,';
    const col2 = 'Duration' + '\,';
    const col3 = 'AvailableTimes' + '\n';
    const ans1 = '01-Jan-1900' + '\,';
    const ans2 = '30' + '\,';
    const ans3 = '09:00 AM;10:00 AM;11:30 AM;03:00 PM;03:30 PM' + '\n';
    const ans4 = '02-Jan-1900' + '\,';
    const ans5 = '15' + '\,';
    const ans6 = '08:30 AM;8:45 AM;11:15 AM;01:00 PM;02:00 PM;02:15 PM;06:15 PM';
    let blob = new Blob([col1, col2, col3, ans1, ans2, ans3 , ans4 , ans5 , ans6 ], { type: 'csv' });
    let url = window.URL.createObjectURL(blob);
    if (navigator.msSaveOrOpenBlob) {
      navigator.msSaveBlob(blob, 'Availability_slots_' + datename + '.csv');
    } else {
      let a = document.createElement('a');
      a.href = url;
      a.download = 'Availability_slots_' + datename + '.csv';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    }
    window.URL.revokeObjectURL(url);
  }
  clear() {
    this.choosefile.nativeElement.value = '';
    this.filename = '';
  }

  private extractData(fileInput: any) {
    let allTextLines = fileInput.split(/\r\n|\n/);
    let headers = allTextLines[0].split(',');
    let lines = [];
    for (let i = 0; i < allTextLines.length; i++) {
      this.validateslots = [];
      if (i > 0) {
        let data = allTextLines[i].split(',');
        if (data.length == headers.length) {
        this.availableslots = new AvailableSlots();
          this.availableslots.date = moment(data[0], 'DD-MMM-YYYY').format('DD-MMM-YYYY');;
          this.availableslots.duration = data[1];
          this.availableslots.AvailableTimes = data[2];
          lines.push(this.availableslots);
        }
      }
    }
     this.csvData = lines;
    if (lines.length > 0) {
    this.sloavailabilityModel.ProviderId = this.storage.ProviderId;
    this.sloavailabilityModel.AvailableSlots = lines;
    this._providersService.postAvailableSlotData(this.sloavailabilityModel).subscribe( arg => {
        if (arg.Success) {
          this.success(arg.data);
        } else {
          this.error(arg.data);
        }
      },
      err => console.log(err)
   );
  } else {
    this.error('There is no data to this template:' + this.filename);
 // };
}
  }
  getAvailableSlotData() {
    this.getcalObj.date = moment(new Date()).format('DD-MMM-YYYY');
    this.getcalObj.ProviderId = this.storage.ProviderId;
    this._providersService.getAvailableSlotData(this.getcalObj).subscribe(arg => {
      if (arg.Success) {
        this.csvData = arg.data != null ? arg.data.Rows : [];
      }
    });
  }
  success(successmsg) {

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
        this.getAvailableSlotData();
      }, 2000);
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
      }, 5000);
    });
  }
  public sortByDueDate(myArray): void {
    if (myArray.length - 1) {
   // console.log(JSON.stringify(myArray));
    myArray.sort((a, b) => {
      if (b != undefined) {
      let dateA: any;
      dateA = moment(a, 'HH:mm a');
      let dateB: any;
      dateB = moment(b, 'HH:mm a');
   //   console.log(dateA+','+dateB);
    //  console.log(dateA > dateB);
      if (dateA > dateB) {
        return 1;
    } else if (dateA < dateB) {
        return -1;
    } else {
        return 0;
    }
  }
    });
   // return myArray;
  }
 }
 public itemsToString(value: Array<any> = []): string {
  return value
    .map((item: any) => {
      return item;
    })
    .join(';');
}
}
