import { Component, OnInit, ChangeDetectorRef, ViewContainerRef } from '@angular/core';
import { AdminSettingsService } from '../admin-settings.service';
import { Toast, ToastsManager } from 'ng2-toastr';
declare var jQuery: any;
import { AsyncValidatorFn, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ValidationService } from '../../../../shared/validation/validation.service';
import { SliderModel, TenantResponse } from '../../../../models/tenant.model';

@Component({
    selector: 'app-slider-settings',
    templateUrl: './slider-settings.component.html',
    styleUrls: ['./slider-settings.component.scss'],
    providers: [AdminSettingsService, ToastsManager]
})
export class SliderSettingsComponent implements OnInit {
    private _rootViewContainerRef: ViewContainerRef;
    slidermodel: SliderModel;
    sliderinfo = [];
    public file_srcs: string[] = [];
    public debug_size_before: string[] = [];
    public debug_size_after: string[] = [];
    guid: string;
    sliderForm: any;
    orderslider = [];
    image: string;
    errmsg: string;
    addslide: boolean;
    tenantData: TenantResponse;
    responsedata: string;
    constructor(private _adminsettingservice: AdminSettingsService, private changeDetectorRef: ChangeDetectorRef,
        public toastr: ToastsManager, vRef: ViewContainerRef, private formBuilder: FormBuilder) {
        this.slidermodel = new SliderModel();

        this.addslide = true;
        // this.toastr.setRootViewContainerRef(vcr);
        this.tenantData = new TenantResponse();
        this.sliderForm = this.formBuilder.group({
            'slideName': ['', Validators.required],
            'sliderImage': [''],
            'SliderDescription': ['', Validators.required],
            'SliderOrderno': ['', Validators.required]
        });
        this.orderslider = [{ 'orderno': '1', 'ISselected': false },
        { 'orderno': '2', 'ISselected': false },
        { 'orderno': '3', 'ISselected': false },
        { 'orderno': '4', 'ISselected': false },
        { 'orderno': '5', 'ISselected': false },
        { 'orderno': '6', 'ISselected': false },
        { 'orderno': '7', 'ISselected': false },
        { 'orderno': '8', 'ISselected': false },
        { 'orderno': '9', 'ISselected': false },
        { 'orderno': '10', 'ISselected': false }];
        // { 'orderno': '11', 'ISselected': false }];
        setTimeout(() => {
            const tenantData = localStorage.getItem('TenantData');
            if (tenantData != null) {
                this.tenantData = JSON.parse(tenantData) as TenantResponse;
             //   console.log(this.tenantData);
            }
        }, 3000);
        this.responsedata = '';
        this._rootViewContainerRef = vRef;
        this.guid = '';
    }

    ngOnInit() {
        this.toastr.setRootViewContainerRef(this._rootViewContainerRef);
        this.GetsliderInfo();
    }
    fileChange(input) {
        // alert();
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
                    this.image = this.file_srcs[0].replace(this.file_srcs[0].substr(0, 23), '');
                    this.errmsg = '';
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
           // console.log('img loaded');
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

    clear() {
        this.slidermodel = new SliderModel();
    }
    SliderPostInfo() {

        if (this.image === '') {
            this.errmsg = 'Image is required';
        }
        //   alert(this.image);
        if (this.sliderForm.valid) {
            if (this.guid === '') {
                this.slidermodel.Id = JSON.stringify(0);
            } else {
                this.slidermodel.Id = this.guid;
            }

            this.slidermodel.Image = this.image;
            // for (let i = 0; i <= this.sliderinfo.length - 1; i++) {
            //     if (this.sliderinfo[i].OrderNo == this.slidermodel.OrderNo) {
            //         this.slidermodel.Id = this.sliderinfo[i].Id;
            //     }
            // }
          //  console.log(JSON.stringify(this.slidermodel));
            this._adminsettingservice.postsliderdata(this.slidermodel).subscribe(
                res => {
                    if (res.success = true) {
                     //   console.log(res);
                        this.responsedata = res.data;
                        // this.tenantData.SliderSettings = res.data.SliderSettings;
                        // localStorage.removeItem('TenantData');
                        //  localStorage.setItem('TenantData', JSON.stringify(this.tenantData));
                        this.Success('slider added successfully');
                        this.guid = '';
                        // jQuery('#addslides').modal('hide');
                    } else {
                        this.Error(res.data, '');
                    }

                });
            //   this.GetsliderInfo();
            // this.GetsliderInfo().add(() => { });
            // this.slidermodel = new SliderModel();
            // this.file_srcs[0] = '';
        } else {
            this.validateAllFormFields(this.sliderForm);
        }
    }
    editslides(data) {

        this.file_srcs = [];
        this.slidermodel = data;
      //  console.log(data);
        this.guid = data.Id;
        this.addslide = false;

    }
    GetsliderInfo() {
        return this._adminsettingservice.getsliderdata().subscribe(
            res => {

                this.sliderinfo = res.data;
                for (let i = 0; i <= this.sliderinfo.length - 1; i++) {
                    this.sliderinfo[i].Image += '?random+\=' + Math.random();
                }
                if (this.responsedata !== '') {
                    this.tenantData.SliderSettings = res.data;
                    localStorage.setItem('TenantData', JSON.stringify(this.tenantData));
                    this.responsedata = '';
                }
            //    console.log('slider data' + JSON.stringify(this.sliderinfo));
            }

        );
    }
    toclear() {
        this.addslide = true;
        this.slidermodel = new SliderModel();
        this.image = '';
        this.file_srcs = [];
    }
    selectorder(orderno) {
     //   console.log(orderno);
    }

    Success(successmsg) {
        //  alert(successmsg)
        this.toastr.setRootViewContainerRef(this._rootViewContainerRef);
        this.toastr.success(successmsg, null, {
            dismiss: 'controlled', showCloseButton: true,
            positionClass: 'toast-bottom-right', newestOnTop: true, progressBar: false,
            showEasing: 'swing', closeButton: false, 'preventDuplicates': false,
            'debug': false, 'hideEasing': 'linear',
            'showMethod': 'fadeIn',
            'hideMethod': 'fadeOut'
        }).then((toast: Toast) => {
            // this.slidermodel.Image = '';
            this.slidermodel = new SliderModel();
            this.file_srcs[0] = '';
            this.sliderinfo = [];
            this.GetsliderInfo().add(() => { });
            setTimeout(() => {
                this.toastr.dismissToast(toast);
            }, 5000);
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

            }, 2000);
        });
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
}
