import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Toast } from 'ng2-toastr/src/toast';
declare var jQuery: any;
import { Client } from './../../admin-assessments/all-custom-assessments/all-custom-assessments.component';
import { alertType } from './../../../../models/common.model';
import { Component, OnInit, Input, ViewChild, EventEmitter, Output, ViewContainerRef } from '@angular/core';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
// import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
// import { AppService } from '../../../../app.service';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { ActivityService } from '../activities.service';
import { ToastService } from '../../../../shared/services/toastService';
import { ModalDirective } from 'angular-bootstrap-md';

@Component({
    selector: 'app-add-activities',
    templateUrl: './add-activities.component.html',
    styleUrls: ['./add-activities.component.scss'],
    providers: [ActivityService , ToastService]
})
export class AddActivitiesComponent implements OnInit {
    @ViewChild('view') public view: ModalDirective;
    @ViewChild('edit') public edit: ModalDirective;
    monthName: any;
    @Output() addActiviesCall = new EventEmitter();
    obj = {
        id: 0,
        sid: 0,
        type: 'AddActivities'
    };
    @Input() patientid: number;
    // model: any;
    closeResult: any;
    scheduleDate: any;
    editDate: any;
    model: any = { 'Id': 0, 'Activity': '', 'Description': '', 'CurrentStatus': '' };
    Activities: any = [];
    totalActivities: any = [];
    user: any;
    client: any;
    message: string;
    errorr: any;
    editIndex: number;
    isSubmitted: Boolean = false;
    onEditStatus: Boolean = false;
    EditActivity: any = {};
    isCheckboxChecked: Boolean = false;
    // isActivity:boolean=true;
    constructor(private _toast: ToastService, private route: ActivatedRoute, private router: Router,
         public toastr: ToastsManager, vcr: ViewContainerRef,
        private _activityService: ActivityService) {
        this.isCheckboxChecked = false;
        this.toastr.setRootViewContainerRef(vcr);
    }
    ngOnInit() {
        this.GetClientActivies();
        // if (!localStorage.getItem('User')) {
        //   this.router.navigate(['login']);
        // }
        // this.user = JSON.parse(localStorage.getItem('User'));
        // this.client = JSON.parse(localStorage.getItem('clientsData'));
        // alert(this.client.ClientId);
    }
    // templatePopup(content) {
    //     // this.onEditStatus = false;
    //     this.modalService.open(content).result.then((result) => {
    //         this.closeResult = `Closed with: ${result}`;
    //     }, (reason) => {
    //         this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    //     });
    // }
    GetClientActivies() {

    }
    // private getDismissReason(reason: any): string {
    //     if (reason === ModalDismissReasons.ESC) {
    //         return 'by pressing ESC';
    //     } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
    //         return 'by clicking on a backdrop';
    //     } else {
    //         return `with: ${reason}`;
    //     }
    // }


    addActivity(model) {
        this.model = { 'Id': 0, 'Activity': '', 'Description': '', 'CurrentStatus': '' };
        this.isCheckboxChecked = true; 
        const date = new Date();
        const scheduleDate = '';
        //  const monthName = '';
        this.monthName = this._activityService.getMonthname(date);
        this.scheduleDate = new Date().getDate() + '' + this.monthName + '' + new Date().getFullYear();
        //  + " " + new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds();
        // console.log(scheduleDate);
        this.Activities.push({
            ActivityId: 0,
            //    ClientId: this.client.ClientId,
            //    UserId: this.user.UserId,
            ClientId: this.patientid,
            UserId: 531,
            Activity: model.Activity,
            Description: model.Description,
            TimeConsume: '',
            Status: model.CurrentStatus,
            Date: this.scheduleDate,
            EndDate: ''
        });

        this.totalActivities = this.Activities;
        // console.log(JSON.stringify(this.totalActivities));
        this.view.hide();
    }

    updateStatus(value) {
       
        this.model.CurrentStatus = value;
        // console.log(this.model.CurrentStatus);
        this.isCheckboxChecked = true;
        this.EditActivity.Status = value;
        // this.onEditStatus = true;
    }
    removeInterventions(index) {
        // var index = this.result.indexOf(this.result.Interventions);
        this.totalActivities.splice(index, 1);
    }
    // isCheckboxChecked:boolean=true;
    removeSelection() {
        this.model.Activity = '';
        this.model.Description = '';
        this.isCheckboxChecked = false;
    }


    allActivitiesPost() {
        this.isSubmitted = true;
        // const date = new Date();
        //  this.totalActivities.Date=this.scheduleDate;
        // console.log("ravindra  "+this.totalActivities.Date);
        //  console.log(JSON.stringify(this.totalActivities));
        this._activityService.postActivity(this.totalActivities).subscribe(
            res => {
                // console.log((JSON.stringify(res)));
                if (res.Success) {
                    this.success('Activity Added Successfully', 'add');
                } else {
                    this.error('Please provide valid activities', 'add');
                }
            },
            err => console.log(err)
        );
    }
    onClickEdit(Activity, i) {
        this.editIndex = i;
        this.EditActivity = Activity;
      //   console.log(JSON.stringify(this.EditActivity));
    }
    toClearModel() {
       this.model= { 'Id': 0, 'Activity': '', 'Description': '', 'CurrentStatus': '' }
      this.isCheckboxChecked=true;
    }

    EditSave(EditActivity) {
    
        if (this.onEditStatus === false) {
            this.model.CurrentStatus = this.EditActivity.Status;
        }
        this.totalActivities[this.editIndex] = {
            ActivityId: 0,
            ClientId: this.EditActivity.ClientId,
            UserId: this.EditActivity.UserId,
            Activity: this.EditActivity.Activity,
            Description: this.EditActivity.Description,
            TimeConsume: '',
            Status: this.model.CurrentStatus,
            Date: new Date(),
            EndDate: ''
        };
        this.edit.hide();
    }
    back() {
        this.addActiviesCall.emit(this.obj);
    }
    success(successmsg, type) {
        this._toast.ShowAlert(successmsg, '', 'Success');
        if (type === 'add') {
            this.view.hide();
            this.edit.hide();
        }
        if (type === 'update') {
            this.edit.hide();
            this.view.hide();
        }
      this.back();
    }
    error(errormsg, type) {
        this._toast.ShowAlert(errormsg, '', 'Error');
       // this.disableButton = false;
    }
}
