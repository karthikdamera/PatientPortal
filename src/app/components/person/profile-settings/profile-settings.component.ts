import { Component, OnInit, ViewContainerRef, ChangeDetectorRef, ViewChild } from '@angular/core';
import { DatePipe, AsyncPipe } from '@angular/common';
import { ProfileSettingsService } from './profile-settings.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Toast } from 'ng2-toastr/src/toast';
import { FormsModule } from '@angular/forms';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
// import {ImageCropperComponent, CropperSettings, Bounds} from 'ng2-img-cropper';

import { PersonalInfo } from './../../../models/person-slot.model';
import { ValidationComponent } from './../../../shared/validation/validation.component';
import { ValidationService } from './../../../shared/validation/validation.service';
import { NgxMyDatePickerDirective, INgxMyDpOptions, IMyInputFieldChanged, IMyDate, IMyDateModel } from 'ngx-mydatepicker';
import { UnMaskedData } from '../../../shared/services/unmaskdata';
import { ToastService } from '../../../shared/services/toastService';
import { PersonComponent } from '../person.component';
declare var jQuery: any;
// import { ClientHeaderComponent } from '../../../shared/layouts/client/client-header/client-header.component';
@Component({
    moduleId: module.id,
    selector: 'app-profile-settings',
    templateUrl: 'profile-settings.component.html',
    styleUrls: ['profile-settings.component.scss'],
    providers: [DatePipe, ProfileSettingsService, ToastService, ToastsManager]
})
export class ProfileSettingsComponent implements OnInit {
    private _rootViewContainerRef: ViewContainerRef;
    referal: any;
    changepwd: any;
    editprofile: any;
    public mask: Array<string | RegExp>;
  // public mask =  ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
    imageupload: boolean;
    // cropperSettings: CropperSettings;
    // to get  DOB
    @ViewChild('Birthdate') ngxdp: NgxMyDatePickerDirective;
    profileimage: string;
    dob = '';
    data: any;
    error: string;
    enterdatests: boolean;
    dobselect: boolean;
    ssnverified: boolean;
    imageshow: boolean;
    success: boolean;
    errmsg: boolean;
    imageurl: string;
    // selecteDate: string;
    validdate: boolean;
    personalForm: FormGroup;
    unmask = UnMaskedData;
    patientData: any;
    phonests: boolean;
    emergencyphonests: boolean;
    // variable used on click of edit to  change the view by using ng class
    editClass: boolean;
    // get profile information object
    profileInfo: PersonalInfo;
    // to get date in mm/dd/yy format
    public file_srcs: string[] = [];
    public debug_size_before: string[] = [];
    public debug_size_after: string[] = [];
    stateNames: any = [];
    states: any = [];
    countries = [];
    ssnno = {};
    croppedHeight: number;
    croppedWidth: number;
    ssnvaraible: any;
    ssnshow: boolean;
    showssn: boolean;
    disableButton: boolean;
    model: any = {
        'Birthdate': '',
        'Logindob': ''
    };
    selectcountrysts: boolean;
    myOptions: INgxMyDpOptions = {
        // other options...
        dateFormat: 'mm/dd/yyyy',
        firstDayOfWeek: 'mo',
        markCurrentDay: true,
        disableHeaderButtons: true,
        //  disableSince: { year: this.date.getFullYear(), month: this.date.getMonth() + 1, day: this.date.getDate() },
        selectorHeight: '232px',
        selectorWidth: '250px'
    };
    setState: any;
    ngOnInit() {
        this.toastr.setRootViewContainerRef(this._rootViewContainerRef);
        // on page load calling get
        this.patientData = JSON.parse(localStorage.getItem('loginData'));
        this.getProfile();
        this.getcountries();
    }
    newStaff() {
        this.success = false;
        this.errmsg = false;
        this.file_srcs = [];
        this.profileimage = '';
    }
    constructor(private changeDetectorRef: ChangeDetectorRef, private _profileSettingsService: ProfileSettingsService,
        private formBuilder: FormBuilder, public datepipe: DatePipe,
        private _toast: ToastService, public toastr: ToastsManager,
        vRef: ViewContainerRef, private _personcomponent: PersonComponent) {
        //     this.cropperSettings = new CropperSettings();
        // this.cropperSettings.width = 100;
        // this.cropperSettings.height = 100;
        // this.cropperSettings.croppedWidth = 100;
        // this.cropperSettings.croppedHeight = 100;
        // this.cropperSettings.canvasWidth = 400;
        // this.cropperSettings.canvasHeight = 300;
        this.data = {};
        this.mask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
        this.disableButton = false;
        this.imageshow = true;
        this.imageupload = true;
        // this.toastr.setRootViewContainerRef(vcr);
        this.editClass = false;
        this.selectcountrysts = false;
        this.enterdatests = false;
        this.validdate = false;
        this.phonests = false;
        this.emergencyphonests = false;
        this.profileInfo = new PersonalInfo();
        this.personalForm = this.formBuilder.group({
            'FirstName': ['', Validators.required, ValidationService.alphabeticsValidator],
            'LastName': ['', Validators.required, ValidationService.alphabeticsValidator],
            'SSN': ['', [Validators.required, Validators.minLength(9), Validators.maxLength(9)]],
            'SSN1' : [''],
            'DOB': [''],
            'PhoneNo': ['', Validators.required],
            'AltPhoneNo': ['', Validators.required],
            'Address': ['', Validators.required],
            'Address2': [''],
            'Gender': ['', Validators.required],
            'MaritialStatus': [''],
            'Zipcode': ['', [Validators.required, Validators.minLength(5), Validators.maxLength(5)],
                ValidationService.numericalsValidatorFromone],
            'City': ['', Validators.required, ValidationService.alphabeticsValidator],
            'State': ['', Validators.required],
            'Country': ['', Validators.required],
            'Email': ['', Validators.required, ValidationService.emailValidator],
        });
        this._rootViewContainerRef = vRef;

    }
    // cropped(bounds: Bounds) {
    //     this.croppedHeight = bounds.bottom - bounds.top;
    //     this.croppedWidth = bounds.right - bounds.left;
    // }
    onInputFieldDobChanged(event: IMyInputFieldChanged) {
        this.enterdatests = false;
        this.validdate = false;
        if (event.value.length >= 1) {

            this.enterdatests = true;
        }
      //  console.log('IMyInputFieldChanged' + JSON.stringify(event.value) + ',' + event.value.length + ',' + event.valid);
        if (event.value.length === 10) {
            this.validdate = event.valid;
            // this.validdatecheck = true;

          //  console.log(this.validdate);
            const selectedDate = new Date(event.value.toString());
            const mydate: IMyDate = {
                year: selectedDate.getFullYear(),
                month: selectedDate.getMonth(),
                day: selectedDate.getDay()
            }
            const dobmodal: IMyDateModel = {
                date: mydate,
                jsdate: selectedDate,
                formatted: event.value.toString(),
                epoc: 1
            };
            // alert(event.value);
         //   console.log('dobmodal' + JSON.stringify(dobmodal));
            if (this.validdate) {
                this.enterdatests = false;
                this.onDateChanged(dobmodal);
            } else {
                // this.error('Please click on calender icon and select DOB.', 'dalete');
                this.toastr.error('Please click on calender icon and select DOB.', null, {
                    dismiss: 'controlled', showCloseButton: true,
                    positionClass: 'toast-bottom-right', newestOnTop: true, progressBar: false,
                    showEasing: 'swing', closeButton: false, 'preventDuplicates': false,
                    'debug': false, 'hideEasing': 'linear',
                    'showMethod': 'fadeIn',
                    'hideMethod': 'fadeOut'
                }).then((toast: Toast) => {
                    setTimeout(() => {
                        this.toastr.dismissToast(toast);
                    }, 2000);
                });
                this.ngxdp.clearDate();
            }
        }
    }
    onDateChanged(event: IMyDateModel): void {
        // alert('onDateChanged');
        this.enterdatests = false;
        this.model.Birthdate = event;
      //  console.log(this.model.Birthdate);
    }
    uploadbtn(cropedimage) {
        //  alert();
      //  console.log(cropedimage);
        if (cropedimage !== '') {
            this.imageshow = false;
            this.profileimage = cropedimage;
        }
    }
    logoimage(input: HTMLInputElement) {
        // alert('upload');
        this.imageupload = true;
        this.imageupload = input.checked;
        // if (this.imageupload === true) {
        //     this.imageupload1 = false;
        // }
    }
    /* get state names*/
    getStateNames(countryid) {
        if (countryid === undefined) {

        } else {
            return this._profileSettingsService.getstateNames(countryid)
                .subscribe(arg => {
                    this.stateNames = arg.data;
                  //  console.log(JSON.stringify((this.stateNames)));
                });
        }
    }
    /**
     * // getting profile information of client by using service
     */
    getProfile() {
        this._profileSettingsService.getProfile(this.patientData.Id).subscribe(
            res => {
                this.profileInfo = res.data;
                this.profileInfo.CountryId = 231;
                this.profileInfo.Country = 'United States';
              //  console.log('profile info' + (JSON.stringify(this.profileInfo)));
                this.profileimage = '';
                this.profileimage = this.profileInfo.ImageUrl + '?random+\=' + Math.random();
                this.ssnvaraible = this.profileInfo.SSN;
                if (this.ssnvaraible === null) {
                    this.ssnshow = true;
                } else {
                    this.ssnshow = false;
                }
                //  console.log(this.profileimage);
                if (this.profileimage === '') {

                    this.imageshow = true;
                } else {
                    this.imageshow = false;
                }
                if (this.profileInfo.DOB === '01/Jan/1900' || this.profileInfo.DOB === '01-Jan-1900' || this.profileInfo.DOB === ''
                 || this.profileInfo.DOB === null) {
                    this.profileInfo.DOB = '';
                    this.dobselect = false;
                } else {
                    this.dobselect = true;
                }
                this.getStateNames(this.profileInfo.CountryId);
                // if (this.profileInfo.DOB !== null) {
                //     this.dobselect = true;
                // }  else {
                //     this.dobselect = false;
                // }

            },


        );
    }
    getcountries() {
        this._profileSettingsService.getcountries().subscribe(
            res => {
                this.countries = res.data;
            });
    }
    /**
     * on click of edit to  change the view to edit mode
     */
    editProfile() {
        this.editClass = true;
    }
    /**
     *  // updating profile information of client by using service
     */
    Countryid(countryname) {

        for (let i = 0; i < this.countries.length - 1; i++) {
            if (this.countries[i].Name === countryname) {
                this.selectcountrysts = true;
                this.profileInfo.CountryId = this.countries[i].ID;
                this.getStateNames(this.profileInfo.CountryId);
            }
        }
    }
    Stateid(statename) {
        for (let i = 0; i < this.stateNames.length - 1; i++) {
            if (this.stateNames[i].Name === statename) {
                this.profileInfo.StateId = this.stateNames[i].ID;
            }
        }
    }
    ssnverify(ssnno) {
        if (ssnno.length === 9) {
            this.ssnno = {
                'SSN': ssnno
            };
            this._profileSettingsService.ssnverify(this.ssnno).subscribe(
                res => {
                    // console.log(res);
                    if (res.Success === false) {
                        this.ssnverified = false;
                        this.error = '';
                    } else {
                        this.error = 'SSN Number Already Exists';
                        this.ssnverified = true;
                    }
                });
        }
    }
    updateProfile() {
     //   console.log('update profile' + JSON.stringify(this.profileInfo));
       //  alert(this.model.Birthdate);
        if ((this.personalForm.dirty) && (this.personalForm.valid) && (this.phonests === false) && (this.emergencyphonests === false) ) {
            let date: Date;
            //  alert(this.model.Birthdate);
            if (this.model.Birthdate !== null && this.model.Birthdate !== '' && this.model.Birthdate !== undefined) {
                this.profileInfo.DOB = this.model.Birthdate.formatted;
            } else {
                this.profileInfo.DOB = '';
            }
            if (this.imageurl !== '') {
                // alert();
                this.profileInfo.ImageUrl = this.imageurl;
            }
            //             if (this.profileInfo.ImageUrl != '' && this.profileInfo.ImageUrl.toString().indexOf('http://') >= 0) {
            // alert();
            //                 this.profileInfo.ImageUrl = '';
            //             }
            // console.log(this.imageurl);
            date = new Date();
            const currentdate = this.datepipe.transform(date, 'MMM/dd/yyyy');
            this.profileInfo.Date = currentdate;
            this.profileInfo.ImageUrl = this.profileInfo.ImageUrl;
            // this.profileInfo.CountryId="";
            // this.profileInfo.StateId="";
          //  console.log('update profile' + JSON.stringify(this.profileInfo));
            this._profileSettingsService.updateProfile(this.profileInfo).subscribe(
                res => {
                 //   console.log((JSON.stringify(res)));
                    if (res.success) {
                        this.Success('Profile Updated Successfully');
                        this.getProfile();
                        this._personcomponent.getProfile();
                    } else {
                        this.errortoast(res.data);
                    }
                },
                err => console.log(err)
            );
            this.editClass = false;
        } else {
            this.validateAllFormFields(this.personalForm);
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
    getNHSNumberemergencyMask() {
        return {
            mask: ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
        };
    }
    unmasckphone() {
        this.phonests = false;
        if (this.profileInfo.PhoneNo !== '') {
         //   console.log('@@@' + this.profileInfo.PhoneNo);
            this.profileInfo.PhoneNo = this.unmask(this.profileInfo.PhoneNo);
         //   console.log(this.profileInfo.PhoneNo);
            if (this.profileInfo.PhoneNo.length !== 10) {
                this.phonests = true;
            } else {
                this.phonests = false;
            }
          //  console.log(this.phonests);
        }
    }
    handleKeyDown(e) {
        var target = e.target;``
    const  position = target.selectionStart; // Capture initial position
  target.value = target.value.replace(/\s/g, '');  // This triggers the cursor to move.
  target.selectionEnd = position;
}
    emergencymask() {
        this.emergencyphonests = false;
        if (this.profileInfo.AltPhoneNo !== '') {
        //    console.log('@@@' + this.profileInfo.AltPhoneNo);
            this.profileInfo.AltPhoneNo = this.unmask(this.profileInfo.AltPhoneNo);
         //   console.log(this.profileInfo.PhoneNo);
            if (this.profileInfo.AltPhoneNo.length !== 10) {
                this.emergencyphonests = true;
            } else {
                this.emergencyphonests = false;
            }
        //    console.log(this.phonests);
        }
    }
    validateAllFormFields(formGroup: FormGroup) {
        Object.keys(formGroup.controls).forEach(field => {
            const control = formGroup.get(field);
            if (control instanceof FormControl) {
                control.markAsTouched({ onlySelf: true });
            } else if (control instanceof FormGroup) {
                this.validateAllFormFields(control);
            }
        });
    }
    // image upload code start here
    fileChange(input) {
        this.file_srcs = [];
        var filePath = input.value;
        var allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
        if (!allowedExtensions.exec(filePath)) {
            // alert('Please upload file having extensions .jpeg/.jpg/.png/.gif only.');
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
                    this.imageurl = this.file_srcs[0].replace(this.file_srcs[0].substr(0, 23), '');
                 //   console.log(this.imageurl);
                    // Read the next file;
                    this.readFiles(files, index + 1);
                    this.onlyimageupload();
                });
            });
        } else {
            // When all files are done This forces a change detection
            this.changeDetectorRef.detectChanges();
        }
    }
    onlyimageupload() {
        // this.profileInfo.ImageUrl = this.profileInfo.ImageUrl;
     //   console.log(this.imageurl);
        if (this.imageurl !== '') {
            this.profileInfo.ImageUrl = this.imageurl;
        }
      //  console.log(JSON.stringify(this.profileInfo));
        this._profileSettingsService.updateProfile(this.profileInfo).subscribe(
            res => {
                // console.log((JSON.stringify(res)));
                if (res.success) {
                    this.Success('Profile Updated Successfully');
                    this.getProfile();
                    this._personcomponent.getProfile();
                } else {
                    this.errortoast(res.data);
                }
            },
            err => console.log(err)
        );
        this.editClass = false;
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
    Success(successmsg) {
        this.toastr.setRootViewContainerRef(this._rootViewContainerRef);
        // this._toast.ShowAlert(successmsg, '', 'Success');
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
                //   this.toasterService.clear(toast.toastId, toast.toastContainerId);
                // this.campaignModel = new CampaignModel();
                // this.getcampaigndata().add(() => {
                // });
            }, 3000);
        });
        this.getProfile();
    }
    errortoast(errormsg) {
        this.toastr.setRootViewContainerRef(this._rootViewContainerRef);
        this._toast.ShowAlert(errormsg, '', 'Error');
        this.disableButton = false;
    }
}

