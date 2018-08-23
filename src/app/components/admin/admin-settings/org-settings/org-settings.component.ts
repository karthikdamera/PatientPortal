import { Component, OnInit, ChangeDetectorRef, ViewContainerRef } from '@angular/core';
import { AdminSettingsService } from '../admin-settings.service';
import { Toast, ToastsManager } from 'ng2-toastr';
import { AsyncValidatorFn, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ValidationService } from '../../../../shared/validation/validation.service';
import { OrganisationModel } from '../../../../models/tenant.model';
import { ToastService } from '../../../../shared/services/toastService';
import { SchedulerService } from '../../../person/scheduler/scheduler.service';
import { UnMaskedData } from '../../../../shared/services/unmaskdata';
@Component({
    selector: 'app-org-settings',
    templateUrl: './org-settings.component.html',
    styleUrls: ['./org-settings.component.scss'],
    providers: [AdminSettingsService, ToastService, SchedulerService,ToastsManager]

})
export class OrgSettingsComponent implements OnInit {
    private _rootViewContainerRef: ViewContainerRef;
    public file_srcs: string[] = [];
    public debug_size_before: string[] = [];
    public debug_size_after: string[] = [];
    ImageUrl: string;
    orgmodel: OrganisationModel;
    orgicon: string;
    orgForm: any;
    phonests: boolean;
    unmask = UnMaskedData;
    filteredList1: any = [];
    items1: any = [];
    items2: any = [];
    public filteredList2 = [];
    constructor(private changeDetectorRef: ChangeDetectorRef,
        public _appoinmentservice: SchedulerService,
        private _toast: ToastService, private _adminsettingservice: AdminSettingsService,
        public toastr: ToastsManager, vRef: ViewContainerRef, private formBuilder: FormBuilder) {
        this.orgmodel = new OrganisationModel();
       // this.toastr.setRootViewContainerRef(vcr);
        this.orgForm = this.formBuilder.group({
            'OrgName': ['', Validators.required, ValidationService.alphabeticsValidator],
            'Email': ['', Validators.required, ValidationService.emailValidator],
            'OrgFax': ['', [Validators.required, Validators.minLength(10)], ValidationService.numericalsValidatorFromzero],
            'OrgPhoneNo': ['', Validators.required],
            'OrgLocationurl': [''],
            'DefaultLocationId': [''],
            'DefaultAppointmentTypeId': ['']
        });
        this._rootViewContainerRef = vRef;
        this.phonests = false;
    }

    ngOnInit() {
        this.toastr.setRootViewContainerRef(this._rootViewContainerRef);
        this.getorgdata();
        this.getAppoinmnetType();
        this.gettlocation();
        // this.getorgdata();
    }
    fileChange(input) {
        this.file_srcs = [];
        // this.model.ImageUrl = '';
        var filePath = input.value;
        var allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
        if (!allowedExtensions.exec(filePath)) {
            //  alert('Please upload file having extensions .jpeg/.jpg/.png/.gif only.');
            input.value = '';
            return false;
        } else {
            this.readFiles(input.files);
        }
    }
    readFile(file, reader, callback) {
        // Set a callback funtion to fire after the file is fully loaded
        reader.onload = () => {
            // callback with the results
            callback(reader.result);
        };
        // Read the file
        reader.readAsDataURL(file);
    }
    readFiles(files, index = 0) {
        // Create the file reader
        let reader = new FileReader();
        // If there is a file
        if (index in files) {
            // Start reading this file
            this.readFile(files[index], reader, (result) => {
                // Create an img element and add the image file data to it
                var img = document.createElement('img');
                img.src = result;
                // Send this img to the resize function (and wait for callback)
                this.resize(img, 250, 250, (resized_jpeg, before, after) => {
                    // For debugging (size in bytes before and after)
                    this.debug_size_before.push(before);
                    this.debug_size_after.push(after);
                    // Add the resized jpeg img source to a list for preview
                    // This is also the file you want to upload. (either as a
                    // base64 string or img.src = resized_jpeg if you prefer a file).
                    this.file_srcs.pop();
                    this.file_srcs.push(resized_jpeg);
                    this.orgmodel.OrgLogo = this.file_srcs[0].replace(this.file_srcs[0].substr(0, 23), '');
                    // console.log(this.model.ImageUrl);
                    // Read the next file;
                    this.readFiles(files, index + 1);
                    // this.onlyimageupload();
                });
            });
        } else {
            // When all files are done This forces a change detection
            this.changeDetectorRef.detectChanges();
        }
    }
    resize(img, MAX_WIDTH: number, MAX_HEIGHT: number, callback) {
        // This will wait until the img is loaded before calling this function
        return img.onload = () => {
            console.log('img loaded');
            // Get the images current width and height
            var width = img.width;
            var height = img.height;
            // Set the WxH to fit the Max values (but maintain proportions)
            if (width > height) {
                if (width > MAX_WIDTH) {
                    height *= MAX_WIDTH / width;
                    width = MAX_WIDTH;
                }
            } else {
                if (height > MAX_HEIGHT) {
                    width *= MAX_HEIGHT / height;
                    height = MAX_HEIGHT;
                }
            }
            // create a canvas object
            var canvas = document.createElement('canvas');
            // Set the canvas to the new calculated dimensions
            canvas.width = width;
            canvas.height = height;
            var ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0, width, height);
            // Get this encoded as a jpeg
            // IMPORTANT: 'jpeg' NOT 'jpg'
            var dataUrl = canvas.toDataURL('image/jpeg');
            // callback with the results
            callback(dataUrl, img.src.length, dataUrl.length);
        };
    }
    getorgdata() {
        return this._adminsettingservice.getorgdata().subscribe(
            res => {
              //  this.orgmodel = res.data;
        this.orgmodel.OrgLogo = res.data.OrgLogo;
        this.orgmodel.OrgName = res.data.OrgName;
        this.orgmodel.OrgShortLogo = res.data.OrgShortLogo;
        this.orgmodel.OrgPhoneNo = res.data.OrgPhoneNo;
        this.orgmodel.OrgEmail = res.data.OrgEmail;
        this.orgmodel.OrgFax = res.data.OrgFax;
        this.orgmodel.OrgLocationurl = res.data.OrgLocationurl;
        this.orgmodel.DefaultLocationId = res.data.DefaultLocationId;
        if (res.data.DefaultAppointmentTypeId != '' || res.data.DefaultAppointmentTypeId != null) {
        this.orgmodel.DefaultAppointmentTypeId = parseInt(res.data.DefaultAppointmentTypeId);
            }
        this.orgmodel.DefaultAppointmentTypeName = res.data.DefaultAppointmentTypeName;
        this.orgmodel.DefaultLocationName = res.data.DefaultLocationName;
               // console.log('orgsetting' + JSON.stringify(this.orgmodel));
                if (this.orgmodel.OrgLogo != '') {
                    this.orgicon = this.orgmodel.OrgLogo;
                }
            }
        );

    }



    getAppoinmnetType() {
       // console.log(this.orgmodel.DefaultAppointmentTypeId);
        return this._appoinmentservice.getAppoinmenttype().subscribe(
            res => {
                this.items1 = res.data;
                this.filteredList1 = this.items1.filter((el: any) => {
                    return el; // .FirstName.toLowerCase().indexOf(this.query.toLowerCase()) > -1;
                });
                // console.log('appoinment ' + JSON.stringify(this.filteredList1));
            }
        );
    }
    gettlocation() {
        return this._appoinmentservice.getLocationtype().subscribe(
            res => {
                // this.locationtype = '';
                this.items2 = res.data;
                this.filteredList2 = this.items2.filter((el: any) => {
                    return el; // .FirstName.toLowerCase().indexOf(this.query.toLowerCase()) > -1;
                });
                // console.log(JSON.stringify(this.filteredList2));
            }

        );
    }
    updateorg() {
        let filterdata: any = [];
        let data: any = [];
        // appoinmnet type
        filterdata = this.filteredList1.filter(
            filterID => filterID.Id ===  this.orgmodel.DefaultAppointmentTypeId
        );
        if (filterdata.length > 0) {
            console.log(''+ filterdata[0]);
            this.orgmodel.DefaultAppointmentTypeName = filterdata[0].Name;
        }
        // location
        data = this.filteredList2.filter(
            filterID => filterID.Id === this.orgmodel.DefaultLocationId
        );
        if (data.length > 0) {
            this.orgmodel.DefaultLocationName = data[0].LocationName;
        }
        this.orgmodel.OrgShortLogo = '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';
        if (this.orgForm.valid) {
            console.log(JSON.stringify(this.orgmodel) + ',' + JSON.stringify(this.ImageUrl));
            this._adminsettingservice.postorgdata(this.orgmodel).subscribe(
                res => {
                    if (res.success = true) {
                        // this.orgmodel=new OrganisationModel();
                        this.success('Organisation Info Updated', 'update');
                    } else {
                        this.error(res.data, '');
                    }
                });
        }
    }

    getNHSNumberMask() {
        return {
          mask: ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
          guide: true,
          placeholderChar: '_',
          keepCharPositions: true
        };
      }
      unmasckphone(event) {
        this.phonests = false;
        if (this.orgmodel.OrgPhoneNo !== '') {
          //   console.log('@@@' + this.personrequestmodel.PhoneNo);
          this.orgmodel.OrgPhoneNo = this.unmask(event.target.value);
          //  console.log(this.personrequestmodel.PhoneNo);
            if (this.orgmodel.OrgPhoneNo.length !== 10) {
                this.phonests = true;
            } else {
                this.phonests = false;
            }
          //  console.log(this.phonests);
        }
    }
    success(successmsg, type) {
        this.toastr.setRootViewContainerRef(this._rootViewContainerRef);
        this._toast.ShowAlert(successmsg, '', 'Success');


    }


    error(errormsg, type) {
        this.toastr.setRootViewContainerRef(this._rootViewContainerRef);
        this._toast.ShowAlert(errormsg, '', 'Error');
        // this.disableButton = false;
    }


}
