import { Component, OnInit, ViewContainerRef, ChangeDetectorRef, ViewChild} from '@angular/core';
import { StaffModel } from '../../../models/staff.model';
import { ValidationService } from '../../../shared/validation/validation.service';
import { ValidationComponent } from '../../../shared/validation/validation.component';
import { StaffService } from './staff.service';
import { DatePipe, AsyncPipe } from '@angular/common';
import { AsyncValidatorFn, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Toast } from 'ng2-toastr/src/toast';
import { UnMaskedData } from '../../../shared/services/unmaskdata';
import { ModalDirective } from 'angular-bootstrap-md';
import { StaffPipe } from './staffPipe';
import { OrderPipe } from 'ngx-order-pipe';
declare var jQuery: any;
@Component({
    moduleId: module.id,
    selector: 'app-staff',
    templateUrl: 'staff.component.html',
    styleUrls: ['staff.component.scss'],
    providers: [StaffService, DatePipe , ToastsManager, OrderPipe]
})
export class StaffComponent implements OnInit {
    private _rootViewContainerRef: ViewContainerRef;
    @ViewChild('addStaff') public addstaff: ModalDirective;
    @ViewChild('myModalstaff') public editstaff: ModalDirective;
    // to disable save button
    disableButton: boolean;
    profileimage: string;
    page: number = 1;
    order: string ;
    reverse: boolean = false;
    userFilter: string;
    phonestssec:boolean;
    public file_srcs: string[] = [];
    public debug_size_before: string[] = [];
    public debug_size_after: string[] = [];
    // <------Assigning staffmodel to variable----->
    model: StaffModel;
    staffForm: any;
    staffForm1: any;
    adminData: any = {};
    // <----- to store the particular staff info----->
    editItems: any = {};
    // <---get call variable of designations---->
    data: any = [];
    // <-----for error message------->
    error: any;
    phonealtstssec:boolean;
    unmask = UnMaskedData;
    // <---for current date-->
    date: any;
    // <---get call variable of stafflist------>
    staffData: any = [];
    // <---for display success message-->
    success: boolean;
    // Response data of posting the data of provider
    message: any = {};
    errmsg: boolean;
    constructor(private changeDetectorRef: ChangeDetectorRef, private orderPipe: OrderPipe, private _staffService: StaffService, private datepipe: DatePipe,
         private formBuilder: FormBuilder,
        public toastr: ToastsManager, vRef: ViewContainerRef) {
        // this.toastr.setRootViewContainerRef(vcr);
        this.model = new StaffModel();
        this.disableButton = false;
        this.profileimage = '';
        this.phonestssec = false;
        this.phonealtstssec=false;
        this.date = new Date();
        this.adminData = JSON.parse(localStorage.getItem('loginData'));
        this.model.Date = this.datepipe.transform(this.date, 'dd/MMM/yyyy');
        this.staffForm = this.formBuilder.group({
            'StaffName': ['', Validators.required, ValidationService.alphabeticsValidator],
            'Email': ['', Validators.required, ValidationService.emailValidator],
            'DesignationId': ['', Validators.required],
            'PhoneNo': ['', Validators.required,],
            'AltPhoneNo': ['']
        });
        this.staffForm1 = this.formBuilder.group({
            'StaffName': ['', Validators.required, ValidationService.alphabeticsValidator],
            'Email': [''],
            'DesignationId': ['', Validators.required],
            'PhoneNo': ['', Validators.required],
            'AltPhoneNo': ['']
        });
        this._rootViewContainerRef = vRef;
    }
    /**
     * on page load data will loads
     */
    ngOnInit() {
        this.toastr.setRootViewContainerRef(this._rootViewContainerRef);
        // console.log('model  ' + JSON.stringify(this.model));
        this.GetDesignations();
        this.getStaffInfo();
    }
    // This method is used for hiding and unhiding forms
    newStaff() {
        this.success = false;
        this.errmsg = false;
        this.file_srcs = [];
        this.profileimage = '';
    }

    fileChange(input) {
        // alert();
        this.file_srcs = [];
        this.model.ImageUrl = '';
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
                    this.model.ImageUrl = this.file_srcs[0].replace(this.file_srcs[0].substr(0, 23), '');
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
          //  console.log('img loaded');
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
    /**
     * to get all staff Designations
     */
    GetDesignations() {
        this._staffService.GetDesignations().subscribe(
            Data => {
                this.data = Data.data;
                // console.log('dropdown information' + (JSON.stringify(this.data = Data.data)));
            }
        );
    }
    /**
     * on get call gets all the existed staff information
     */
    getStaffInfo() {
        return this._staffService.getStaffInfo().subscribe(
            res => {
                this.disableButton = false;
                this.staffData = res.data;
               // console.log(this.staffData);
                // console.log('staff information' + (JSON.stringify(this.staffData = res.data)));
                this.order = 'StaffName';
                console.log(this.orderPipe.transform(this.staffData, this.order));
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
    /**
     * on click of edit particular staff record will come
     * @param value
     */
    edit(value) {
        this.editItems = {};
        this.file_srcs = [];
        this.profileimage = '';
        this.editItems = value;
       // console.log('img' + this.editItems.ImageUrl);
       // console.log(val ue);
        if (value.ImageUrl === '' || value.ImageUrl == null) {
            // alert();
        } else {
           // this.profileimage = 'data:image/jpeg;base64,' + value.ImageUrl;
           this.profileimage = value.ImageUrl;
        }
        this.success = false;
        this.errmsg = false;
        this.phonestssec = false;
        this.phonealtstssec = false;
        // console.log('editstaff' + JSON.stringify(this.editItems));
    }
    /**
     * posting the staff information
     */
    postStaffInfo() {
        if (this.staffForm.dirty && this.staffForm.valid  && (this.phonestssec == false && this.phonealtstssec == false))  {
           // alert(JSON.stringify(this.model));
            this._staffService.postStaffInfo(this.model).subscribe(
                res => {
                    this.disableButton = true;
                     // console.log((JSON.stringify(this.message = res)));
                     this.message = res;
                    // this conditions are used for hiding and unhiding forms
                    if (res.Success === true) {
                        // this.success = true;
                        this.Success('Profile added successfully', 'add');
                        // this.getStaffInfo();
                    } else {
                        //    this.errmsg = true;
                        //    setTimeout(() => {
                        //        this.message = '';
                        //        console.log(this.message);
                        //        this.errmsg = false;
                        //    }, 7000);
                        this.Error(res.data, 'add');
                    }
                });
            // <-----after submit the form ,then form will clear the data ------>
            // this.model.StaffName = '',
            // this.model.Email = '',
            // this.model.DesignationId = '',
            // this.model.PhoneNo = null,
            // this.model.AltPhoneNo = null;
        }
    }
    /**
     * edit and post the staff information
     * @param editItems
     */
    editPost(editItems) {
        // console.log(this.model.ImageUrl);
        if ((this.staffForm1.dirty && this.staffForm1.valid && this.phonestssec == false && this.phonealtstssec == false) || (this.model.ImageUrl !== '') ) {
            this.editItems.DesignationId = editItems.DesignationId;
            this.editItems.Date = this.model.Date;
            this.editItems.IsActive = true;
            this.editItems.UserName = this.adminData.FirstName + this.adminData.LastName;
            // if (this.model.ImageUrl === '') {
            //     this.editItems.ImageUrl = this.profileimage.replace('data:image/jpeg;base64,', '');
            if (this.editItems.ImageUrl != '' && this.editItems.ImageUrl != null && this.editItems.ImageUrl.toString().indexOf('http://') >= 0) {

                this.editItems.ImageUrl = '';
            } else {
                this.editItems.ImageUrl = this.model.ImageUrl;
            }
         //   console.log(JSON.stringify(editItems));
            this._staffService.postStaffInfo(this.editItems).subscribe(
                res => {
                    this.disableButton = true;
                    // console.log((JSON.stringify(this.message = res)));
                    // this conditions are used for hiding and unhiding forms
                    if (res.Success === true) {
                        // this.success = true;
                        this.Success('Staff updated successfully', 'update');
                        // this.getStaffInfo();
                    } else {
                        this.Error(res.data, 'update');
                        // this.errmsg = true;
                        // setTimeout(() => {
                        //     this.message = '';
                        //     this.errmsg = false;
                        // }, 5000);
                    }
                });
        }
    }
    // cancel for reload GetStaffList
    cancel() {
        this.getStaffInfo();
    }

    toClear() {
        this.model = new StaffModel();
        this.file_srcs = [];
        this.profileimage = '';
        this.phonestssec = false;
        this.phonealtstssec = false;
    }
    /** Add,Edit,delete Referral methods end */
    /** Toast messages for success and failure */
    Success(successmsg, type) {
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
                //     jQuery('#addStaff').modal('hide');
                // }
                // if (type === 'update') {
                //     jQuery('#myModalstaff').modal('hide');
                // }
            this.addstaff.hide();
            this.editstaff.hide();
                this.getStaffInfo().add(() => {
                    this.model = new StaffModel();
                });
                this.disableButton = true;
            }, 2000);
        });
    }
    Error(errormsg, type) {
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
                // if (type === 'add') {
                //     jQuery('#addStaff').modal('hide');
                // }
                // if (type === 'update') {
                //     jQuery('#myModal1').modal('hide');
                // }
                this.getStaffInfo().add(() => {
                });
            }, 2000);
        });
    }
    //input masks

    getphoneno() {
        return {
          mask: ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
          guide: true,
          placeholderChar: '_',
          keepCharPositions: true
        };
      }
      getaltphoneno() {
        return {
          mask: ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
          guide: true,
          placeholderChar: '_',
          keepCharPositions: true
        };
      }
      unmasckphone(type) {
        this.phonestssec = false;
        if (type === 'addphno') {
        if (this.model.PhoneNo !== '') {
          //   console.log('@@@' + this.model.PhoneNo);
            this.model.PhoneNo= this.unmask(this.model.PhoneNo);
         //   console.log(this.model.PhoneNo);
            if (this.model.PhoneNo.length !== 10) {
                this.phonestssec = true;
            } else {
                this.phonestssec = false;
            }
        //    console.log(this.phonestssec);
        }
    } else if (type === 'editphno') {
        if (this.editItems.PhoneNo !== '') {
           // console.log('@@@' + this.editItems.PhoneNo);
           this.editItems.PhoneNo =  this.unmask(this.editItems.PhoneNo);
         //  console.log(this.editItems.PhoneNo);
           if (this.editItems.PhoneNo.length !== 10) {
               this.phonestssec = true;
           } else {
               this.phonestssec = false;
           }
         //  console.log(this.phonestssec);
       }
    }
    }
    unmasckaltphone(type){
        this.phonealtstssec = false;
        if(type==='addaltphno'){
        if (this.model.AltPhoneNo !== '') {
           //  console.log('@@@' + this.model.AltPhoneNo);
            this.model.AltPhoneNo= this.unmask(this.model.AltPhoneNo);
          //  console.log(this.model.PhoneNo);
            if (this.model.AltPhoneNo.length !== 10) {
                this.phonealtstssec = true;
            } else {
                this.phonealtstssec = false;
            }
          //  console.log(this.phonealtstssec);
        }
    } else if(type==='editaltphno'){
        if (this.editItems.AltPhoneNo !== '') {
         //   console.log('@@@' + this.editItems.AltPhoneNo);
           this.editItems.AltPhoneNo= this.unmask(this.editItems.AltPhoneNo);
         //  console.log(this.editItems.AltPhoneNo);
           if (this.editItems.AltPhoneNo.length !== 10) {
               this.phonealtstssec = true;
           } else {
               this.phonealtstssec = false;
           }
        //   console.log(this.phonealtstssec);
       }
    }
    }
    
}
