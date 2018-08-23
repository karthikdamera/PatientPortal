import { Toast, ToastsManager } from 'ng2-toastr';

import { Component, OnInit, Input, ViewChild, EventEmitter, Output, ViewContainerRef } from '@angular/core';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
declare var jQuery: any;
import { Observable } from 'rxjs/Rx';
import { Subject } from 'rxjs/Subject';
import { debounceTime } from 'rxjs/operator/debounceTime';
import { Router } from '@angular/router';
import { ActivityService } from './activities.service';
import { ToastService } from '../../../shared/services/toastService';
import { ModalDirective } from 'angular-bootstrap-md';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.component.html',
  styleUrls: ['./activities.component.scss'],
  providers: [ActivityService , ToastService]
})
export class ActivitiesComponent implements OnInit {
 
  @ViewChild('edit') public edit: ModalDirective;
  insstatus: boolean;
  @Output() getActiviesCall = new EventEmitter();
  obj = {
    id: 0,
    sid: 0,
    type: 'Activities'
  };
  @Input() patientid: number;
  @Input() parentData: Subject<number>;
  userFilter: any = { Activity: '' };
  message: any;
  postStatus: any;
  clientid: number;
  client: any;
  user: any = {};
  closeResult;
  Status: string;
  updateId: number;
  scheduleDate: any;
  activityItems: any = [];
  // showLoader: boolean;
  onClickUpdate: any = {};
  private _success = new Subject<string>();
  staticAlertClosed = false;
  onUpdateStatus: Boolean = false;
  statusValue: any;
  ngOnInit(): void {
    this.parentData.subscribe(res => {
      // alert('res' + res);
      if (res != null) {
        this.patientid = res;
      //  console.log(this.patientid);
        this.getActivities();
      }

    });
    this.getActivities();
  }

  addactivities() {
    // alert();
    this.getActiviesCall.emit(this.obj);
    // this.router.navigate(['/admindashboard/addactivities']);
  }
  updateStatus(value) {
    this.statusValue = value;
    this.insstatus = false;
    // console.log(this.postStatus);
  }
  constructor(private _toast: ToastService,private router: Router, public toastr: ToastsManager,
    vcr: ViewContainerRef, private _activityService: ActivityService, ) {
    this.insstatus = true;
    this.toastr.setRootViewContainerRef(vcr);
  }
  // <---------angular popup fof custom assessment------>
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
  getActivities() {
    // this.showLoader =true;
    //    if (this.user.RoleId == 7) {
    //      this.clientid = this.client.Id;
    //    }
    //    else {
    this.clientid = this.patientid;

    return this._activityService.GetClientActivies(this.clientid)
      .subscribe(
        arg => {
          this.activityItems = arg.data;
          // console.log("getting activities data" + (JSON.stringify(this.activityItems = arg)))
          // this.showLoader =false;
        });
  }

  updateActivity(activity, i) {
    this.onClickUpdate = activity;
    this.updateId = i;
    // console.log(this.onClickUpdate);
  }

  postUpdatedStatus() {
    //  if (this.onUpdateStatus === false) {
    //    this.statusValue = this.onClickUpdate.Status;
    //  }
    const date = new Date();
    let monthName = '';
    monthName = this._activityService.getMonthname(date);
    // monthName = this._activityService.getMonthname(date);
    this.scheduleDate = new Date().getDate() + ' ' + monthName + ' ' + new Date().getFullYear()
      + ' ' + new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds();
    //  console.log(this.scheduleDate);
    this.postStatus = {
      ActivityId: this.onClickUpdate.Id,
      ClientId: this.onClickUpdate.ClientId,
      TimeConsume: '2hrs',
      Status: this.statusValue,
      Date: this.scheduleDate,
    };
    // console.log(scheduleDate);
    this.postStatus.Date = this.scheduleDate;
   // console.log(JSON.stringify(this.postStatus));
    this._activityService.postUpdatedStatus(this.postStatus).subscribe(
      res => {
        this.getActivities().add(() => {
          if (res.Success) {
            this.success('Activity Updated Successfully', 'add');
          } else {
            this.error('Please provide valid activities', 'add');
          }
        }),
          this.onUpdateStatus = false;
      });
  }




  success(successmsg, type) {
    this._toast.ShowAlert(successmsg, '', 'Success');
    if (type === 'add') {
        this.edit.hide();
    }
    
   
}
error(errormsg, type) {
    this._toast.ShowAlert(errormsg, '', 'Error');
    // this.disableButton = false;
}




 
 
}
