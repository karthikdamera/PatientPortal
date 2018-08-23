

import { sessionenum } from './../../../models/person-slot.model';
import { Component, OnInit, ViewContainerRef, ChangeDetectorRef } from '@angular/core';
import { StaffModel } from '../../../models/staff.model';
import { ValidationService } from '../../../shared/validation/validation.service';
import { ValidationComponent } from '../../../shared/validation/validation.component';
// import { StaffService } from './staff.service';
import { DatePipe, AsyncPipe } from '@angular/common';
import { AsyncValidatorFn, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Toast } from 'ng2-toastr/src/toast';
import { StaffService } from './profile.service';
import { adminstaff } from '../../../models/person-slot.model';
import { UnMaskedData } from '../../../shared/services/unmaskdata';
import { ToastService } from '../../../shared/services/toastService';
import { CommonService } from '../../../shared/services/common.service';
import { admin } from '../admin.component';
declare var jQuery: any;
@Component({
    moduleId: module.id,
    selector: 'app-adminprofile',
    templateUrl: 'profile.component.html',
    styleUrls: ['profile.component.scss'],
    providers: [StaffService, DatePipe, ToastService]
})
export class AdminProfileComponent implements OnInit {
    // to disable save button
    disableButton: boolean;
    profileimage: string;
    page: number = 1;
    public file_srcs: string[] = [];
    public debug_size_before: string[] = [];
    public debug_size_after: string[] = [];
    public mask: Array<string | RegExp>;
    // <------Assigning staffmodel to variable----->
    model: StaffModel;
    staffForm: any;
    staffForm1: any;
    adminData: any = {};
    base64Imgcode: any;
    // <----- to store the particular staff info----->
    editItems: any = {};
    // <---get call variable of designations---->
    data: any = [];
    // <-----for error message------->
    error: any;
    // <---for current date-->
    date: any;
    // <---get call variable of stafflist------>
    staffData: any = [];
    // <---for display success message-->
    success: boolean;
    // Response data of posting the data of provider
    message: any = {};
    errmsg: boolean;
    unmask = UnMaskedData;
    phonestssec: boolean;
    phonealtstssec: boolean;
    adminlogindata: any = {};
    profileInfo: adminstaff;
    imageshow: boolean;
    imageUrl: any;
    constructor(private _toast: ToastService, private changeDetectorRef: ChangeDetectorRef,
        private _staffService: StaffService, private datepipe: DatePipe,
        private formBuilder: FormBuilder,
        public toastr: ToastsManager, vcr: ViewContainerRef,
        private commonService: CommonService , private _admin: admin) {
        this.toastr.setRootViewContainerRef(vcr);
        this.model = new StaffModel();
        this.disableButton = false;
        this.profileimage = '';
        this.date = new Date();
        this.phonestssec = false;
        this.phonealtstssec = false;
        this.mask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
        this.profileInfo = new adminstaff();
        this.adminData = JSON.parse(localStorage.getItem('loginData'));
        this.model.Date = this.datepipe.transform(this.date, 'dd/MMM/yyyy');
        this.staffForm = this.formBuilder.group({
            'StaffImage': [''],
            'StaffName': ['', Validators.required, ValidationService.alphabeticsValidator],
            'Email': ['', Validators.required, ValidationService.emailValidator],
            'DesignationName': ['', Validators.required],
            'PhoneNo': ['', Validators.required],
            'AltPhoneNo': ['']
        });
        // this.staffForm1 = this.formBuilder.group({
        //     'StaffName': ['', Validators.required, ValidationService.alphabeticsValidator],
        //     'Email': [''],
        //     'DesignationId': ['', Validators.required],
        //     'PhoneNo': ['', [Validators.required, Validators.minLength(10)], ValidationService.numericalsValidatorFromzero],
        //     'AltPhoneNo': ['', Validators.minLength(10)]
        // });
        this.adminlogindata = JSON.parse(localStorage.getItem('loginData'));
    }
    /**
     * on page load data will loads
     */
    ngOnInit() {
        // console.log('model  ' + JSON.stringify(this.model));
        this.GetDesignations();
        // this.getStaffInfo();
        this.adminlogindata = JSON.parse(localStorage.getItem('loginData'));
        this.getProfile();
    }
    // This method is used for hiding and unhiding forms
    newStaff() {
        this.success = false;
        this.errmsg = false;
        this.file_srcs = [];
        this.profileimage = '';
    }
    fileChange(input) {
        // alert(JSON.stringify(input));
        this.file_srcs = [];
        this.model.ImageUrl = '';
        var filePath = input.value;
        var allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
        if (!allowedExtensions.exec(filePath)) {
            //  alert('Please upload file having extensions .jpeg/.jpg/.png/.gif only.');
            input.value = '';
            return false;
        } else {
            // alert('resize')
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
    //    console.log(JSON.stringify(file));
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
                    this.profileInfo.ImageUrl = this.file_srcs[0].replace(this.file_srcs[0].substr(0, 23), '');
              //      console.log(this.profileInfo.ImageUrl);
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
         //   console.log('img loaded');
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
             //   console.log(JSON.stringify(this.data));
                // console.log('dropdown information' + (JSON.stringify(this.data = Data.data)));
            }
        );
    }
    /**
     * on get call gets all the existed staff information
     */
    getProfile() {
        this._staffService.getadminProfile(this.adminlogindata.Id).subscribe(
            res => {
                this.profileInfo = res.data;
                // this.profileimage = 'data:image/jpeg;base64,' + this.profileInfo.ImageUrl;
           //     console.log('getprofile'+ JSON.stringify(this.profileInfo ));
                this.profileimage = this.profileInfo.ImageUrl += '?random+\=' + Math.random();
             //   console.log('get obj of admin profile' + '   ' + JSON.stringify(this.profileInfo));
                if (this.profileimage === '') {
                    this.imageshow = true;
                } else {
                    this.imageshow = false;
                }
            }

        );

    }

    /**
     * on click of edit particular staff record will come
     * @param value
     */

    /**
     * edit and post the staff information
     * @param editItems
     */

    postStaffInfo() {
        if ((this.staffForm.dirty && this.phonestssec == false && this.phonealtstssec == false) || (this.profileInfo.ImageUrl != '')) {
            let date: Date;
            date = new Date();
            const currentdate = this.datepipe.transform(date, 'MM/dd/yyyy');
            this.profileInfo.Date = currentdate;
            // this.profileInfo.ImageUrl = this.profileInfo.ImageUrl;
            // debugger;
            if ((this.profileInfo.ImageUrl != '') && ((this.profileInfo.ImageUrl.toString().indexOf('http://') >= 0) ||
                (this.profileInfo.ImageUrl.toString().indexOf('https://') >= 0) || 
                (this.profileInfo.ImageUrl.toString().includes('?random'))||
                (this.profileInfo.ImageUrl.toString().includes('http://') ||
                    this.profileInfo.ImageUrl.toString().includes('https://')))) {

                this.profileInfo.ImageUrl = '';

            }
       //     console.log('post obj' + JSON.stringify(this.profileInfo));
            this._staffService.postStaffInfo(this.profileInfo).subscribe(
                res => {
                    this.disableButton = true;
                    if (res.Success === true) {
                        this.Success('Staff updated successfully', 'add');
                        this._staffService.sendimage(this.profileInfo.ImageUrl += '?random+\=' + Math.random());
                    this._admin.getProfile();
                    } else {
                        // this.Error(res.data, 'add');
                        this.Error('Staff is not updated ', 'add');
                    }
                });
        }

    }

    designationid(desname) {
        for (let i = 0; i < this.data.length; i++) {
            if (this.data[i].Name === desname) {
                this.profileInfo.DesignationId = this.data[i].Id;
            }
        }
    }
    cancel() {

    }
    toClear() {
        this.model = new StaffModel();
        this.file_srcs = [];
        this.profileimage = '';
    }
    /** Add,Edit,delete Referral methods end */
    /** Toast messages for success and failure */
    Success(successmsg, type) {
        this._toast.ShowAlert(successmsg, '', 'Success');
    }
    // Success(successmsg, type) {
    //     this.toastr.success(successmsg, null, {
    //         dismiss: 'controlled', showCloseButton: true,
    //         positionClass: 'toast-bottom-right', newestOnTop: true, progressBar: false,
    //         showEasing: 'swing', closeButton: false, 'preventDuplicates': false,
    //         'debug': false, 'hideEasing': 'linear',
    //         'showMethod': 'fadeIn',
    //         'hideMethod': 'fadeOut'
    //     }).then((toast: Toast) => {
    //         setTimeout(() => {
    //             this.toastr.dismissToast(toast);
    //             if (type === 'add') {
    //                 jQuery('#addStaff').modal('hide');
    //             }
    //             if (type === 'update') {
    //                 jQuery('#myModal1').modal('hide');
    //             }

    //                 this.model = new StaffModel();

    //             this.disableButton = true;
    //         }, 2000);
    //     });
    // }
    Error(errormsg, type) {
        this._toast.ShowAlert(errormsg, '', 'Error');
    }
    // Error(errormsg, type) {
    //     this.toastr.error(errormsg, null, {
    //         dismiss: 'controlled', showCloseButton: true,
    //         positionClass: 'toast-bottom-right', newestOnTop: true, progressBar: false,
    //         showEasing: 'swing', closeButton: false, 'preventDuplicates': false,
    //         'debug': false, 'hideEasing': 'linear',
    //         'showMethod': 'fadeIn',
    //         'hideMethod': 'fadeOut'
    //     }).then((toast: Toast) => {
    //         setTimeout(() => {
    //             this.toastr.dismissToast(toast);
    //             // if (type === 'add') {
    //             //     jQuery('#addStaff').modal('hide');
    //             // }
    //             // if (type === 'update') {
    //             //     jQuery('#myModal1').modal('hide');
    //             // }

    //         }, 2000);
    //     });
    // }
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
    unmasckphone() {
        this.phonestssec = false;
        if (this.profileInfo.PhoneNo !== '') {
        //    console.log('@@@' + this.profileInfo.PhoneNo);
            this.profileInfo.PhoneNo = this.unmask(this.profileInfo.PhoneNo);
          //  console.log(this.profileInfo.PhoneNo);
            if (this.profileInfo.PhoneNo.length !== 10) {
                this.phonestssec = true;
            } else {
                this.phonestssec = false;
            }
         //   console.log(this.phonestssec);
        }
    }
    unmasckaltphone() {
        this.phonealtstssec = false;
        if (this.profileInfo.AltPhoneNo !== '') {
        //    console.log('@@@' + this.profileInfo.AltPhoneNo);
            this.profileInfo.AltPhoneNo = this.unmask(this.profileInfo.AltPhoneNo);
         //   console.log(this.profileInfo.AltPhoneNo);
            if (this.profileInfo.AltPhoneNo.length !== 10) {
                this.phonealtstssec = true;
            } else {
                this.phonealtstssec = false;
            }
         //   console.log(this.phonealtstssec);
        }
    }


}

