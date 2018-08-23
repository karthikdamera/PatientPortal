import { Component, OnInit, ChangeDetectorRef, ViewChild, ViewContainerRef } from '@angular/core';
import { Medication_Model } from '../../../models/patientmedication.model';
import { MedicationService } from './medicationservice';
import { ToastService } from '../../../shared/services/toastService';
import { AsyncValidatorFn, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ModalDirective } from 'angular-bootstrap-md';
import { MedicationsPipe } from './medicationsPipe';
@Component({
  selector: 'app-medications',
  templateUrl: './medications.component.html',
  styleUrls: ['./medications.component.scss'],
  providers: [ToastService, MedicationService]
})
export class MedicationsComponent implements OnInit {
  @ViewChild('editmedication') public editmedication: ModalDirective;
  @ViewChild('deletemedication') public deletemedication: ModalDirective;
  @ViewChild('addmedication') public addmedication: ModalDirective;
  medicationmodel: Medication_Model;
  medicationForm: any;
  medicationForm1: any;
  medicationdata: any = [];
  medicationeditmodel: Medication_Model;
  userFilter: string;
  page: number = 0;
  order: string ;
    reverse: boolean = false;
  disableButton: boolean = false;
  constructor(private changeDetectorRef: ChangeDetectorRef, vcr: ViewContainerRef, private formBuilder: FormBuilder, private _slotbookingService: MedicationService, private _toast: ToastService) {
    this.medicationmodel = new Medication_Model();
    this.medicationeditmodel = new Medication_Model();
    this.medicationForm = this.formBuilder.group({
      'Description': [''],
      'Name': ['',Validators.required],
      'ResponsiblePerson': ['']
    });
    this.medicationForm1 = this.formBuilder.group({
      'Description': [''],
      'Name': ['',Validators.required],
      'ResponsiblePerson': ['']
    });
  }

  ngOnInit() {
    this.GetAllMedications();
  }
  saveMedication() {
  //  alert(JSON.stringify(this.medicationmodel));
    this._slotbookingService.saveMedication(this.medicationmodel).subscribe(
      res => {
        if (res.success = true) {
          this.medicationmodel = new Medication_Model();
          this.success('Medication Saved Successfully', 'add');
        }
        else {
          this.error(res.data, '');
        }
      });
  }

  GetAllMedications() {
    this._slotbookingService.GetAllMedications().subscribe(
      res => {
        this.medicationdata = res.data;
        this.order = 'Name';
     //   console.log(JSON.stringify(this.medicationdata));
      });
  }
  setOrder(value: string) {
    // if (this.order === value) {
      this.reverse = !this.reverse;
    // }
 //   console.log(this.orderPipe.transform(this.providerData, this.order));
    // this.providerData = this.orderPipe.transform(this.providerData, this.order);
    this.order = value;
  }
  onEdit(data) {
    // alert(JSON.stringify(data));
    this.medicationmodel = data;
    // alert(JSON.stringify(this.medicationeditmodel))
  }
  medicationEdit() {
    this._slotbookingService.updateMedication(this.medicationmodel).subscribe(
      res => {
        if (res.success = true) {
          this.medicationmodel = new Medication_Model();
          this.success('Medication Updated Successfully', 'update');
        }
        else {
          this.error(res.data, '');
        }
      });
  }
  onDelete(data){
    this.medicationmodel=data;
  }
  toClearModel() {
    this.medicationmodel = new Medication_Model();
  }
  delete(data) {
   //alert(JSON.stringify(data))
    this._slotbookingService.deleteMedication(data).subscribe(
      res => {
        if (res.Success) {
          this.success('Medication' + ' ' + 'deleted', 'delete');
        } else {
          this.error('Medication ' + ' ' + 'is not deleted', 'delete');
        }
      },
      err => console.log(err)
    );
  }
  success(successmsg, type) {
    this._toast.ShowAlert(successmsg, '', 'Success');
    if (type === 'add') {
      this.addmedication.hide();
    }
    if (type === 'update') {
      this.editmedication.hide();
    }
    if (type === 'delete') {
    this.deletemedication.hide();
    }

    this.GetAllMedications();

  }
  error(errormsg, type) {
    this._toast.ShowAlert(errormsg, '', 'Error');
    this.disableButton = false;
  }
}
