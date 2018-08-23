import { ValidationComponent } from './../../../shared/validation/validation.component';
import { ValidationService } from './../../../shared/validation/validation.service';
import { ProvidersModel } from '../../../models/providers.model';
import { ProvidersService } from './providers.service';
import { Component, OnInit, ViewContainerRef, ChangeDetectorRef, ViewChild } from '@angular/core';
import { AsyncValidatorFn, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Toast } from 'ng2-toastr/src/toast';
import { DatePipe, AsyncPipe } from '@angular/common';
import { UnMaskedData } from '../../../shared/services/unmaskdata';
import { ModalDirective } from 'angular-bootstrap-md';
import { ProviderPipe } from './providerPipe';
import { OrderPipe } from 'ngx-order-pipe';
declare var jQuery: any;
@Component({
    moduleId: module.id,
    selector: 'app-providers',
    templateUrl: 'providers.component.html',
    styleUrls: ['providers.component.scss'],
    providers: [ProvidersService, DatePipe, OrderPipe]
})
export class ProvidersComponent implements OnInit {
    // to disable save button
    @ViewChild('pedit') public editmodal: ModalDirective;
    @ViewChild('addProvider') public addprovider: ModalDirective;
    disableButton: boolean;
    userFilter: string;
    profileimage: string;
    order: string ;
    reverse: boolean = false;
    page: number;
    errmsg: boolean;
    providerid: number;
    public mask: Array<string | RegExp>;
    success: boolean;
    public file_srcs: string[] = [];
    public debug_size_before: string[] = [];
    public debug_size_after: string[] = [];
    // <------Assigning ProvidersModel to variable----->
    model: ProvidersModel;
    // <----- to store the particular provider info----->
    editItems: any = {};
    // <---get call variable of ProviderItems---->
    data: any = [];
    // <--for current date-->
    providerForm: any;
    phonestssec: boolean;
    phonealtstssec: boolean;
    providerForm1: any;
    unmask = UnMaskedData;
    date: Date = new Date();
    adminData: any = {};
    // <---get call variable of ProvidersList------>
    providerData: any = [];
    constructor(private changeDetectorRef: ChangeDetectorRef, private _providerService: ProvidersService,
         private router: Router, private formBuilder: FormBuilder,
        public toastr: ToastsManager, vcr: ViewContainerRef, public datepipe: DatePipe, private orderPipe: OrderPipe) {
           
        this.model = new ProvidersModel();
        this.toastr.setRootViewContainerRef(vcr);
        this.disableButton = false;
        this.profileimage = '';
        this.phonestssec = false;
        this.phonealtstssec=false;
        this.page = 1;
        this.mask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
        this.adminData = JSON.parse(localStorage.getItem('loginData'));
        const fromdt = this.datepipe.transform(this.date, 'dd/MMM/yyyy');
        this.model.Date = fromdt + ' ' + this.date.getHours() + ':' +
            this.date.getMinutes() + ':' + this.date.getSeconds();
        this.providerForm = this.formBuilder.group({
            'ProviderName': ['', Validators.required, ValidationService.alphabeticsValidator],
            'ServiceTypeRefId': ['', Validators.required],
            'ProviderTypeRefId': ['', Validators.required],
            'Email': ['', Validators.required, ValidationService.emailValidator],
            'DesignationId': [''],
            'PhoneNo': ['', Validators.required],
            'AltPhoneNo': [''],
            'Description': ['',Validators.required],
            'Locationurl':  ['',Validators.required],
            'Address1':['',Validators.required]
        });
        this.providerForm1 = this.formBuilder.group({
            'ProviderName': ['', Validators.required, ValidationService.alphabeticsValidator],
            'ServiceTypeRefId': ['', Validators.required],
            'ProviderTypeRefId': ['', Validators.required],
            'Email': ['', Validators.required, ValidationService.emailValidator],
            'DesignationId': ['', Validators.required],
            'PhoneNo': ['', Validators.required],
            'AltPhoneNo': [''],
            'Description': ['',Validators.required],
            'Locationurl':  ['',Validators.required],
            'Address1':['',Validators.required]
        });
        // console.log( this.model.Date);
    }
    // <-------on page load data will loads------->
    ngOnInit() {
       // console.log('model  ' + JSON.stringify(this.model));
        this.GetProviderItems();
        this.GetProvidersList();
    }
    newStaff() {
        this.success = false;
        this.errmsg = false;
        this.file_srcs = [];
        this.profileimage = '';
    }

    fileChange(input) {
        // this.profileimage = '';
        this.file_srcs = [];
        this.model.ImageUrl = '';
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
                    // this.profileimage = this.file_srcs[0];
                    this.model.ImageUrl = this.file_srcs[0].replace(this.file_srcs[0].substr(0, 23), '');
                    //  console.log(this.model.ImageUrl);
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
    // <-----to get all  GetProviderItems------>
    GetProviderItems() {
        this._providerService.GetProviderItems().subscribe(
            Data => {
              //  console.log('dropdown information' + (JSON.stringify(this.data = Data.data)));
                this.data = Data.data;  
                this.providerid = 1;
            }
        );
    }
    // <-----on get call all GetProvidersList------>
    GetProvidersList() {
        this.disableButton = false;
        return this._providerService.GetProvidersList().subscribe(
            res => {
               // console.log('provider information' + (JSON.stringify(this.providerData = res.data) ));
                this.providerData = res.data;
                for (let i = 0 ; i < this.providerData.length ; i++) {
                    this.providerData[i].ImageUrl += '?random+\=' + Math.random();
                    // this.providerData[i].ImageUrl = this.providerData[i].ImageUrl += '?random+\=' + Math.random();
                }
                this.order = 'ProviderName';
             //   console.log(this.orderPipe.transform(this.providerData, this.order));
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
    // <-----on click of edit particular provider record will come ------>
    edit(value) {
        console.log(value);
        this.editItems = {};
        this.file_srcs = [];
        this.profileimage = '';
        this.editItems = value;
         this.phonestssec = false ;
         this.phonealtstssec = false;
       // console.log(value.ImageUrl);
        // console.log(value);
 
        if (value.ImageUrl === '' || value.ImageUrl == null) {
            // alert();
        } else {
            // this.profileimage = 'data:image/jpeg;base64,' + value.ImageUrl;
            this.profileimage =  value.ImageUrl ;
        }
    this.success = false;
    this.errmsg = false;
        // alert(JSON.stringify(this.editItems));
        // this.editItems.IsActive = true;
        // this.editItems.Date = new Date();
        // this.editItems.UserName = 'usha';
//this.editmodal.show();
        // console.log('editstaff' + JSON.stringify(this.editItems));
    }
    // <-----posting the provider information ------>
    postProviderInfo(model) {
        if (this.providerForm.dirty && this.providerForm.valid && this.phonestssec == false &&
            this.phonealtstssec == false) {
        this.model.DesignationId = 1;
   //     console.log("testers a  "+JSON.stringify(this.model));
       // alert(JSON.stringify(this.model));
        this._providerService.postProviderInfo(this.model).subscribe(
            res => {
                this.disableButton = true;
            //    console.log((JSON.stringify(res)));
                // this conditions are used for hiding and unhiding forms
                if (res.Success) {
                    this.Success('Provider added successfully', 'add');
                } else {
                    this.error(res.data, 'add');
                }
            });
        // this.model.ProviderName = '',
        // this.model.Email = '',
        // this.model.DesignationId = '',
        // this.model.ServiceTypeRefId = '',
        // this.model.ProviderTypeRefId = '',
        // this.model.PhoneNo = null,
        // this.model.AltPhoneNo = null;
    }
}
    // <-----edit and post the provider information ------>
    editPost(editItems) {
        if ((this.providerForm1.dirty && this.providerForm1.valid && this.phonestssec == false &&
            this.phonealtstssec == false) || (this.model.ImageUrl !== '')) {
        // this.editItems.DesignationId = editItems.DesignationId;
        this.editItems.Date = this.model.Date;
     //   console.log('Date' + this.editItems.Date);
        this.editItems.UserName = this.adminData.FirstName + this.adminData.LastName;
    if (this.model.ImageUrl != '' || this.model.ImageUrl != null ) {
        this.editItems.ImageUrl = this.model.ImageUrl;
    } else  if (this.editItems.ImageUrl != '' && this.editItems.ImageUrl != null && 
          ((this.editItems.ImageUrl.toString().indexOf('http://') >= 0)
        || (this.editItems.ImageUrl.toString().indexOf('https://') >= 0) || 
        (this.editItems.ImageUrl.toString().includes('?random'))||
        (this.editItems.ImageUrl.toString().includes('http://') ||
            this.editItems.ImageUrl.toString().includes('https://'))) ){
                    this.editItems.ImageUrl = '';

               // }
        } else {
            this.editItems.ImageUrl = this.model.ImageUrl;
        }
     //   console.log(JSON.stringify(editItems));

        this._providerService.postProviderInfo(editItems).subscribe(
            res => {
                this.disableButton = true;
             //   console.log((JSON.stringify(res)));
                // this conditions are used for hiding and unhiding forms
                if (res.Success) {
                    this.Success('Provider updated successfully', 'edit');
                } else {
                    this.error(res.data, 'edit');
                }

            });
    }
}
    /**
     * to set the provider information in local storage
     * @param providerData
     */
    getProviderData(providerData) {
      //  console.log(JSON.stringify(providerData));
        localStorage.setItem('providerData', JSON.stringify(providerData));
    }
    // cancel for reload GetProvidersList
    cancel() {
        this.GetProvidersList();
    }
    toClear() {
        this.model = new ProvidersModel();
        this.file_srcs = [];
        this.profileimage = '';
        this.phonestssec = false;
        this.phonealtstssec = false;
    }
    /** Add,Edit,delete Referral methods end */
    /** Toast messages for success and failure */
    Success(successmsg, type) {
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
                if (type === 'add') {
                    // jQuery('#addProvider').modal('hide');
                    this.addprovider.hide();
                }
                if (type === 'edit') {
                    // jQuery('#myModal1').modal('hide');
                    this.editmodal.hide();
                }

                this.GetProvidersList().add(() => {
                    this.model = new ProvidersModel();
                });
            }, 2000);
        });
    }
    error(errormsg, type) {
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
                //     jQuery('#addProvider').modal('hide');
                // }
                // if (type === 'edit') {
                //      jQuery('#myModal1').modal('hide');
                // }
                this.GetProvidersList().add(() => {
                    this.model = new ProvidersModel();
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
        if(type==='addphno'){
        if (this.model.PhoneNo !== '') {
           //  console.log('@@@' + this.model.PhoneNo);
            this.model.PhoneNo= this.unmask(this.model.PhoneNo);
         //   console.log(this.model.PhoneNo);
            if (this.model.PhoneNo.length !== 10) {
                this.phonestssec = true;
            } else {
                this.phonestssec = false;
            }
          //  console.log(this.phonestssec);
        }
    } else if(type==='editphno'){
        
        if (this.editItems.PhoneNo !== '') {
           
          //  console.log('@@@' + this.editItems.PhoneNo);
           this.editItems.PhoneNo= this.unmask(this.editItems.PhoneNo);
         //  console.log(this.editItems.PhoneNo);
           if (this.editItems.PhoneNo.length !== 10) {
               this.phonestssec = true;
           } else {
               this.phonestssec = false;
           }
        //   console.log(this.phonestssec);
       }
    }
    }
    unmasckaltphone(type){
        this.phonealtstssec = false;
        if(type==='addaltphno'){
        if (this.model.AltPhoneNo !== '') {
         //    console.log('@@@' + this.model.AltPhoneNo);
            this.model.AltPhoneNo= this.unmask(this.model.AltPhoneNo);
         //   console.log(this.model.AltPhoneNo);
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


