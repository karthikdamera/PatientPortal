import { ValidationService } from './../../../shared/validation/validation.service';
import { ToastService } from './../../../shared/services/toastService';
import { ModalDirective } from 'angular-bootstrap-md';
import { Service } from './service-type.service';
import { ServiceTypeModel } from './../../../models/servicetype.model';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { FormBuilder, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { Component, OnInit, ChangeDetectorRef, ViewContainerRef, ViewChild } from '@angular/core';
@Component({
  selector: 'app-service-type',
  templateUrl: './service-type.component.html',
  styleUrls: ['./service-type.component.scss'],
  providers: [Service, DatePipe, ToastService , ToastsManager]
})
export class ServiceTypeComponent implements OnInit {
  private _rootViewContainerRef: ViewContainerRef;
  @ViewChild('editservice') public editservice: ModalDirective;
  @ViewChild('addservice') public addservice: ModalDirective;
  model: ServiceTypeModel;
  TypeForm: any;
  TypeForm1: any;
  page: number = 0;
  editItems: any = {};
  TypeData: any = [];
  disableButton: boolean = false;
  editSuccess: boolean;

  constructor(private changeDetectorRef: ChangeDetectorRef, private datepipe: DatePipe,
    private _servicetypeService: Service,
    private _toast: ToastService,
    private formBuilder: FormBuilder,
    public toastr: ToastsManager,  vRef: ViewContainerRef) {
     // this.toastr.setRootViewContainerRef(vcr);
      this.model = new ServiceTypeModel();
      this.TypeForm = this.formBuilder.group({
        'AppointmentType': ['', Validators.required],
        'Duration': ['', Validators.required],
        'Instructions': ['', Validators.required]
      });
      this.TypeForm1 = this.formBuilder.group({
        'AppointmentType': ['', Validators.required],
        'Duration': ['', Validators.required],
        'Instructions': ['', Validators.required]
      });
      this._rootViewContainerRef = vRef;
     }

  ngOnInit() {
    this.toastr.setRootViewContainerRef(this._rootViewContainerRef);
    this.GetAppointmentType();
  }
  toClear() {
this.model = new ServiceTypeModel();
  }
  GetAppointmentType() {
    this._servicetypeService.getAppointmenttype().subscribe(
      res => {
        this.TypeData = res.data;
     //   console.log(JSON.stringify(this.TypeData));
      });
  }
  onEdit(TypeInfo) {
    // alert(JSON.stringify(data));
    this.editItems = {};
    this.editItems = TypeInfo;
    this.editSuccess = false;
    // alert(JSON.stringify(this.model))
  }
  TypeEdit() {
    this.editSuccess = true;
    this._servicetypeService.PostAppointment(this.editItems).subscribe(
      res => {
        // this.disableButton = true;
        if (res.success = true) {
          this.model = new ServiceTypeModel();
          this.success('Service-Type Updated Successfully', 'update');
        }
        else {
          this.error(res.data, '');
        }
      });
  }
  saveType() {
    this.editSuccess = true;
    // alert(JSON.stringify(this.model));
    this._servicetypeService.saveAppointmentType(this.model).subscribe(
      res => {
        // this.disableButton = true;
        if (res.success = true) {
          this.model = new ServiceTypeModel();
          this.success('Service-Type Saved Successfully', 'add');
        }
        else {
          this.error(res.data, 'add');
        }
      });
  }
  success(successmsg, type) {
    this.toastr.setRootViewContainerRef(this._rootViewContainerRef);
    this._toast.ShowAlert(successmsg, '', 'Success');
    if (type === 'add') {
      this.addservice.hide();
    }
    if (type === 'update') {
      this.editservice.hide();
    }
    this.GetAppointmentType();

  }
  error(errormsg, type) {
    this.toastr.setRootViewContainerRef(this._rootViewContainerRef);
    this._toast.ShowAlert(errormsg, '', 'Error');
    this.disableButton = false;
  }

}
