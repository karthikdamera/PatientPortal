import { LocationPipe } from './locationPipe';
import { SchedulerService } from './../../person/scheduler/scheduler.service';
import { ViewContainerRef } from '@angular/core';
import { AsyncValidatorFn, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Toast } from 'ng2-toastr/ng2-toastr';
import { ValidationComponent } from './../../../shared/validation/validation.component';
import { ValidationService } from './../../../shared/validation/validation.service';
import { DatePipe } from '@angular/common';
import { LocationService } from './location.service';
import { LocationModel } from './../../../models/location.model';
import { Component, OnInit,ViewChild, ChangeDetectorRef } from '@angular/core';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { ToastService } from '../../../shared/services/toastService';
import { ModalDirective } from 'angular-bootstrap-md';
import { OrderPipe } from 'ngx-order-pipe';
 
declare var jQuery: any;

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrls: ['./location.component.scss'],
  providers: [LocationService, ToastService, DatePipe, SchedulerService , ToastsManager]
})
export class LocationComponent implements OnInit {
  private _rootViewContainerRef: ViewContainerRef;
  @ViewChild('addLocation') public addLocation: ModalDirective;
  @ViewChild('editLocation') public editLocation: ModalDirective;
  LocationData: any = [];
  data: any = [];
  stateNames: any = [];
  LocItems: any = {};
  disableButton: boolean;
  order: string ;
    reverse: boolean = false;
  editItems: any = {};
  phonestssec:boolean;
  phonealtstssec:boolean;
  errmsg: boolean;
  model: LocationModel;
  LocationForm: any;
  LocationForm1: any;
  success: Boolean;
  error: Boolean;
  userFilter: any;
  constructor(private _toast: ToastService,private changeDetectorRef: ChangeDetectorRef, 
    private orderPipe: OrderPipe, private _locationService: LocationService,
    private _appoinmentservice: SchedulerService, private datepipe: DatePipe,
    private formBuilder: FormBuilder,
    public toastr: ToastsManager, vRef: ViewContainerRef) {
    // this.toastr.setRootViewContainerRef(vcr);
    this.model = new LocationModel();
    this.phonestssec = false;
    this.phonealtstssec = false;
    this.errmsg = false;
    this.LocationForm = this.formBuilder.group({
      'LocationName': ['', Validators.required],
      'StateCode': ['', Validators.required]
    });
    this.LocationForm1 = this.formBuilder.group({
      'LocationName': ['', Validators.required],
      'StateCode': ['', Validators.required]
    });
    this._rootViewContainerRef = vRef;
  }

  ngOnInit() {
    this.toastr.setRootViewContainerRef(this._rootViewContainerRef);
    this.getlocation();
    this.getStateNames(231);
  }
  toClear() {
    this.model = new LocationModel();
  }

  getlocation() {
    return this._locationService.getLocationtype().subscribe(
      res => {
        this.disableButton = false;
        this.LocationData = res.data;
     //   console.log(this.LocationData);
     this.order = 'LocationName';
     console.log(this.orderPipe.transform(this.LocationData, this.order));
      }
    );
  }
  getStateNames(StateCode) {
    return this._appoinmentservice
      .getstateNames(StateCode)
      .subscribe(arg => {
        this.stateNames = arg.data;
       //  console.log("Locations "+JSON.stringify((this.stateNames)));
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

  edit(value) {
    this.editItems = {};
    this.editItems = value;
 //   console.log(this.model);
    // for(let i=0;i<=this.stateNames.length-1;i++){
    //   if(this.stateNames[i].StateCode===item.StateCode){
    //     this.model.StateCode=this.stateNames[i].Name;
    //     alert(this.model.StateCode);
    //   }
    // }
    this.success = false;
  }
  PostLocation() {
 //   console.log(1 + ',' + JSON.stringify(this.model.StateCode));
  //  if (this.LocationForm.dirty && this.LocationForm.valid) {
      for (let i=0;i<this.stateNames.length;i++){
      if (this.model.StateCode.Name === this.stateNames[i].Name) {
this.model.StateCode = this.stateNames[i].StateCode;
      }
    } 
  //  console.log(this.model.StateCode);
  //   console.log(this.model);
      this._locationService.PostLocation(this.model).subscribe(
        res => {
        //  console.log(res);
          this.disableButton = true;
          if (res.Success === true) {
            // this.success = true;
            this.Success('Location added successfully', 'add');
            // this.getStaffInfo();
          } else {
            this.Error(res.data, 'add');
          }
        });
   // }
  }

  /**
     * edit and post the staff information
     * @param LocItems
     */
  // editpost(LocItems) {
  //  // if (this.LocationForm1.dirty && this.LocationForm1.valid) {
  //     this.success = true;
  //     this.LocItems.Name = LocItems.Name;
  //     this.LocItems.Id = LocItems.Id;
  //     for(let i=0;i<this.stateNames.length;i++){
  //       if(this.model.StateCode==this.stateNames[i].Name){
  // this.model.StateCode=this.stateNames[i].StateCode;
  //       }
  //     }
  //     console.log('editpost  ' + JSON.stringify(this.LocItems));
  //     this._locationService.PostLocation(this.LocItems).subscribe (
  //       Data => {
  //         this.disableButton = true;
  //         console.log('Location Responce' + Data);
  //         // if (Data.Success) {
  //         //     this.success('Location Edited', 'edit');
  //         // } else {
  //         //     this.error(Data.data);
  //         // }
  //       }
  //     );
  //  // }
  // }


  editpost() {
    //  if (this.LocationForm1.dirty && this.LocationForm1.valid) {
      // alert(JSON.stringify(LocItems))
        this.success = true;
       //  this.LocItems.Name = LocItems.Name;
       //  this.LocItems.Id = LocItems.Id;
       this.editItems.LocationName = this.editItems.LocationName;
      // this.model.StateCode=this.model.StateCode;
      //  alert(JSON.stringify(this.model));
      for(let i=0;i<this.stateNames.length;i++){
        if(this.editItems.StateCode==this.stateNames[i].Name){
  this.editItems.StateCode = this.stateNames[i].StateCode;
        }
      }
      this.editItems.StateCode = this.editItems.StateCode.StateCode;
      this.editItems.IsActive = true;
      //  console.log('editpost  ' + JSON.stringify(this.editItems));
        this._locationService.PostLocation(this.editItems).subscribe (
          Data => {
            this.disableButton = true;
          //  console.log('Location Responce' +JSON.stringify( Data));
            if (Data.Success==true) {
                this.Success('Location Edited', 'edit');
            } else {
                this.Error(Data.data,'edit');
            }
          }
        );
    //  }
    }



 /** Add,Edit,delete Referral methods end */
    /** Toast messages for success and failure */
    Success(successmsg, type) {
      this.toastr.setRootViewContainerRef(this._rootViewContainerRef);
      this._toast.ShowAlert(successmsg, '', 'Success');
      if (type === 'add') {
          this.addLocation.hide();
       //   this.editLocation.hide();
      }
      if (type === 'edit') {
          this.editLocation.hide();
      }
      this.getlocation().add(() => {
      });
  }
  Error(errormsg, type) {
    this.toastr.setRootViewContainerRef(this._rootViewContainerRef);
      this._toast.ShowAlert(errormsg, '', 'Error');
      this.disableButton = false;
  }



 
 
}