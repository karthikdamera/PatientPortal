import { Component, OnInit, ViewContainerRef, HostListener } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { InsuranceService } from '../../person/insurance/insurance.service';
import { PharmacyService } from '../../person/pharmacy/pharmacy.service';
import { ReferalService } from '../../person/referal/referal.service';
import { SubscriberService } from '../../person/subscriber/subscriber.service';
//import { CreditCardService } from '../../person/creditcard/creditcard.service';
//import { PatientDetailsService } from './patient-detailsService.service';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Toast } from 'ng2-toastr/src/toast';
import { PatientCard, Person } from '../../../models/PatientCard.model';
import { AsyncValidatorFn, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
// import { InterventionsComponent } from '../interventions/interventions.component';

//import { AddInterventionsComponent } from '../interventions/add-interventions/add-interventions.component';
import { AdminAssessmentsComponent } from '../admin-assessments/admin-assessments.component';
import { PharmacyModel, RefferalModel, PersonalInfo } from '../../../models/person-slot.model';
import { DatePipe, AsyncPipe } from '@angular/common';
import { ValidationService } from './../../../shared/validation/validation.service';
import { Subject } from 'rxjs/Subject';
import { ProfileSettingsService } from '../../person/profile-settings/profile-settings.service';
// import { UnMaskedData } from '../../person/scheduler/unmaskdata';

import { PatientDetailsService } from './patient-details.service';
import { CreditCardService } from '../../person/payment/payment.service';
import { UnMaskedData } from '../../../shared/services/unmaskdata';
import { ActivatedRoute } from '@angular/router';


@Component({
    moduleId: module.id,
    selector: 'app-patient-details',
    templateUrl: './patient-details.component.html',
    styleUrls: ['./patient-details.component.scss'],
    providers: [InsuranceService, PharmacyService, SubscriberService, CreditCardService,
        PatientDetailsService, DatePipe, ReferalService, ProfileSettingsService , ToastsManager]
})
export class PatientDetailsComponent implements OnInit {
    private _rootViewContainerRef: ViewContainerRef;
    date: Date = new Date();
    public base64;
    items: any = [];
    public filteredList = [];
    public selected = [];
    public query = '';
    public mask: Array<string | RegExp>;

    patientcarddata: PatientCard;
    pharmacyForm: FormGroup;
    userForm: FormGroup;
    parentData: Subject<number> = new Subject();
    // persondata: Person;
    // patientData = {
    //     Id: 0
    // };
    phrmamodel: PharmacyModel;
    refferalModel: RefferalModel;
    profileimage: string;
    patientid: number;
    pharmacyData: any = [];
    data: any = [];
    creditcardData: any = [];
    dataCheck: boolean;
    name: string;
    email: string = '';
    phonestssec: boolean;
    phonealtstssec: boolean;
    unmask = UnMaskedData;
    inteventionsts: boolean;
    addinteventionsts: boolean;
    adminassessmetssts: boolean;
    patientmedications: boolean;
    allcustomassessmentssts: boolean;
    individualchartsts: boolean;
    overallchartsts: boolean;
    assessmentId: any;
    addmedications: boolean;
    SurveyId: any;
    activities: boolean;
    addactivities: boolean;
    medicationview: boolean;
    patientbreath: boolean;
    patientaddbreath: boolean;
    editsts: boolean;
    patientData: any;
    disableedit: boolean;
    pharmaId: number;
    userForm1: any;
    pharmacyForm1: any;
    profileInfo: PersonalInfo;
    profilests: boolean;
    pharmacydrop: any = [];
    ReferralForm: FormGroup;
    stateNames: any = [];
    isVippatient: String;
    // model: any  = {'email': 'anu'};
    public age: number;
    expanded: string;
    /**
    * Each item will have title,content,complete flag and icon
    * which will be displayed on the side. Icon is in html
    */
    public timelineData: Array<Object> = [
        {
            title: "Step 1",
            icon: '<i class="fa fa-home"></i>',
            content: "Hello World",
            complete: true
        },
        {
            title: "Step 2",
            icon: '<i class="fa fa-home"></i>',
            content: "Following step to complete",
            complete: false
        }
    ];
    isOpen: boolean = false;
    constructor(private insuranceService: InsuranceService,
        private pharmacyReferralService: PharmacyService,
        private _referalService: ReferalService,
        private subscriberService: SubscriberService,
        private _creditCardService: CreditCardService,
        private patientdetailsservice: PatientDetailsService,
        public toastr: ToastsManager,vRef: ViewContainerRef,
        public sanitizer: DomSanitizer,
        public datepipe: DatePipe,
        private formBuilder: FormBuilder,
        private _profileSettingsService: ProfileSettingsService, private activatedRoute: ActivatedRoute) {
      //  this.toastr.setRootViewContainerRef(vcr);
      this._rootViewContainerRef = vRef;
        this.phrmamodel = new PharmacyModel();
        this.refferalModel = new RefferalModel();
        this.profileimage = '';
        this.patientcarddata = new PatientCard();
        this.inteventionsts = true;
        this.addinteventionsts = false;
        this.adminassessmetssts = true;
        this.allcustomassessmentssts = false;
        this.individualchartsts = false;
        this.patientid = 0;
        this.phonestssec = false;
        this.mask = ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
        this.phonealtstssec = false;
        this.overallchartsts = false;
        this.patientmedications = true;
        this.addmedications = false;
        this.activities = true;
        this.addactivities = false;
        this.medicationview = false;
        this.dataCheck = false;
        this.patientbreath = true;
        this.patientaddbreath = false;
        this.editsts = false;
        this.disableedit = true;
        this.profilests = false;
        this.isVippatient = 'No';
        this.profileInfo = new PersonalInfo();
        this.patientData = JSON.parse(localStorage.getItem('loginData'));
        this.base64 = this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpeg;base64,');
        // this.email = 'anu';
        this.pharmacyForm = this.formBuilder.group({
            'PreferredPharmacy': ['', Validators.required],
            'PharmacyPhoneNumber': ['', Validators.required],
            'PharmacyAddress1': ['', Validators.required],
            'PharmacyAddress2': ['', Validators.required],
            'State': ['', Validators.required],
            'ZipCode': ['', [Validators.required, Validators.minLength(5), Validators.maxLength(5)],
                ValidationService.numericalsValidatorFromone]
        });
        this.pharmacyForm1 = this.formBuilder.group({
            'PreferredPharmacy': ['', Validators.required],
            'PharmacyPhoneNumber': ['', Validators.required],
            'PharmacyAddress1': ['', Validators.required],
            'PharmacyAddress2': ['', Validators.required],
            'State': ['', Validators.required],
            'ZipCode': ['', [Validators.required, Validators.minLength(5), Validators.maxLength(5)],
                ValidationService.numericalsValidatorFromone]
        });
        this.userForm = this.formBuilder.group({
            'FirstName': ['', Validators.required, ValidationService.alphabeticsValidator],
            'LastName': ['', Validators.required, ValidationService.alphabeticsValidator],
            'Email': ['', Validators.required, ValidationService.emailValidator],
            'PhoneNo': ['', Validators.required],
            'Address': ['', Validators.required],
            'Address2': [''],
            'Zipcode': ['', [Validators.required, Validators.minLength(5), Validators.maxLength(5)],
                ValidationService.numericalsValidatorFromone],
            'AltPhoneNo': [''],
            'Gender': [''],
            'state': ['', Validators.required],
            'city': [''],
            'vippatient': ['']
        });
        this.userForm1 = this.formBuilder.group({
            'FirstName': ['', Validators.required, ValidationService.alphabeticsValidator],
            'LastName': ['', Validators.required, ValidationService.alphabeticsValidator],
            'Email': ['', Validators.required, ValidationService.emailValidator],
            'PhoneNo': ['', Validators.required],
            'Address': ['', Validators.required],
            'Address2': [''],
            'Zipcode': ['', [Validators.required, Validators.minLength(5), Validators.maxLength(5)],
                ValidationService.numericalsValidatorFromone],
            'AltPhoneNo': [''],
            'Gender': [''],
            'state': ['', Validators.required],
            'city': [''],
            'vippatient': ['']
        });
        this.ReferralForm = this.formBuilder.group({
            'WereyouReferredByAnotherProvider': ['', Validators.required],
            'HowDidYouHearAboutUsOther': ['', Validators.required, ValidationService.alphabeticsValidator],
            'NameOfReferringProviderFromWebsite': ['', Validators.required, ValidationService.alphabeticsValidator],
            'ReferringProviderOrganizationIfNo': ['', Validators.required, ValidationService.alphabeticsValidator],
            'HowDidYouHearAboutUs': ['', Validators.required],
            'NameOfReferringProviderOrganization': ['', Validators.required]
        });
        this.getPharmacydropdown();
        this.activatedRoute.queryParams.subscribe(params => {
            if (params['personid']) {
                this.patientid = params['personid'];
                this.patientcard();
            }
        });
        this.isOpen = false;
        this.expand('pharmacy', 'pharmacy');
    }
    ngOnInit() {
        this.toastr.setRootViewContainerRef(this._rootViewContainerRef);
        this.getStateNames();
        // this.getPersonsList();
        // this.Id = 521;
        // this.patientcard();
    }

    /**auto complete textbox code */
    filter() {
        // alert('filter');
        // alert(this.query);
        this.selected = [];
        this.filteredList = [];
        if (this.query !== '' && this.query.length >= 1) {
            return this.patientdetailsservice.getListofPersons(this.query).subscribe(
                res => {
                    if (res.success) {
                        this.items = res.data;
                      //  console.log(JSON.stringify(this.items));
                        //   if(this.items.lenght > 0) {
                        //       alert();
                        this.filteredList = this.items.filter((el: any) => {
                            return el; // .FirstName.toLowerCase().indexOf(this.query.toLowerCase()) > -1;
                        });
                     //   console.log("test" + JSON.stringify(this.filteredList));
                        // }
                    } else {
                        this.dataCheck = false;
                    }
                }
            );
        } else {
            this.filteredList = [];
        }
    }

    select(item) {
        this.selected.push(item);
      //  console.log(this.selected);
        this.email = this.selected[0].Email;
        // alert(this.email);
        // this.query = '';
        // alert('select');
        this.filteredList = [];
        if (this.selected.length > 0) {
            this.patientid = 0;
            const Id = this.selected[0].Id;
            this.patientid = Id;
            this.patientcard();
        }

    }
    remove(item) {
        this.selected.splice(this.selected.indexOf(item), 1);
    }

    patientcard() {
        // this.patientid = Id;
        if (this.patientid > 0) {
            this.patientdetailsservice.getpatientcarddetails(this.patientid).subscribe(
                res => {
                    if (res.Success) {
                        this.profileimage = '';
                        this.parentData.next(this.patientid);
                        this.dataCheck = res.Success;
                        this.patientcarddata = res.data;
                     //   console.log('anu' + JSON.stringify(this.patientcarddata));
                        // alert(this.patientcarddata.PatientDetails.IsVipPatient);
                        this.name = this.patientcarddata.PatientDetails.FirstName + '  ' + this.patientcarddata.PatientDetails.LastName;
                        if (this.patientcarddata.PatientDetails.IsVipPatient === true) {
                            this.isVippatient = 'Yes';
                        } else if ((this.patientcarddata.PatientDetails.IsVipPatient === null) ||
                            (this.patientcarddata.PatientDetails.IsVipPatient === false)) {
                            this.isVippatient = 'No';
                        }
                        // console.log(this.patientcarddata.PatientDetails.ImageUrl);
                        // if (this.patientcarddata.PatientDetails.ImageUrl === '') {
                        //     this.profileimage = '';
                        // }    
                        if (this.patientcarddata.PatientDetails.ImageUrl !== null || this.patientcarddata.PatientDetails.ImageUrl !== '') {
                            this.profileimage = this.patientcarddata.PatientDetails.ImageUrl;
                        }
                        // console.log(this.patientcarddata.PatientDetails.DOB.substr(0 , 10));
                        if (this.patientcarddata.PatientDetails.DOB) {
                            let dateOfBirth: any = '';
                            dateOfBirth = new Date(this.patientcarddata.PatientDetails.DOB);
                         //   console.log(Date.now());
                            const timeDiff = Math.abs(Date.now() - dateOfBirth);
                            // Used Math.floor instead of Math.ceil
                            // so 26 years and 140 days would be considered as 26, not 27.
                            this.age = Math.floor((timeDiff / (1000 * 3600 * 24)) / 365);
                            // alert(this.age);
                        }

                    } else {
                        this.error(res.data);
                    }
                }
            );
        } else {
            this.dataCheck = false;
        }

    }
    /* get state names*/
    getStateNames() {
        return this._profileSettingsService.getstateNames(231)
            .subscribe(arg => {
                this.stateNames = arg.data;
                //  console.log(JSON.stringify((this.stateNames)));
            });
    }
    edit(type: string, data) {
      //  console.log(data);
        if (type === 'pharma') {
            if (this.disableedit === true) {
                this.disableedit = false;
                this.phrmamodel = data;
               // console.log(this.phrmamodel);
                this.pharmaId = this.phrmamodel.Id;
            }
        } else if (type === 'referral') {
            this.refferalModel = data;
            this.editsts = true;
         //   console.log(this.refferalModel);
        } else if (type === 'profile') {
            this.profileInfo = data;
            this.profilests = true;
         //   console.log(this.profileInfo);
        }
    }
    EditUpdate(type: string) {
        if (type === 'pharma') {
            if (this.pharmacyForm.valid && this.pharmacyForm.dirty && this.phonestssec == false) {
                // this.phrmamodel = this.pharmacyForm.value;
                const fromdt = this.datepipe.transform(this.date, 'dd/MMM/yyyy');
                this.phrmamodel.ModifiedOn = fromdt + ' ' + this.date.getHours() +
                    ':' + this.date.getMinutes() + ':' + this.date.getSeconds();
                this.phrmamodel.PersonId = this.patientid;
                this.phrmamodel.ModifiedBy = this.patientData.Id;
                this.phrmamodel.Id = this.pharmaId;
           //     console.log(this.phrmamodel);
                this.pharmacyReferralService.updatePharmacy(this.phrmamodel).subscribe(
                    res => {
                    //    console.log((JSON.stringify(res)));
                        if (res.Success) {
                            this.success('Pharmacy updated');
                            this.disableedit = true;
                        } else {
                            this.error('Please provide valid pharmacy');
                            this.disableedit = true;
                        }
                    },
                    err => console.log(err)
                );
            } else {
                this.validateAllFormFields(this.pharmacyForm);
            }
        } else if (type === 'referral') {
            if (this.ReferralForm.valid) {
                const fromdt = this.datepipe.transform(this.date, 'dd/MMM/yyyy');
                this.refferalModel.CreatedOn = fromdt + ' ' + this.date.getHours() + ':'
                    + this.date.getMinutes() + ':' + this.date.getSeconds();
                this.refferalModel.CreatedBy = this.patientData.Id;
                this.refferalModel.IsActive = true;
                this.refferalModel.ModifiedOn = fromdt + ' ' + this.date.getHours() +
                    ':' + this.date.getMinutes() + ':' + this.date.getSeconds();
                this.refferalModel.PersonId = this.patientid;
                this.refferalModel.ModifiedBy = this.patientData.Id;
             //   console.log(this.refferalModel);
                this._referalService.AddandEditRefferal(this.refferalModel).subscribe(
                    res => {
                     //   console.log((JSON.stringify(res)));
                        if (res.Success) {
                            this.success('Referal added');
                        } else {
                            this.error('Please provide valid information');
                        }
                    },
                    err => console.log(err)
                );
            } else {
                this.validateAllFormFields(this.ReferralForm);
            }

        } else if (type === 'profile' && this.phonestssec == false && this.phonealtstssec == false) {
            // alert();
            if (this.userForm.valid) {
                // alert();
                const currentdate = this.datepipe.transform(this.date, 'MM/dd/yyyy');
                this.profileInfo.Date = currentdate;
                // this.profileInfo.ImageUrl = this.profileInfo.ImageUrl;
                if (this.profileInfo.ImageUrl ==null || this.profileInfo.ImageUrl ==='') {
                    this.profileInfo.ImageUrl = null;
            } 
            else if (((this.profileInfo.ImageUrl != '') || (this.profileInfo.ImageUrl != null)) && ((this.profileInfo.ImageUrl.toString().indexOf('http://') >= 0) ||
            (this.profileInfo.ImageUrl.toString().indexOf('https://') >= 0) ||
            (this.profileInfo.ImageUrl.toString().includes('http://') ||
                this.profileInfo.ImageUrl.toString().includes('https://')))) {
                    this.profileInfo.ImageUrl = '';
                    }
             //   console.log('update profile' + JSON.stringify(this.profileInfo));
                this._profileSettingsService.updateProfile(this.profileInfo).subscribe(
                    res => {
                     //   console.log((JSON.stringify(res)));
                        if (res.success) {
                            this.success('Personal information updated successfully!');
                        } else {
                            this.error('Please update valid information');
                        }
                    },
                    err => console.log(err)
                );
            } else {
                this.validateAllFormFields(this.userForm);
                // this.error('Please Fill All The Required Fields');
                // alert('else');
            }
        }
    }
    statusChange(id, status, type) {
        if (type === 'creditcard') {
            const model = {
                Id: id,
                IsActive: status
            };
            this._creditCardService.statusChange(model).subscribe(
                res => {
                 //   console.log((JSON.stringify(res)));
                    if (res.Success) {
                        if (status) {
                            this.success('Your card is Activated');
                        } else {
                            this.success('Your card is Deactivated');
                        }
                    } else {
                        this.error(res);
                    }
                },
                err => console.log(err)
            );
        }
        // else if(type === 'primaryinsurance') {
        //     const Isactivestatus = { 'Id': id, 'PersonId': this.patientid, 'IsActive': status };
        //     this.insuranceService.updateInsuranceActive(Isactivestatus).subscribe(
        //         res => {
        //             if (res.Success) {
        //                 if (status) {
        //                     this.success('Your insurace card  is Activated');
        //                 } else {
        //                     this.primarymsg = true;
        //                     this.success('Your insurace card  is Deactivated');
        //                 }
        //             } else {
        //                 this.error(res.data);
        //             }
        //         },
        //         err => err
        //     );
        // } else if(type === 'secondaryinsurance') {
        //     const Isactivestatus = { 'Id': id, 'PersonId': this.patientid, 'IsActive': status };
        //     this.insuranceService.updateInsuranceActive(Isactivestatus).subscribe(
        //         res => {
        //             if (res.Success) {
        //                 if (status) {
        //                     this.success('Your insurace card  is Activated');
        //                 } else {
        //                     this.secondarymsg = true;
        //                     this.success('Your insurace card  is Deactivated');
        //                 }
        //             } else {
        //                 this.error(res.data);
        //             }
        //         },
        //         err => err
        //     );
        // }
    }
    Cancel() {
        this.pharmaId = 0;
        this.editsts = false;
        this.profilests = false;
        this.disableedit = true;
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
    success(successmsg) {
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
                this.patientcard();
                this.editsts = false;
                this.profilests = false;
                this.pharmaId = 0;
            }, 2000);
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
            }, 3000);
        });
    }
    ChildEvent(obj) {
        // alert(JSON.stringify(obj));
        if (obj.flag === false && obj.type === 'intervention') {
            this.inteventionsts = false;
            this.addinteventionsts = true;
            // this.parentData.next(this.patientid);
        }
        if (obj.flag === false && obj.type === 'addintervention') {
            // this.parentData.next(this.patientid);
            this.inteventionsts = true;
            this.addinteventionsts = false;
            this.patientcard();
        }
        if (obj.type === 'assessmenttype') {
            this.assessmentId = obj.id;
            //    alert(this.assessmentId);
            this.adminassessmetssts = false;
            this.allcustomassessmentssts = true;
        }
        if (obj.type === 'customeassessments') {
            // alert(obj);
            this.adminassessmetssts = true;
            this.allcustomassessmentssts = false;
        }
        if (obj.type === 'individualchartsdata') {
            //      alert(obj.type);
            this.adminassessmetssts = true;
            this.individualchartsts = false;
        }
        if (obj.type === 'overallchartsdata') {
            //  alert(obj.type);
            this.adminassessmetssts = true;
            this.overallchartsts = false;
        }
        if (obj.type === 'individualchart') {
            // alert(obj.type);
            this.assessmentId = obj.id;
            this.SurveyId = obj.sid;
            // alert(this.SurveyId);
            this.adminassessmetssts = false;
            this.individualchartsts = true;
        }
        if (obj.type === 'overallchart') {
            this.patientid = obj.id;
            this.SurveyId = obj.sid;
            // alert(this.SurveyId);
            this.adminassessmetssts = false;
            this.overallchartsts = true;
        }
        if (obj.type === 'Activities') {
            // alert(obj.type);
            // this.patientid = obj.id;
            // this.SurveyId = obj.sid;
            // alert(this.SurveyId);
            this.activities = false;
            this.addactivities = true;
        }
        if (obj.type === 'AddActivities') {
            // alert(obj.type);
            // this.patientid = obj.id;
            // this.SurveyId = obj.sid;
            // alert(this.SurveyId);
            this.activities = true;
            this.addactivities = false;
        }
        if (obj.type === 'addmedications') {
            this.patientmedications = true;
            this.addmedications = false;
            this.medicationview = false;
        }
        if (obj.type === 'medications') {
            this.patientmedications = false;
            this.addmedications = true;
        }
        if (obj.type === 'medicationview') {
            this.patientmedications = false;
            this.medicationview = true;
        }
        if (obj.type === 'breath') {
            this.patientbreath = false;
            this.patientaddbreath = true;
        }
        if (obj.type === 'addbreath') {
            this.patientbreath = true;
            this.patientaddbreath = false;
            this.patientcard();
        }
    }
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
            console.log('@@@' + this.profileInfo.PhoneNo);
            this.profileInfo.PhoneNo = this.unmask(this.profileInfo.PhoneNo);
            console.log(this.profileInfo.PhoneNo);
            if (this.profileInfo.PhoneNo.length !== 10) {
                this.phonestssec = true;
            } else {
                this.phonestssec = false;
            }
          //  console.log(this.phonestssec);
        }
    }
    unmasckaltphone() {
        this.phonealtstssec = false;

        if (this.profileInfo.AltPhoneNo !== '') {
          //  console.log('@@@' + this.profileInfo.AltPhoneNo);
            this.profileInfo.AltPhoneNo = this.unmask(this.profileInfo.AltPhoneNo);
          //  console.log(this.profileInfo.AltPhoneNo);
            if (this.profileInfo.AltPhoneNo.length !== 10) {
                this.phonealtstssec = true;
            } else {
                this.phonealtstssec = false;
            }
         //   console.log(this.phonealtstssec);

        }
    }
    unmasckPHARMphone() {
        this.phonestssec = false;
        if (this.phrmamodel.PharmacyPhoneNumber !== '') {
          //  console.log('@@@' + this.phrmamodel.PharmacyPhoneNumber);
            this.phrmamodel.PharmacyPhoneNumber = this.unmask(this.phrmamodel.PharmacyPhoneNumber);
         //   console.log(this.phrmamodel.PharmacyPhoneNumber);
            if (this.phrmamodel.PharmacyPhoneNumber.length !== 10) {
                this.phonestssec = true;
            } else {
                this.phonestssec = false;
            }
          //  console.log(this.phonestssec);
        }
    }
    expand(selected, expanded?) {
        this.expanded = selected;
        this.isOpen = (expanded == this.expanded) ? !this.isOpen : true;
    }
    getPharmacydropdown() {
        this.pharmacyReferralService.Pharmacydrop().subscribe(
            res => {
            //    console.log("dropdown" + (JSON.stringify(res.data)));
                this.pharmacydrop = res.data;
            },
            err => console.log(err)
        );
    }
    /**
 * This function should return true for an event to be
 * completed
 */
    completeListener(item) {
      //  console.log(item);
        return true;
    }
    @HostListener('document:click', ['$event'])
    handleClick(event) {
        // alert(event.target.id);
        const clickedComponent = event.target.tagName;
        if (event.target.id !== 'patientlists') {
            this.filteredList = [];
        }
        // let clickedComponent = event.target;
        // let inside = false;
        // console.log(clickedComponent);
        // console.log(this.elementRef.nativeElement);
        // do {
        //     if (clickedComponent === this.elementRef.nativeElement) {
        //         inside = true;
        //     }
        //    clickedComponent = clickedComponent.parentNode;
        // } while (clickedComponent);
        //  if (!inside) {
        //      this.filteredList2 = [];
        //  }
    }

}

