import { Validators, FormBuilder } from '@angular/forms';
import { DesignationModel } from './../../../models/designation.model';
import { Component, OnInit, ViewContainerRef, ViewChild } from '@angular/core';
import { DesignationService } from './designation.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Toast } from 'ng2-toastr/src/toast';
import { ModalDirective } from 'angular-bootstrap-md';
import { ValidationService } from '../../../shared/validation/validation.service';
import { DesignationPipe } from './designationPipe';
import { OrderPipe } from 'ngx-order-pipe';
declare var jQuery: any;
@Component({
    moduleId: module.id,
    selector: 'app-designation',
    templateUrl: 'designation.component.html',
    styleUrls: ['designation.component.scss'],
    providers: [DesignationService , ToastsManager,OrderPipe]
})
export class DesignationComponent implements OnInit {
    private _rootViewContainerRef: ViewContainerRef;
    @ViewChild('addDesignation') public adddes: ModalDirective;
    @ViewChild('edit1') public editdes: ModalDirective;
    // to disable save button
    disableButton: boolean;
    page: number = 1;
    userFilter: string;
    // Assigning Providers designation data
    model: any = [];
    personrequestForm: boolean;
    // post data model for provider designation
    designation: DesignationModel;
    order: string ;
    reverse: boolean = false;
    f: any;
    f1: any;
    // post data model for updating the provider designation
    editItem: any = {};

    Success: boolean;
    ediSuccess: boolean;
    constructor(private _slotConfigurationService: DesignationService, 
        private formBuilder: FormBuilder,
        private orderPipe: OrderPipe,
        public toastr: ToastsManager, vRef: ViewContainerRef) {
       //  this.toastr.setRootViewContainerRef(vcr);
        this.disableButton = false;
        this.designation = new DesignationModel();
        this.editItem = new DesignationModel();
        this.f = this.formBuilder.group({
            'Name': ['', Validators.required, ValidationService.alphabeticsValidator],
    });
    this.f1 = this.formBuilder.group({
        'Name': ['', Validators.required, ValidationService.alphabeticsValidator],
    });
    this._rootViewContainerRef = vRef;
}
    /**
     * Page load method
     */
    ngOnInit() {
        this.toastr.setRootViewContainerRef(this._rootViewContainerRef);
        this.getDesigntion();
    }
    // This method is used for hiding and unhiding forms
    addDesignation() {
        this.Success = false;
    }
    /**
    * Assigning the data of indivisual provider
    * @param providerData:Provider data
    */
    edit(item) {
        this.editItem = item;
    //    console.log(this.editItem);
        this.ediSuccess = false;
    }

    /**
     * Post designation  have Name and Id
     * @param designation: Post data of provider
     */
    savePost(designation, f1) {
        if (this.f1.dirty && this.f1.valid){
     //   console.log(designation);
        this._slotConfigurationService.postDesigntion(designation).subscribe(
            Data => {
                this.disableButton = true;
         //       console.log('Designtion Responce' + JSON.stringify(Data));
                if (Data.Success) {

                    this.success('Designation added', 'add');

                } else {
                    this.error(Data.data);
                }

            }
        );
        // f1.resetForm();
    }
}

    /**
     * post designation  have Name and Id for updating
     * @param designation: Provider post data
     */
    editpost(editItem) {
        if (this.f.dirty && this.f.valid) {
        this.ediSuccess = true;
        this.editItem.Name = editItem.Name;
        this.editItem.Id = editItem.Id;
   //     console.log('editpost  ' + JSON.stringify(this.editItem));
        this._slotConfigurationService.postDesigntion(this.editItem).subscribe(
            Data => {
                this.disableButton = true;
           //     console.log('Designtion Responce' + Data);
                if (Data.Success) {
                    this.success('Designation Edited', 'edit');
                } else {
                    this.error(Data.data);
                }
            }
        );
    }
}

    /**
     * Getting provider designation data
     */
    getDesigntion() {
        return this._slotConfigurationService.getDesigntion().subscribe(
            Data => {
                this.disableButton = false;
              //  console.log('getDesigntion' + (JSON.stringify(this.model = Data.data)));
                this.model = Data.data;
                this.order = 'Name';
                console.log(this.orderPipe.transform(this.model, this.order));
            }
        );
    }
    setOrder(value: string) {
        // if (this.order === value) {
          this.reverse = !this.reverse;
        // }
     //   console.log(this.orderPipe.transform(this.providerData, this.order));
        // this.providerData = this.orderPipe.transform(this.providerData, this.order);
        this.order = value;
      }
    cancel() {
        this.getDesigntion();
    }
    /** Toast messages for success and failure */
    success(successmsg, type) {
        this.toastr.setRootViewContainerRef(this._rootViewContainerRef);
        this.toastr.success(successmsg, null, {
            dismiss: 'controlled', showCloseButton: true,
            positionClass: 'toast-bottom-right', newestOnTop: true, progressBar: false,
            showEasing: 'swing', closeButton: false, 'preventDuplicates': false,
            'debug': false, 'hideEasing': 'linear',
            'showMethod': 'fadeIn',
            'hideMethod': 'fadeOut'
        }).then((toast: Toast) => {
            setTimeout(() => {
                this.toastr.dismissToast(toast);
                // if (type === 'add') {

                //     jQuery('#addDesignation').modal('hide');
                // } else {
                //     jQuery('#myModaldesg').modal('hide');
                // }
                 this.adddes.hide();
                 this.editdes.hide();
                this.designation = new DesignationModel();
                this.getDesigntion().add(() => {
                });
            }, 3000);
        });
    }
    error(errormsg) {
        this.toastr.setRootViewContainerRef(this._rootViewContainerRef);
        this.toastr.error(errormsg, null, {
            dismiss: 'controlled', showCloseButton: true,
            positionClass: 'toast-bottom-right', newestOnTop: true, progressBar: false,
            showEasing: 'swing', closeButton: false, 'preventDuplicates': false,
            'debug': false, 'hideEasing': 'linear',
            'showMethod': 'fadeIn',
            'hideMethod': 'fadeOut'
        }).then((toast: Toast) => {
            setTimeout(() => {
                this.toastr.dismissToast(toast);
                this.getDesigntion().add(() => {
                });
            }, 3000);
        });
    }
}
