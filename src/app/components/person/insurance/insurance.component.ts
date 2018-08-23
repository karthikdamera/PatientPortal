import { InsuranceService } from './insurance.service';
import { ValidationComponent } from './../../../shared/validation/validation.component';
import { ValidationService } from './../../../shared/validation/validation.service';
import { InsuranceModel } from './../../../models/person-slot.model';
import { Component, OnInit, ViewContainerRef, ChangeDetectorRef, ViewChild } from '@angular/core';
import { AsyncValidatorFn, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Toast } from 'ng2-toastr/src/toast';
import { DatePipe, AsyncPipe } from '@angular/common';
import { DateFormat } from '../../../shared/services/dateFormat';
import { ModalDirective } from 'angular-bootstrap-md';
import { ToastService } from '../../../shared/services/toastService';
import { PersonComponent } from '../person.component';
declare var jQuery: any;

@Component({
  moduleId: module.id,
  selector: 'app-insurance',
  templateUrl: './insurance.component.html',
  styleUrls: ['./insurance.component.scss'],
  providers: [DatePipe, InsuranceService, ToastService]
})
export class InsuranceComponent implements OnInit {
  disableButton: boolean;
  @ViewChild('addInsurance') public addInsurance: ModalDirective;
  @ViewChild('edit') public edit: ModalDirective;
    @ViewChild('input') pfront: any;
    @ViewChild('input1') pback: any;
    @ViewChild('input2') img1: any;
    @ViewChild('input3') img2: any;
    insuranceForm: any;
    insuranceForm1: any;
    windowWidth: number;
    type: string;
    public file_srcs: string[] = [];
    public file_srcs1: string[] = [];
    public file_srcs2: string[] = [];
    public file_srcs3: string[] = [];
    public debug_size_before: string[] = [];
    public debug_size_after: string[] = [];
    insuranceModel: InsuranceModel;
    insuranceData: any = [];
    patientData: any = {};
    date: Date = new Date();
    model: any = { 'instype': '' };
    types = ['Primary', 'Secondary'];
    eobmsg: string = '';
    showvalid:boolean;
    insuranceNames: any = [];
    public copay: any;
    public CoInsurance: any;
    public Deductible: any;
    public OutOfPocket: any;
    public UnmetRemaining: any;
    dateFormatPipeFilter: DateFormat;
    errmsg: string = '';
    eobmessagesucess = false;
    constructor(private router: Router, private formBuilder: FormBuilder, private _insuranceService: InsuranceService,
        public toastr: ToastsManager,private toast: ToastService, vcr: ViewContainerRef, public datepipe: DatePipe,
         private changeDetectorRef: ChangeDetectorRef,  private _personcomponent: PersonComponent) {
        this.patientData = JSON.parse(localStorage.getItem('loginData'));
        this.insuranceModel = new InsuranceModel();
        this.dateFormatPipeFilter = new DateFormat();
        this.toastr.setRootViewContainerRef(vcr);
        this.disableButton = false;
        this.showvalid=true;
        this.insuranceForm = this.formBuilder.group({
            'InsuranceName': ['', Validators.required],
            'InsuranceId': ['', Validators.required],
            // 'cam': ['', Validators.required]
        });
        this.insuranceForm1 = this.formBuilder.group({
            'InsuranceName': ['', Validators.required],
            'InsuranceId': ['', Validators.required],
            // 'scam': ['', Validators.required]
        });
        this._personcomponent.Popupopenclose('close');
    }
    ngOnInit() {
        // throw new Error("Method not implemented.");
        this.getInranceInfo();
        this.getInsuranceNames();
    }
    changeInsurance(value) {
       // alert(value)
        this.model.instype = value;
        this.insuranceModel = new InsuranceModel();
        this.insuranceModel.Insurancevalid = value;
    }
    /**
     * 
     * image upload code start
     */
    // This is called when the user selects new files from the upload button
    fileChange(input, type1) {
      
        this.type = type1;
        var filePath = input.value;
       // console.log(input.value);
        var allowedExtensions = /(\.jpg|\.jpeg|\.png|\.gif)$/i;
        if (!allowedExtensions.exec(filePath)) {
         //  alert('Please upload file having extensions .jpeg/.jpg/.png/.gif only.');
            input.value = '';
            return false;
        } else {
            this.readFiles(input.files);
        }

    }
    showrequired(){
        this.showvalid=false;
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
                    if (this.type === 'front') {
                        this.file_srcs.pop();
                        this.file_srcs.push(resized_jpeg);

                    }
                    if (this.type === 'back') {
                        this.file_srcs1.pop();
                        this.file_srcs1.push(resized_jpeg);
                        // this.loadfrontandbackimg = true;


                    }
                    if (this.type === 'sfront') {
                        this.file_srcs2.pop();
                        this.file_srcs2.push(resized_jpeg);
                    }
                    if (this.type === 'sback') {
                        this.file_srcs3.pop();
                        this.file_srcs3.push(resized_jpeg);
                        // this.loadfrontandbackimg=true;
                        ///  this.secondaryloadfrontandbackimg = true;

                    }
                    // Read the next file;
                    this.readFiles(files, index + 1);
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
    // image upload code end
    getInranceInfo() {
        return this._insuranceService.getInranceInfo(this.patientData.Id).subscribe(
            res => {
           //     console.log('insurance data' + (JSON.stringify(this.insuranceData = res.data)));
                this.insuranceData = res.data;
                this.disableButton = false;
            }
        );
    }
    getInsuranceNames() {
        return this._insuranceService.getinsNames()
            .subscribe(arg => {
                this.insuranceNames = arg;
               // console.log(JSON.stringify((this.insuranceNames)));
            });

    }

    addPrimaryInsurance() {
       // alert(this.insuranceModel.InsuranceId!=="");
           if(this.insuranceModel.InsuranceId!==""){   
          //  alert('in');   
            this.insuranceModel.CoverageType = 'Primary';
            if(this.file_srcs[0]!=undefined && this.file_srcs1[0]!=undefined){
            this.insuranceModel.FrontOnCard = this.file_srcs[0].replace(this.file_srcs[0].substr(0, 23), '');
            this.insuranceModel.BackOnCard = this.file_srcs1[0].replace(this.file_srcs1[0].substr(0, 23), '');
            }
            const fromdt = this.datepipe.transform(this.date, 'dd/MMM/yyyy');
        this.insuranceModel.CreatedOn = fromdt + ' ' + this.date.getHours() +
            ':' + this.date.getMinutes() + ':' + this.date.getSeconds();
        this.insuranceModel.CreatedBy = this.patientData.Id;
        this.insuranceModel.IsActive = true;
        this.insuranceModel.ModifiedOn = fromdt + ' ' + this.date.getHours() +
            ':' + this.date.getMinutes() + ':' + this.date.getSeconds();
        this.insuranceModel.PersonId = this.patientData.Id;
        this.insuranceModel.ModifiedBy = this.patientData.Id;
        if ((this.insuranceModel.FrontOnCard === undefined || this.insuranceModel.BackOnCard === undefined) ||
            (this.insuranceModel.FrontOnCard === '' || this.insuranceModel.BackOnCard === '')) {
            this.error('Please upload Front & back of cards');
        }
        else {
         //   console.log(JSON.stringify(this.insuranceModel.InsuranceName));
            this._insuranceService.addInsurance(this.insuranceModel).subscribe (
                res => {
                 //   console.log(res);
                    if (res.Success) {
                        this.success('Primary insurance added');
                        this._personcomponent.Popupopenclose('close');
                        this.model.instype="";

                        // alert(res.Success);
                        // this.eobmessagesucess = true;
                        // jQuery('#myModelresult').modal('show');
                        // 'YOUR EOB IS VERIFIED'
                    } else {
                        this.error(res.data);
                    }
                },
                err => this.error(err)
            );
        }
    } else{
        this.error("Please enter all required fields");
    }
        // }
    }
    addSecondaryInsurance() {
       // alert(this.insuranceModel.InsuranceName +","+this.insuranceModel.InsuranceId!=="");
        // if (this.insuranceForm.dirty && this.insuranceForm.valid) {
        // alert();
        // if (this.model.scam === 'suploader') {
            if(this.insuranceModel.InsuranceName!==""&&this.insuranceModel.InsuranceId!==""){
               // alert('in'); 
            this.insuranceModel.CoverageType = 'Secondary';
            if(this.file_srcs2[0]!=undefined && this.file_srcs3[0]!=undefined) {
            this.insuranceModel.FrontOnCard = this.file_srcs2[0].replace(this.file_srcs2[0].substr(0, 23), '');
            this.insuranceModel.BackOnCard = this.file_srcs3[0].replace(this.file_srcs3[0].substr(0, 23), '');
        // }
    }
        // if (this.model.scam === 'scamera') {
        //     this.insuranceModel.CoverageType = 'Secondary';
        //     // this.insuranceModel.FrontOnCard = this.base64SecondaryFrontImg;
        //     // this.insuranceModel.BackOnCard = this.base64SecondaryBackImg;
        // }
        const fromdt = this.datepipe.transform(this.date, 'dd/MMM/yyyy');
        this.insuranceModel.CreatedOn = fromdt + ' ' + this.date.getHours() + ':' +
            this.date.getMinutes() + ':' + this.date.getSeconds();
        this.insuranceModel.CreatedBy = this.patientData.Id;
        this.insuranceModel.IsActive = true;
        this.insuranceModel.ModifiedOn = fromdt + ' ' + this.date.getHours() +
            ':' + this.date.getMinutes() + ':' + this.date.getSeconds();
        this.insuranceModel.PersonId = this.patientData.Id;
        this.insuranceModel.ModifiedBy = this.patientData.Id;
        if ((this.insuranceModel.FrontOnCard === undefined || this.insuranceModel.BackOnCard === undefined) ||
            (this.insuranceModel.FrontOnCard === '' || this.insuranceModel.BackOnCard === '')) {
            this.error('Please upload Front & back of cards');
        }
        else {
            this._insuranceService.addInsurance(this.insuranceModel).subscribe(
                res => {
                    if (res.Success) {
                        this.success('Secondary insurance added');
                        this._personcomponent.Popupopenclose('close');
                      //  this.eobmessagesucess = true;
                      //  jQuery('#myModelresult').modal('show');
                        // 'YOUR EOB IS VERIFIED'
                    } else {
                        this.error(res.data);
                    }
                },
                err => this.error(err)
            );
        }
    }
    else{
        this.error("Please enter all required fields");
    }
        // }
    }
    makeInsuranceActive(id, status, coverageType) {
      //  console.log(id, status);
        const Isactivestatus = { 'Id': id, 'PersonId': this.patientData.Id, 'IsActive': status , CoverageType: coverageType };
        this._insuranceService.updateInsuranceActive(Isactivestatus).subscribe(
            res => {
                if (res.Success) {
                    if (status) {
                        this.success('Your insurance card  is Activated');
                    } else {
                        this.success('Your insurance card  is Deactivated');
                    }
                } else {
                    this.error(res.data);
                }
            },
            err => err
        );
    }
    /**
     * EOB check for primary and secondary
     */

    eobCheckForPrimarySecondary() {
       // alert(name+","+id);    
        this.disableButton = true;
        this.insuranceModel.PersonId = this.patientData.Id;
        if (this.model.instype === 'Primary') {
           // alert('eob');
            this.addPrimaryInsurance();
        } else {
            // alert();
            this.addSecondaryInsurance();
        }
        // console.log(this.insuranceModel.InsuranceName);
        // let providerid: number;
        // for (let i = 0; i < this.insuranceNames.length; i++) {
        //     if (this.insuranceModel.InsuranceName === this.insuranceNames[i].payername) {
        //         providerid = this.insuranceNames[i].payerid;
        //     }
        // }
        // console.log(providerid);
        // if ((this.insuranceModel.InsuranceName === 'Cigna') ||
        //     (this.insuranceModel.InsuranceName === 'Health Net') || (this.insuranceModel.InsuranceName === 'Medicare')
        //     || (this.insuranceModel.InsuranceName === 'Aetna')
        //     || (this.insuranceModel.InsuranceName === 'United Health/Optum') || (this.insuranceModel.InsuranceName === 'Humana')
        //      || (this.insuranceModel.InsuranceName === 'Anthem Blue Cross')
        //     || (this.insuranceModel.InsuranceName === 'Blue Shield') || (this.insuranceModel.InsuranceName === 'Blue Shield of CA')) {
        //     const eob = {
        //         'PayerId': providerid,
        //         'ProviderLastName': 'Doe',
        //         'ProviderFirstName': 'John',
        //         'ProviderNpi': '1649226234',
        //         'MemberId': this.insuranceModel.InsuranceId,
        //         'MemberFirstName': this.patientData.FirstName,
        //         'MemberLastName': this.patientData.LastName,
        //         'MemberDob':'',
        //         'ServiceType': '30',
        //         'IsPatientSameAsSubscriber': 'false'
        //     };
        //     if(this.patientData.dob!=""&&this.patientData.dob!=null){
        //        eob.MemberDob= this.dateFormatPipeFilter.transform(this.patientData.DOB)
        //     }
        //     this._insuranceService.eligibleservice(eob).subscribe(
        //         res => {
        //             console.log('eobeligible' + JSON.stringify(res.json()));
        //             console.log('sts' + res.json().Status);

        //             this.errmsg = res.json().Message;
        //             if (res.json().Status) {
        //                 console.log('eligible primary eobmessage true');
        //                 this.copay = res.json().Data.CoPayment;
        //                 this.CoInsurance = res.json().Data.CoInsurance;
        //                 this.Deductible = res.json().Data.Deductible;
        //                 this.OutOfPocket = res.json().Data.OutOfPocket;
        //                 this.UnmetRemaining = res.json().Data.UnmetRemaining;
        //                 this.eobmsg = this.model.instype + ' ' + 'EOB :' + this.errmsg;
        //                 console.log('eobanthem' + this.model.instype + JSON.stringify(this.copay));
        //                 // this.addPrimaryInsurance();
        //                 // add insurance insert service in database
        //                 if (this.model.instype === 'Primary') {
        //                     this.addPrimaryInsurance();
        //                 } else {
        //                     // alert();
        //                     this.addSecondaryInsurance();
        //                 }

        //             } else {
        //                 this.error(this.errmsg);
        //             }
        //         },

        //         err => err
        //     );
        // }// close if eligible
        // }
    }
    close() {
        this.success('YOUR EOB IS VERIFIED');
        jQuery('#myModelresult').modal('hide');
    }
   
    /** Toast messages for success and failure */
    success(successmsg) {
        this.toast.ShowAlert(successmsg, '', 'Success');
         this.addInsurance.hide();
         this.getInranceInfo().add(() => {
        });
    }
    error(errormsg) {    
        this.toast.ShowAlert(errormsg, '', 'Error');
                // this.getInranceInfo().add(() => {
                // });
    }
    toClear(status) {
        this.insuranceModel = new InsuranceModel();
        this.file_srcs = [];
        this.file_srcs1 = [];
        this.file_srcs2 = [];
        this.file_srcs3 = [];
        this.model.instype="";
       this.insuranceModel.Insurancevalid = '';
        if (this.model.instype === 'Primary' && this.pfront!== undefined ) {
            this.model.cam = '';
        this.pfront.nativeElement.value = '';
        this.pback.nativeElement.value = '';
        } else if (this.model.instype === 'Secondary' && this.img1 !== undefined) {
        this.model.scam = '';
        this.img1.nativeElement.value = '';
        this.img2.nativeElement.value = '';
        }
        // tslint:disable-next-line:radix
        this.windowWidth = parseInt( localStorage.getItem('windowWidth'));
     if (this.windowWidth < 1270) {
        if (status === 'open') {
        this._personcomponent.Popupopenclose('open');
        } else {
            this._personcomponent.Popupopenclose('close');
        }
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

}
