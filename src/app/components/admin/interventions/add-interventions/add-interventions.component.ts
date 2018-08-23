import { Title } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { SaveClientInterventions, Update, Symptoms } from '../../../../models/interventions.model';
import { Component, OnInit, ViewContainerRef,ViewChild, Input, Output, EventEmitter } from '@angular/core';
import { InterventionsService } from '../interventions.service';
import { ValidationComponent } from '../../../../shared/validation/validation.component';
import { ValidationService } from '../../../../shared/validation/validation.service';
import { AsyncValidatorFn, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { DatePipe, AsyncPipe } from '@angular/common';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Toast } from 'ng2-toastr/src/toast';
import { PersonRequestsService } from '../../../person/requests/requests.service';
import { ToastService } from '../../../../shared/services/toastService';
import { ModalDirective } from 'angular-bootstrap-md';
// import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
declare var jQuery: any;

@Component({
    moduleId: module.id,
    selector: 'app-add-interventions',
    templateUrl: './add-interventions.component.html',
    styleUrls: ['./add-interventions.component.scss'],
    providers: [DatePipe,ToastService, InterventionsService, PersonRequestsService]
})
export class AddInterventionsComponent implements OnInit {
    @ViewChild('view') public view: ModalDirective;
    @ViewChild('edit') public edit: ModalDirective;
    interventiondata: SaveClientInterventions;
    patientData: any;
    // Symptomslist: Symptoms;
    addInterventionList: any = [];
    innerSymptoms: Array<Symptoms>;
    selctedIntervention = [];
    editSymtomvalue = [];
    public symptoms = [];
    intervention: any = {};
    public selected = [];
    getinterventionData: any = [];
    adminId: number;
    @Input() patientid: number;
    interventionId: number;
    interventionNumber: number;
    date: Date = new Date();
    validateInterventiondata: any;
    disableButton: boolean;
    updatests: boolean;
    closeResult;
    ischecked: boolean;
    isCheckboxChecked: boolean;
    checkdata: any = [];
    providerDropdown: any = [];
    @Output() isShowinterventionChange = new EventEmitter();
    obj = {
        flag: false,
        type: 'addintervention'
    };
    model: any = { 'Title': '', 'Frequency': '', 'CurrentStatus': '', 'ProviderId': '' };
    constructor(private _toast: ToastService,private router: Router, private _personRequestsService: PersonRequestsService,
        private _interventionService: InterventionsService, private formBuilder: FormBuilder,
        public toastr: ToastsManager, vcr: ViewContainerRef, public datepipe: DatePipe) {
        this.toastr.setRootViewContainerRef(vcr);
        this.interventiondata = new SaveClientInterventions();
        this.interventiondata.Interventions = [];
        this.patientData = JSON.parse(localStorage.getItem('loginData'));
        this.adminId = this.patientData.Id;
        this.patientid = 97;
        this.disableButton = false;
        this.validateInterventiondata = this.formBuilder.group({
            'Symptoms': ['', Validators.required],
            'Title': ['', Validators.required],
            'Frequency': ['', Validators.required],
            'ProviderId': ['', Validators.required],
            'CurrentStatus': ['', Validators.required]
        });
        this.updatests = true;
    }
    ngOnInit() {
        this.getProvidersList();

    }
    getProvidersList() {
        return this._personRequestsService.getProvidersList().subscribe(
            res => {
                console.log('provider list' + (JSON.stringify(this.providerDropdown = res.data)));
            }
        );
    }
    addIntervention() {
        // alert();
        this.innerSymptoms = [];
        this.selected = [];
        this.isCheckboxChecked = false;
        this.updatests = true;
        this.model = { 'Title': '', 'Frequency': '', 'CurrentStatus': '', 'ProviderId': '' };
        return this._interventionService.GetInterventionsByClientSymtoms(this.patientid).subscribe(
            res => {
                this.innerSymptoms = res.data.Symptoms;
                for (let i = 0; i < this.innerSymptoms.length; i++) {
                    this.innerSymptoms[i].checked = false;
                }
                this.getinterventionData = res.data.Interventions;
                console.log('get Symptoms' + (JSON.stringify(res.data)));
                this.disableButton = false;
            }
        );
    }
    // removeSelection() {
    //     // let j=0;
    //     // for (let i = 0; i < this.getinterventionData.Symptoms.length; i++) {
    //     //     this.getinterventionData.Symptoms[i].IsChecked = false;
    //     // }
    //     // for (let i = 0 ; i < this.innerSymptoms.length ; i++) {
    //     //     this.innerSymptoms[i].checked = false;
    //     // }
    //    this.model.Title ="";
    //    this.model.Frequency = "";
    //    this.model.ProviderId = "";
    //   }
    selectSymptom(symtomval, index, value) {
        // console.log(this.selected);
        if (value.target.checked) {
            // alert('true');
            // this.innerSymptoms[]
            symtomval.checked = true;
            // this.selected.push(symtomval);
        } else {
            // alert('false');
            symtomval.checked = false;
            // alert(index);
            // for (let i = 0; i < this.selected.length; i++) {
            //     if (symtomval.SymptomId === this.selected[i].SymptomId) {
            //         this.selected[i].checked = false;
            //         this.selected.splice(i, 1);
            //     }
            // }
        }
        console.log(value.target.checked);
        console.log(this.innerSymptoms);
        // console.log(this.selected);
    }
    editSymptom(symtomval, index, value) {
        console.log(value.target.checked);
        console.log(this.selctedIntervention[0].Symptoms);
        for (let i = 0; i < this.selctedIntervention[0].Symptoms.length; i++) {
            if (symtomval.SymptomId === this.selctedIntervention[0].Symptoms[i].SymptomId) {
                if (value.target.checked) {
                    this.selctedIntervention[0].Symptoms[i].checked = true;
                } else {
                    this.selctedIntervention[0].Symptoms[i].checked = false;
                }
            }
        }
    }
    updateStatus(stsvalue) {
        this.updatests = false;
        this.model.CurrentStatus = stsvalue;
        // this.interventiondata.Interventions.push(
        // );
    }
    addInterventiondata(model) {
        console.log(this.innerSymptoms);
        this.interventiondata.UserId = model.ProviderId;
        this.interventiondata.ClientId = this.patientid;
        const fromdt = this.datepipe.transform(this.date, 'dd/MMM/yyyy');
        this.interventiondata.Date = fromdt + ' ' + this.date.getHours() +
            ':' + this.date.getMinutes() + ':' + this.date.getSeconds();
        // this.innerSymptoms = this.selected;
        this.disableButton = true;
        this.interventiondata.Interventions.push({
            InterventionId: 0,
            InterventionName: model.Title,
            OccurrenceId: 0,
            Occurrence: '',
            FrequencyId: 0,
            Frequency: model.Frequency,
            Type: 'Custom',
            Status: model.CurrentStatus,
            Symptoms: this.innerSymptoms
        });
        this.addInterventionList = this.interventiondata;
        // console.log(this.addInterventionList);
        this.model = { 'Title': '', 'Frequency': '', 'CurrentStatus': '', 'ProviderId': '' };
        this.selected = [];
        console.log(this.innerSymptoms);
       this.view.hide();
    }
    // templatePopup(content) {
    //     this.modalService.open(content).result.then((result) => {
    //         this.closeResult = `Closed with: ${result}`;
    //     }, (reason) => {
    //         this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    //     });
    // }
    // private getDismissReason(reason: any): string {
    //     if (reason === ModalDismissReasons.ESC) {
    //         return 'by pressing ESC';
    //     } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
    //         return 'by clicking on a backdrop';
    //     } else {
    //         return `with: ${reason}`;
    //     }
    // }
    onEdit(insvalue, indexnum, providerid) {
        this.selctedIntervention = [];
        console.log(insvalue);
        this.selctedIntervention.push(insvalue);
        this.interventionNumber = indexnum;
        console.log(this.interventionNumber);
        this.model.Frequency = insvalue.Frequency;
        this.model.Title = insvalue.InterventionName;
        this.model.ProviderId = providerid;
        this.interventionId = insvalue.InterventionId;
        this.model.CurrentStatus = insvalue.Status;
        this.innerSymptoms = insvalue.Symptoms;
        console.log(this.innerSymptoms);
        this.disableButton = false;
    }
    editInterventiondata(model) {
        console.log(this.interventionNumber);
        console.log(this.selctedIntervention[0].Symptoms);
        this.interventiondata.UserId = model.ProviderId;
        this.interventiondata.ClientId = this.patientid;
        const fromdt = this.datepipe.transform(this.date, 'dd/MMM/yyyy');
        this.interventiondata.Date = fromdt + ' ' + this.date.getHours() +
            ':' + this.date.getMinutes() + ':' + this.date.getSeconds();
        // this.innerSymptoms = this.selected;
        this.disableButton = true;
        this.interventiondata.Interventions[this.interventionNumber] = {
            InterventionId: this.interventionId,
            InterventionName: model.Title,
            OccurrenceId: 0,
            Occurrence: '',
            FrequencyId: 0,
            Frequency: model.Frequency,
            Type: 'Custom',
            Status: this.model.CurrentStatus === '' ? model.Status : this.model.CurrentStatus,
            Symptoms: this.selctedIntervention[0].Symptoms
        };
        this.addInterventionList = this.interventiondata;
        console.log(this.addInterventionList);
        this.edit.hide(); 
    }
    deleteInterventions(index) {
        this.disableButton = true;
        this.interventiondata.Interventions.splice(index, 1);
        if (this.interventiondata.Interventions.length === 0) {
            this.addInterventionList = [];
        }
    }
    submitinterventions() {
        for (let i = 0; i < this.addInterventionList.Interventions.length; i++) {
            console.log(i);
            console.log(this.addInterventionList.Interventions.length);
            for (let b = 0; b < this.addInterventionList.Interventions[i].Symptoms.length; b++) {
                console.log(b);
                console.log(this.addInterventionList.Interventions[i].Symptoms.length);
                if (this.addInterventionList.Interventions[i].Symptoms[b].checked === false ||
                    this.addInterventionList.Interventions[i].Symptoms[b].checked === undefined) {
                    this.addInterventionList.Interventions[i].Symptoms[b].checked = '';
                } else {
                    console.log(3);
                    this.checkdata.push(this.addInterventionList.Interventions[i].Symptoms[b]);
                    // alert(JSON.stringify(this.checkdata));
                }
            }
            this.addInterventionList.Interventions[i] = {
                InterventionId: this.addInterventionList.Interventions[i].InterventionId,
                InterventionName: this.addInterventionList.Interventions[i].InterventionName,
                OccurrenceId: 0,
                Occurrence: '',
                FrequencyId: 0,
                Frequency: this.addInterventionList.Interventions[i].Frequency,
                Type: 'Custom',
                Status: this.addInterventionList.Interventions[i].Status,
                Symptoms: this.checkdata
            };
            this.checkdata = [];
        }
        console.log(this.addInterventionList);
        this._interventionService.SaveClientInterventions(this.addInterventionList).subscribe(
            res => {
                console.log((JSON.stringify(res)));
                if (res.Success) {
                    this.success(res.data, 'add');
                } else {
                    this.error('Please provide valid Interventions', 'add');
                }
            },
            err => console.log(err)
        );
    }
    back() {
        this.isShowinterventionChange.emit(this.obj);
    }
    /** Toast messages for success and failure */



    success(successmsg, type) {
        this._toast.ShowAlert(successmsg, '', 'Success');
        if (type === 'add') {
            this.edit.hide();
            this.view.hide();
        }
        if (type === 'update') {
            this.edit.hide(); 
            this.view.hide();
        }
        this.back();
        
    }
    error(errormsg, type) {
        this._toast.ShowAlert(errormsg, '', 'Error');
        this.disableButton = false;
    }




   
}

