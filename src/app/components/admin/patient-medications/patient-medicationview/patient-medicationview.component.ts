import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { PatientMedicationService } from '../patient-medications.service';

@Component({
  selector: 'app-patient-medicationview',
  templateUrl: './patient-medicationview.component.html',
  styleUrls: ['./patient-medicationview.component.scss'],
  providers: [PatientMedicationService]
})
export class PatientMedicationviewComponent implements OnInit {
  @Output() medicationview = new EventEmitter();
  obj = {
    id: 0,
    sid: 0,
    type: 'medicationview'
  };
  @Input() patientid: number;
  clientData: any;
  clientid: number;
  user: any;
  medicationHistory: any = [];
  userFilter: any = { Medication: '' };
  constructor(private _medicationService: PatientMedicationService) { }

  ngOnInit() {
    this.getMedications();
  }
  getMedications() {

    this.clientid = 531;

    return this._medicationService.getMedicationHistory(this.clientid)
      .subscribe(arg => {
        this.medicationHistory = arg.data;
        console.log("get medication history" + (JSON.stringify(this.medicationHistory = arg)))
      });
  }
  back() {
    this.obj.type = "addmedications";
    this.medicationview.emit(this.obj);
  }
}
