import { Component, OnInit, EventEmitter, Output, Input, ViewChild, ViewContainerRef } from '@angular/core';
import { Subject } from 'rxjs/Subject';
// import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { PatientBreathService } from './breath.service';
import { Toast } from 'ng2-toastr';
import { ToastsManager } from 'ng2-toastr';
import { ToastService } from '../../../shared/services/toastService';
import { ModalDirective } from 'angular-bootstrap-md';

@Component({
  selector: 'app-breath',
  templateUrl: './breath.component.html',
  styleUrls: ['./breath.component.scss'],
  providers: [PatientBreathService , ToastService]
})
export class BreathComponent implements OnInit {
  @ViewChild('edit') public edit: ModalDirective;
  
  @Output() patientbreath = new EventEmitter();
  obj = {
    id: 0,
    sid: 0,
    type: 'breath'
  };
  @Input() patientid: number;
  @Input() parentData: Subject<number>;
  userFilter: any = { Breath: '' };
  message: any;
  postStatus: any;
  clientid: number;
  client: any;
  user: any = {};
  closeResult;
  Status: string;
  breathItems: any = [];
  showLoader: boolean;
  onClickUpdate: any = {};
  onUpdateStatus: boolean = false;
  statusValue: any;
  updateId: number;
  scheduleDate: any;
  private _success = new Subject<string>();
  staticAlertClosed = false;
  constructor(private _toast: ToastService,private _breathService: PatientBreathService,
    public toastr: ToastsManager, vcr: ViewContainerRef) {
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
    this.parentData.subscribe(res => {
      // alert('res' + res);
      if (res != null) {
        this.patientid = res;
        console.log(this.patientid);
        this.getBreath();
      }

    });
    this.getBreath();
  }
  updateStatus(value) {
    this.statusValue = value;
    this.onUpdateStatus = true;
    // console.log(this.postStatus);
  }
  // open(content) {
  //   this.modalService.open(content).result.then((result) => {
  //     this.closeResult = `Closed with: ${result}`;
  //   }, (reason) => {
  //     this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  //   });
  // }
  // private getDismissReason(reason: any): string {
  //   if (reason === ModalDismissReasons.ESC) {
  //     return 'by pressing ESC';
  //   } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
  //     return 'by clicking on a backdrop';
  //   } else {
  //     return `with: ${reason}`;
  //   }
  // }
  getBreath() {
    this.clientid = 531;
    return this._breathService.getBreath(this.patientid)
      .subscribe(
        arg => {
          this.breathItems = arg.data;
          console.log('getting breath data' + (JSON.stringify(this.breathItems)));
          this.showLoader = false;
        });
  }
  updateBreath(breath, i) {
    this.onClickUpdate = breath;
    this.updateId = i;
    console.log(this.onClickUpdate);
  }

  postUpdatedStatus() {
    if (this.onUpdateStatus === false) {
      this.statusValue = this.onClickUpdate.Status;
    }
    const date = new Date();
    var monthName = '';
    monthName = this._breathService.getMonthname(date);
    this.scheduleDate = monthName + " " + new Date().getDate() + " " +
      new Date().getFullYear() + " " + new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds();
    // console.log(this.scheduleDate);
    // this.postStatus.Date=this.scheduleDate;
    this.postStatus = {
      BreathId: this.onClickUpdate.Id,
      ClientId: this.onClickUpdate.ClientId,
      TimeConsume: this.onClickUpdate.TimeConsume,
      Status: this.statusValue,
      Date: this.scheduleDate
    };
    // console.log(JSON.stringify(this.postStatus));
    this._breathService.breathUpdate(this.postStatus).subscribe(
      res => {
        console.log((JSON.stringify(res)));
        if (res.Success) {
          this.success(res.data,'add');
        } else {
          this.error(res.data,'err');
        }
      },
      err => console.log(err)
    );
    this.onUpdateStatus = false;
  }
  addbreath() {
    this.patientbreath.emit(this.obj);
  }
  /** to show Success messages */

  success(successmsg, type) {
    this._toast.ShowAlert(successmsg, '', 'Success');
    if (type === 'add') {
        this.edit.hide();
    }
    // if (type === 'update') {
    //     this.edit.hide();
    // }
    this.getBreath().add(() => {
    });
}
  /** to show error messages */

  error(errormsg, type) {
    this._toast.ShowAlert(errormsg, '', 'Error');
   // this.disableButton = false;
}


}

