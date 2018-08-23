import { Component, OnInit, ViewChild, EventEmitter, Output, Input, ViewContainerRef } from '@angular/core';
// import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { PatientBreathService } from '../breath.service';
import { Toast } from 'ng2-toastr';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { ToastService } from '../../../../shared/services/toastService';
import { ModalDirective } from 'angular-bootstrap-md';

declare var jQuery: any;
@Component({
  selector: 'app-add-breath',
  templateUrl: './add-breath.component.html',
  styleUrls: ['./add-breath.component.scss'],
  providers: [PatientBreathService , ToastService]
})
export class AddBreathComponent implements OnInit {
  @ViewChild('view') public view: ModalDirective;
  @ViewChild('edit') public edit: ModalDirective;
  @Output() patientaddbreath = new EventEmitter();
  obj = {
    id: 0,
    sid: 0,
    type: 'addbreath'
  };
  @Input() patientid: number;
  breathItems: any = [
    {
      "Breath": " Chest Breathing",
      "Id": 1
    },
    {
      "Breath": "Alternate Nostril Breathing ",
      "Id": 2
    },
    {
      "Breath": "Diaphragmatic breathing",
      "Id": 3
    },
    {
      "Breath": "Progressive Relaxation",
      "Id": 4
    },
    {
      "Breath": "Clavicular breathing",
      "Id": 5
    },
    {
      "Breath": "Abdominal Breathing Technique",
      "Id": 6
    },
  ];

  closeResult: any;
  model: any = { "Id": 0, "Breath": '', "Description": '', "TimeConsume": '', "CurrentStatus": '' };
  Breath: any = [];
  totalBreathItems: any = [];
  user: any;
  client: any;
  EditBreath: any = {};
  isCheckboxChecked: boolean = false;
  constructor(private _toast: ToastService,private _breathService: PatientBreathService, public toastr: ToastsManager, vcr: ViewContainerRef) {
    this.isCheckboxChecked = false;
    this.toastr.setRootViewContainerRef(vcr);
  }

  ngOnInit() {
  }
  // templatePopup(content) {
  //   this.onEditStatus = false;
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
  addBreath(model) {
    //this.isActivity=false;
    var date = new Date();
    var scheduleDate = '';
    var monthName = '';
    monthName = this._breathService.getMonthname(date);
    var scheduleDate = monthName + " " + new Date().getDate() + " " + new Date().getFullYear() + " " + new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds();
    console.log(scheduleDate);
    this.Breath.Date = scheduleDate;
    this.Breath.push({
      BreathId: 0,
      ClientId: this.patientid,
      UserId: 0,
      Breath: model.Breath,
      TimeConsume: model.TimeConsume,
      Description: model.Description,
      Status: model.CurrentStatus,
      Date: scheduleDate,
      EndDate: scheduleDate
    })
    this.totalBreathItems = this.Breath;
    console.log(JSON.stringify(this.totalBreathItems));
    this.view.hide();
  }
  onEditStatus: boolean = false;
  updateStatus(value) {
    this.model.CurrentStatus = value;
    console.log(this.model.CurrentStatus);
    this.isCheckboxChecked = true;
    this.onEditStatus = true;
  }
  removeBreath(index) {
    //var index = this.result.indexOf(this.result.Interventions);
    this.totalBreathItems.splice(index, 1);

  }
  //isCheckboxChecked:boolean=true;
  removeSelection() {
    this.model.Breath = "";
    this.model.TimeConsume = "";
    this.model.Description = "";
    this.isCheckboxChecked = false;
  }
  message: string;

  isSubmitted: boolean = false;
  allBreathPost() {

    console.log("hi" + this.totalBreathItems.Date)
    console.log(JSON.stringify(this.totalBreathItems));
    this._breathService.postBreath(this.totalBreathItems).subscribe(
      res => {
        console.log((JSON.stringify(res)));
        if (res.Success) {
          this.success('Inserted Sucessfully','add');
        } else {
          this.error(res.data,'add');
        }
      },
      err => console.log(err)
    );
  }
  editIndex: number;
  onClickEdit(Breath, i) {
    this.editIndex = i
    this.EditBreath = Breath;
    console.log("edit " + JSON.stringify(this.EditBreath));
  }
  EditSave(EditBreath) {
    if (this.onEditStatus == false) {
      this.model.CurrentStatus = this.EditBreath.Status;
    }
    this.totalBreathItems[this.editIndex] = {
      BreathId: 0,
      ClientId: this.EditBreath.ClientId,
      UserId: this.EditBreath.UserId,
      Breath: this.EditBreath.Breath,
      Description: this.EditBreath.Description,
      TimeConsume: this.EditBreath.TimeConsume,
      Status: this.model.CurrentStatus,
      Date: new Date(),
      EndDate: new Date()
    };
    this.edit.hide();    
  }
  back() {
    this.patientaddbreath.emit(this.obj);
  }
  /** to show Success messages */


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
