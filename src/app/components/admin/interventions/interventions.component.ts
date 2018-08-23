import { Router } from '@angular/router';
import { SaveClientInterventions, Update } from './../../../models/interventions.model';
import { Component, OnInit,ViewChild, ViewContainerRef, Input, Output, EventEmitter } from '@angular/core';
import { InterventionsService } from './interventions.service';
import { ValidationComponent } from './../../../shared/validation/validation.component';
import { ValidationService } from './../../../shared/validation/validation.service';
import { AsyncValidatorFn, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { DatePipe, AsyncPipe } from '@angular/common';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Toast } from 'ng2-toastr/src/toast';
declare var jQuery: any;
import { Subject } from 'rxjs/Subject';
import { ToastService } from '../../../shared/services/toastService';
import { ModalDirective } from 'angular-bootstrap-md';

@Component({
    moduleId: module.id,
    selector: 'app-interventions',
    templateUrl: './interventions.component.html',
    styleUrls: ['./interventions.component.scss'],
    providers: [ToastService,DatePipe, InterventionsService]
})
export class InterventionsComponent implements OnInit {
    @ViewChild('edit') public edit: ModalDirective;
  
    @Output() getEventCall = new EventEmitter();
    obj = {
        flag: false,
        type: 'intervention'
    };
    @Input() patientid: number;
    @Input() parentData: Subject<number>;
    interventionId: number;
    updatedata: Update;
    patientData: any;
    getinterventionData: any = [];
    date: Date = new Date();
    userfilter = { InterventionName: '' };
    insstatus: boolean;
    // patientid: number;
    constructor(private _toast: ToastService,private router: Router, private _interventionService: InterventionsService, private formBuilder: FormBuilder,
        public toastr: ToastsManager, vcr: ViewContainerRef, public datepipe: DatePipe) {
        this.toastr.setRootViewContainerRef(vcr);
        //  this.interventiondata = new SaveClientInterventions();
        this.updatedata = new Update();
        this.patientData = JSON.parse(localStorage.getItem('loginData'));
        this.insstatus = true;
        // this.id = this.patientid;
    }
    ngOnInit() {
        // alert();
        console.log(this.parentData);
        this.parentData.subscribe(res => {
            //  alert('res' + res);
            if (res != null) {
                this.patientid = res;
                console.log(this.patientid);
                this.getInteventionBypatientId();
            }

        });
        this.getInteventionBypatientId();
    }
    addIntervention() {
        // alert(this.patientid);
        this.getEventCall.emit(this.obj);
        // this.router.navigate(['/admindashboard/addintervention']);
    }
    getInteventionBypatientId() {
        // alert(this.patientid);
        return this._interventionService.GetClientInterventions(this.patientid).subscribe(
            res => {
                this.getinterventionData = res.data;
                // alert();
                console.log('get interventions' + (JSON.stringify(this.getinterventionData)));
            }
        );
    }
    onEdit(value) {
        console.log('on edit' + JSON.stringify(value));
        this.updatedata.PatientInterventionId = value.PatientInterventionId;
        this.updatedata.Status = value.Status;
        console.log(this.updatedata.Status);
    }
    updateStatus(stsvalue) {
        this.insstatus = false;
        this.updatedata.Status = stsvalue;
    }
    editRequest() {
        const fromdt = this.datepipe.transform(this.date, 'dd/MMM/yyyy');
        this.updatedata.Date = fromdt + ' ' + this.date.getHours() +
            ':' + this.date.getMinutes() + ':' + this.date.getSeconds();
        console.log(this.updatedata);
        this._interventionService.statusEditUpdate(this.updatedata).subscribe(
            res => {
                console.log((JSON.stringify(res)));
                if (res.Success) {
                    this.success(res.data + ' ' + 'updated','update');
                } else {
                    this.error(res.data,'update');
                }
            },
            err => console.log(err)
        );
    }
    /** Add,Edit,delete Referral methods end */
    /** Toast messages for success and failure */

    success(successmsg, type) {
        this._toast.ShowAlert(successmsg, '', 'Success');
        
        if (type === 'update') {
            this.edit.hide();
        }
        this.insstatus = true;
        this.getInteventionBypatientId().add(() => {
        });
    }
    error(errormsg, type) {
        this._toast.ShowAlert(errormsg, '', 'Error');
       // this.disableButton = false;
    }
}

