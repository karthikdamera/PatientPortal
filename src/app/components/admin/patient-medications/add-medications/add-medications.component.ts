import { Component, OnInit, Output, ViewChild, EventEmitter, Input, ViewContainerRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PatientMedicationService } from '../patient-medications.service';
// import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Toast } from 'ng2-toastr';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { ToastService } from '../../../../shared/services/toastService';
import { ModalDirective } from 'angular-bootstrap-md';
import { PatientDetailsService } from '../../patient-details/patient-details.service';
import { PatientCard } from '../../../../models/PatientCard.model';
declare var jQuery: any;

@Component({
  selector: 'app-add-medications',
  templateUrl: './add-medications.component.html',
  styleUrls: ['./add-medications.component.scss'],
  providers: [PatientMedicationService, ToastService, PatientDetailsService, ToastsManager]
})
export class AddMedicationsComponent implements OnInit {
  private _rootViewContainerRef: ViewContainerRef;
  @ViewChild('view') public view: ModalDirective;
  @ViewChild('edit') public edit: ModalDirective;
  adminlogindata: any = {};
  loginid: number;
  closeResult: any;
  model: any = { 'Id': 0, 'Name': '', 'Description': '', 'Dosage': '', 'CurrentStatus': '', 'Frequency': '' };
  Medications: any = [];
  medicationDropdownItems: any = [];
  user: any;
  client: any;
  Status: string;
  editMedication: any = {};
  isCheckboxChecked: boolean = false;
  postDataItem: any = [];
  medication: any = {};
  showSubmit: boolean;
  patientcarddata: PatientCard;
  careteamstatus: boolean;
  @Output() addmedicationsdata = new EventEmitter();
  obj = {
    flag: false,
    type: 'addmedications'
  };
  @Input() patientid: number;
  constructor(private _toast: ToastService, private patientdetailsservice: PatientDetailsService, private route: ActivatedRoute, private _medicationService: PatientMedicationService, public toastr: ToastsManager, vRef: ViewContainerRef) {
    this.isCheckboxChecked = false;
    this.showSubmit = false;
    //   this.toastr.setRootViewContainerRef(vcr);
    this._rootViewContainerRef = vRef;
    this.patientcarddata = new PatientCard();
    this.careteamstatus = false;
    this.model = { 'Id': 0, 'Name': '', 'Description': '', 'Dosage': '', 'CurrentStatus': '', 'Frequency': '', 'ProviderId': 0 };
    this.medication = {
      Id: 0,
      MedicationName: null,
      Description: null,
      Dosage: null,
      Frequency: null,
      Status: null,
      ProviderId: 0
    };
    this.postDataItem = {
      IsActive: true,
      UserId: 0,
      ClientId: 0,
      Date: new Date(),
      Medications: []
    };
    this.adminlogindata = JSON.parse(localStorage.getItem('loginData'));
    this.loginid = this.adminlogindata.Id;

  }

  ngOnInit() {
    this.toastr.setRootViewContainerRef(this._rootViewContainerRef);
    this.patientcard();
    this.getMedicationsDropdown();
    this.postDataItem = {
      UserId: 0,
      ClientId: this.patientid,
      Date: new Date(),
      Medications: []
    };
  }
  getMedicationsDropdown() {
    return this._medicationService.getMedicationsDropdown().subscribe(arg => {
      this.medicationDropdownItems = arg.data;
      // console.log("get medication" + (JSON.stringify(this.medicationDropdownItems = arg)))
    });
  }

  addMedication(model) {
    // alert(JSON.stringify(model));

    this.medication = {
      IsActive: true,
      Id: model.items.Id,
      MedicationName: model.items.Name,
      Description: model.Description,
      Dosage: model.Dosage,
      Frequency: model.Frequency,
      Status: model.Status,
      ProviderId: model.ProviderId
    };
    this.postDataItem.Medications.push(this.medication);
    // console.log(JSON.stringify(this.medication));
    // console.log(JSON.stringify(this.postDataItem));
    this.getMedicationsDropdown();
    this.showSubmit = true;
    this.view.hide();
    // console.log(this.medication);
  }
  onEditStatus: boolean = false;
  updateStatus(value) {
    this.model.Status = value;
    // console.log(this.model.Status);
    this.isCheckboxChecked = true;
    this.onEditStatus = true;
  }
  medicationId: number;
  getMedicationId(id) {
    // alert(id);
    this.medicationId = id;
  }
  removeMedications(index) {
    // alert(index)
    // var index = this.result.indexOf(this.result.Interventions);
    this.postDataItem.Medications.splice(index, 1);
  }
  // isCheckboxChecked:boolean=true;
  removeSelection() {
    this.model.items = '';
    this.model.Description = '';
    this.model.Frequency = '';
    this.model.Dosage = '';
    // this.loginid = 0;
    this.isCheckboxChecked = false;
  }
  message: string;
  isSubmitted: boolean = false;

  postMedications() {
    this.isSubmitted = true;
    const date = new Date();
    let monthName = '';
    monthName = this._medicationService.getMonthname(date);
    const scheduleDate = monthName + ' ' + new Date().getDate() + ' ' + new Date().getFullYear() + ' ' +
      new Date().getHours() + ':' + new Date().getMinutes() + ':' + new Date().getSeconds();
    //  console.log(scheduleDate);
    this.postDataItem.Date = scheduleDate;
    // console.log(JSON.stringify(this.postDataItem));
    this._medicationService.postMedications(this.postDataItem).subscribe(
      res => {
        //   console.log((JSON.stringify(res)));
        if (res.Success) {
          this.success(res.data, 'add');
        } else {
          this.error(res.data, 'add');
        }
      },
      err => console.log(err)
    );
  }
  editIndex: number;
  onClickEdit(Medication, i) {
    this.editIndex = i;
    this.editMedication = Medication;
    // console.log(JSON.stringify(this.editMedication));
  }

  Id: number;
  editSave(editMedication) {
    for (let i = 0; i < this.medicationDropdownItems.length; i++) {
      if (editMedication.MedicationName === this.medicationDropdownItems[i].Name) {
        this.Id = this.medicationDropdownItems[i].Id;
      }
    }
    if (this.onEditStatus === false) {
      this.model.Status = this.editMedication.Status;
    }
    this.postDataItem.Medications[this.editIndex] = {
      Id: this.Id,
      MedicationName: this.editMedication.MedicationName,
      Description: this.editMedication.Description,
      Frequency: this.editMedication.Frequency,
      Dosage: this.editMedication.Dosage,
      Status: this.model.Status,
      ProviderId: this.editMedication.ProviderId
    };
    this.edit.hide();
    // console.log(this.postDataItem);
  }
  back() {
    this.addmedicationsdata.emit(this.obj);
  }
  toClear() {
    // this.careteamstatus = false;
    // this.model = { 'Id': 0, 'Name': '', 'Description': '', 'Dosage': '', 'CurrentStatus': '', 'Frequency': ''};
    // this.loginid = 0;
    this.model.items = '';
    this.model.Id = 0;
    this.model.Name = '';
    this.model.Description = '';
    this.model.Dosage = '';
    this.model.CurrentStatus = '';
    this.model.Frequency = '';
    this.editMedication = {};
  }
  /** to show Success messages */

  patientcard() {
    // this.patientid = Id;
    // alert(this.model.ProviderId);
    this.careteamstatus = false;
    this.model.ProviderId = 0;
    if (this.patientid > 0) {
      this._medicationService.getpatientcarddetails(this.patientid).subscribe(
        res => {
          if (res.Success) {
            this.patientcarddata = res.data;
            //      console.log(JSON.stringify(this.patientcarddata.CareTeam));
            for (let i = 0; i <= this.patientcarddata.CareTeam.length - 1; i++) {
              if (this.patientcarddata.CareTeam[i].Id === this.loginid) {
                this.model.ProviderId = this.loginid;
                this.careteamstatus = true;
              }
            }
          }
        });
    }
  }
  success(successmsg, type) {
    this.toastr.setRootViewContainerRef(this._rootViewContainerRef);
    this._toast.ShowAlert(successmsg, '', 'Success');
    if (type === 'add') {
      this.view.hide();
      this.edit.hide();
    }
    if (type === 'update') {
      this.edit.hide();
      this.view.hide();
    }
    this.isCheckboxChecked = false;
    this.back();
  }
  error(errormsg, type) {
    this.toastr.setRootViewContainerRef(this._rootViewContainerRef);
    this._toast.ShowAlert(errormsg, '', 'Error');
    // this.disableButton = false;
  }
}
