import { Component, OnInit, EventEmitter, ViewChild, Output, Input, ViewContainerRef } from '@angular/core';
// import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { PatientMedicationService } from './patient-medications.service';
import { Toast } from 'ng2-toastr';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
declare var jQuery: any;
import { Subject } from 'rxjs/Subject';
import { ToastService } from '../../../shared/services/toastService';
import { ModalDirective } from 'angular-bootstrap-md';
import { PatientCard } from '../../../models/PatientCard.model';
 
@Component({
  selector: 'app-patient-medications',
  templateUrl: './patient-medications.component.html',
  styleUrls: ['./patient-medications.component.scss'],
  providers: [PatientMedicationService, ToastService , ToastsManager]
})
export class PatientMedicationsComponent implements OnInit {
  private _rootViewContainerRef: ViewContainerRef;
  @ViewChild('view') public view: ModalDirective;

  @Output() medications = new EventEmitter();
  obj = {
    id: 0,
    sid: 0,
    type: 'medications'
  };
  @Input() patientid: number;
  @Input() parentData: Subject<number>;
  adminlogindata: any = {};
  loginid: number;
  medicationItems: any = [];
  message: any;
  postStatus: any;
  clientid: number;
  custom: any;
  closeResult;
  patientcarddata: PatientCard;
  Status: string;
  onClickUpdate: any = {};
  clientData: any = {};
  userFilter: any = { Medication: '' };
  user: any = {};
  showLoader: boolean;
  careteamstatus: boolean;
  medicationDropdownItems: any = [];
  constructor(private _toast: ToastService,   private _medicationService: PatientMedicationService,
    public toastr: ToastsManager,  vRef: ViewContainerRef) {
   // this.toastr.setRootViewContainerRef(vcr);
   this._rootViewContainerRef = vRef;
    this.patientcarddata = new PatientCard();
    this.careteamstatus = false;
    this.adminlogindata = JSON.parse(localStorage.getItem('loginData'));
    this.loginid = this.adminlogindata.Id;
  }

  ngOnInit() {
    this.toastr.setRootViewContainerRef(this._rootViewContainerRef);
    this.patientcard();
    this.parentData.subscribe(res => {
      // alert('res' + res);
      if (res != null) {
        this.patientid = res;
     //   console.log(this.patientid);
        this.getMedications();
        this.getMedicationsDropdown();
      }

    });
    this.getMedications();
    this.getMedicationsDropdown();
    this.postStatus = {
      Id: 0,
      ClientId: 0,
      UserId: 0,
      Medication: '',
      Description: '',
      Dosage: '',
      Frequency: '',
      Status: '',
      ProviderId:0,
      Date: new Date()
    };
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
  getMedicationsDropdown() {
    return this._medicationService.getMedicationsDropdown().subscribe(arg => {
      this.medicationDropdownItems = arg.data;
      // console.log("get medication" + (JSON.stringify(this.medicationDropdownItems = arg)))
    });
  }
  updateStatus(value) {
    // alert(value);
    this.custom = value;
    this.postStatus.Status = value;
  }
  getMedications() {
    // this.showLoader =true;
   // console.log(this.patientid)
    return this._medicationService.getClientMedications(this.patientid)
      .subscribe(arg => {
        this.medicationItems = arg.data;
       //  console.log("get medication" + (JSON.stringify(this.medicationItems)))
        // this.showLoader =false;
      });
  }
  patientcard() {
    // this.patientid = Id;
    this.careteamstatus = false;
    if (this.patientid > 0) {
      this._medicationService.getpatientcarddetails(this.patientid).subscribe(
        res => {
          if (res.Success) {
            this.patientcarddata = res.data;
           // console.log(JSON.stringify(this.patientcarddata));
          //  alert(this.postStatus.ProviderId)
            
          }
    });
  }
}
  addmedications() {
    this.medications.emit(this.obj);
  }
  medicationview() {
    this.obj.type = "medicationview";
    this.medications.emit(this.obj);
  }
  updateId: number;
  updateMedication(medication) {
    this.careteamstatus = false;
    this.postStatus.Id = medication.Id;
    this.postStatus.ClientId = medication.ClientId;
    this.postStatus.UserId = 0;
    this.postStatus.Medication = medication.Medication;
    this.postStatus.Description = medication.OtherName;
    this.postStatus.Dosage = medication.Dosage;
    this.postStatus.Frequency = medication.Frequency;
    this.postStatus.Status = medication.Status;
    this.postStatus.ProviderId = medication.ProviderId;
    for(let i = 0; i <= this.patientcarddata.CareTeam.length-1; i++) {
      if(this.patientcarddata.CareTeam[i].Id === this.loginid) {
        // this.postStatus.ProviderId = this.loginid;
     
       this.careteamstatus = true;
      }
     }

  }

  postUpdatedStatus() {
    var date = new Date();
    var scheduleDate = '';
    var monthName = '';
    monthName = this._medicationService.getMonthname(date);
    var scheduleDate = monthName + " " + new Date().getDate() + " " + new Date().getFullYear() + " " + new Date().getHours() + ":" + new Date().getMinutes() + ":" + new Date().getSeconds();
    console.log(scheduleDate);
    this.postStatus.Date = scheduleDate;
   // console.log(this.postStatus);
    // console.log(JSON.stringify(this.postDataItem));
 //    console.log(JSON.stringify(this.postStatus));
    this._medicationService.postUpdatedMedicationStatus(this.postStatus).subscribe(
      res => {
        console.log((JSON.stringify(res)));
        if (res.Success) {
          this.success(res.data,'update');
        } else {
          this.error(res.data,'update');
        }
      },
      err => console.log(err)
    );
    // alert(JSON.stringify(this.postStatus));
  }
  /** Add,Edit,delete Referral methods end */
  /** to show Success messages */


  success(successmsg, type) {
    this.toastr.setRootViewContainerRef(this._rootViewContainerRef);
    this._toast.ShowAlert(successmsg, '', 'Success');
   
    if (type === 'update') {
      this.view.hide();
    }
    this.getMedications().add(() => {
    });
  }
  error(errormsg, type) {
    this.toastr.setRootViewContainerRef(this._rootViewContainerRef);
    this._toast.ShowAlert(errormsg, '', 'Error');
   // this.disableButton = false;
  }



  
}
