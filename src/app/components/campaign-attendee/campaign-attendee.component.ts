import { Component, OnInit, ViewContainerRef, ViewChild } from '@angular/core';
import { CampaignattendyModel } from '../../models/campaign.model';
import { ValidationService } from './../../shared/validation/validation.service';
import { ValidationComponent } from './../../shared/validation/validation.component';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { AsyncValidatorFn, FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Toast } from 'ng2-toastr/src/toast';
import { DatePipe, AsyncPipe } from '@angular/common';
import { INgxMyDpOptions, IMyDateModel, IMyInputFieldChanged, IMyDate } from 'ngx-mydatepicker';
import { NgxMyDatePickerDirective } from 'ngx-mydatepicker';
import { CampaignService } from './campaign-attendee.service';
import { UnMaskedData } from '../../shared/services/unmaskdata';
import { ModalDirective } from 'angular-bootstrap-md';
declare var jQuery: any;

@Component({
  moduleId: module.id,
  selector: 'app-campaign-attendee',
  templateUrl: './campaign-attendee.component.html',
  styleUrls: ['./campaign-attendee.component.scss'],
  providers: [DatePipe, CampaignService]
})
export class CampaignAttendeeComponent implements OnInit {
  @ViewChild('registration') public registratio: ModalDirective;
  Id: number;
  name: string;
  successfullyenrolled: boolean;
  validdate: boolean = false;
  addattendeests: string;
  enterdatests: boolean;
  attendeeForm: any;
  phonestssec:boolean;
  campaigndate:string;
  location:string;
  unmask = UnMaskedData;
  date: Date = new Date();
  attendeeModel: CampaignattendyModel;
  model: any = { 'DOB': '' };
  myOptions: INgxMyDpOptions = {
      // other options...
      dateFormat: 'mm/dd/yyyy',
      firstDayOfWeek: 'mo',
      markCurrentDay: true,
      disableHeaderButtons: true,
      disableSince: { year: this.date.getFullYear() - 5, month: this.date.getMonth() + 1, day: this.date.getDate() },
      selectorHeight: '232px',
      selectorWidth: '330px'
  };
  constructor(private activatedRoute: ActivatedRoute, private router: Router, private formBuilder: FormBuilder,
      public toastr: ToastsManager, vcr: ViewContainerRef, public datepipe: DatePipe, private _campaignService: CampaignService) {
      console.log(this.activatedRoute.queryParams['_value'].event);
      this.enterdatests = false;
      this.toastr.setRootViewContainerRef(vcr);
      this.validdate = false;
      this.phonestssec = false;
      this.successfullyenrolled = false;
      this.attendeeModel = new CampaignattendyModel();
      this.addattendeests = localStorage.getItem('adminattendee');
      // this.attendeeModel.CampaignId = this.activatedRoute.queryParams['_value'].event;
      this.attendeeForm = this.formBuilder.group({
          'FirstName': ['', Validators.required, ValidationService.alphabeticsValidator],
          'LastName': ['', Validators.required, ValidationService.alphabeticsValidator],
          'Email': ['', Validators.required, ValidationService.emailValidator],
          'AgeRange': [''],
          'Gender': [''],
          'ContactNumber': ['', Validators.required],
          'Message': ['']
      });
  }
  // on page load get call
  ngOnInit() {
      this.activatedRoute.params.forEach((params: Params) => {
          this.Id = params['id'];
          console.log(this.Id);
      });
      this.GetCampainbyGuid(this.Id);
  }
  // onInputFieldDobChanged(event: IMyInputFieldChanged) {
  //     this.enterdatests = false;
  //     if (event.value.length >= 1) {
  //         // alert();
  //     this.enterdatests = true;
  //    // alert();
  //     // console.log('yes its 1');
  //     }
  //     console.log('IMyInputFieldChanged' + JSON.stringify(event.value) + ',' + event.value.length + ',' + event.valid);
  //     if (event.value.length === 10) {
  //         this.validdate = event.valid;
  //         // this.validdatecheck = true;
  //        // this.validdate=true;
  //         console.log(this.validdate);
  //         const selectedDate = new Date(event.value.toString());
  //         const mydate: IMyDate = {
  //             year: selectedDate.getFullYear(),
  //             month: selectedDate.getMonth(),
  //             day: selectedDate.getDay()
  //         };
  //         const dobmodal: IMyDateModel = {
  //             date: mydate,
  //             jsdate: selectedDate,
  //             formatted: event.value.toString(),
  //             epoc: 1
  //         };
  //         // alert(event.value);
  //         console.log('dobmodal' + JSON.stringify(dobmodal));
  //         if (this.validdate) {
  //            // alert("validate");
  //             this.enterdatests = false;
  //                 this.onDOBDateChanged(dobmodal);
  //         } else {
  //                 this.error('Please click on calender icon and select DOB.');
  //                 this.ngxdp.clearDate();
  //         }
  //     }
  // }
  // /**
  //     *
  //     * @param event
  //         When clicking on calendar to get the Birthdate from IMyDateModel
  //     */
  // onDOBDateChanged(event: IMyDateModel): void {
  //     this.enterdatests = false;
  //     this.model.DOB = event.formatted;
  //     // alert("dfdf");
  //     this.attendeeModel.DOB = this.datepipe.transform(this.model.DOB, 'dd/MMM/yyyy');
  // }
  GetCampainbyGuid(id) {
      return this._campaignService.getCampaignGuid(id).subscribe(
          res => {
              console.log(JSON.stringify(res.data));
              this.attendeeModel.CampaignId = res.data[0].Id;
              this.name = res.data[0].Name;
this.campaigndate=res.data[0].CampaignDate;
this.location=res.data[0].Location;
          }
      );
  }
  attendeePost() {
     // alert(this.enterdatests)
          if (this.attendeeForm.dirty && this.attendeeForm.valid &&   this.phonestssec == false) {
              const fromdt = this.datepipe.transform(this.date, 'dd/MMM/yyyy');
              this.attendeeModel.CreatedOn = fromdt + ' ' + this.date.getHours() +
                  ':' + this.date.getMinutes() + ':' + this.date.getSeconds();
              this.attendeeModel.CreatedBy = this.attendeeModel.FirstName;
              this.attendeeModel.IsActive = true;
              console.log(this.attendeeModel);
              this._campaignService.postStaffInfo(this.attendeeModel).subscribe(
                  res => {
                      console.log((JSON.stringify(res)));
                      if (res.Success) {
                          this.success('Data saved');
                      } else {
                          this.error(res.data);
                      }
                  },
                  err => console.log(err)
              );
          } else {
              this.validateAllFormFields(this.attendeeForm);
          }
      }
  enrollyes() {
      this.successfullyenrolled = false;
  }
  enrollno() {
      if (this.addattendeests === 'admin') {
          this.close();
      } else {
          window.close();
      }
  }
  /** Toast messages for success and failure */
  success(successmsg) {
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
              // jQuery('#creditcardadd').modal('hide');
              // this.getCreditcardInfo().add(() => {
              // });
              // if (localStorage.getItem('attendeeUrl')) {
              //     this.router.navigate(['/admindashboard/attendies']);
              // }
              // this.attendeeForm.reSet();
              this.attendeeModel = new CampaignattendyModel();
             // jQuery('#Registration').modal('show');
             this.registratio.show();
            //  localStorage.removeItem('attendeeUrl');
          }, 2000);
      });
  }
  error(errormsg) {
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
  close() {
      localStorage.removeItem('adminattendee');
      this.router.navigate(['./admin/campaign/attendies']);
  }
  getphoneno() {
      return {
        mask: ['(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/],
        guide: true,
        placeholderChar: '_',
        keepCharPositions: true
      };
    }
    unmasckphone() {       
      this.phonestssec = false;       
      if (this.attendeeModel.ContactNumber !== '') {
           console.log('@@@' + this.attendeeModel.ContactNumber);
          this.attendeeModel.ContactNumber= this.unmask(this.attendeeModel.ContactNumber);
          console.log(this.attendeeModel.ContactNumber);
          if (this.attendeeModel.ContactNumber.length !== 10) {
              this.phonestssec = true;
          } else {
              this.phonestssec = false;
          }
          console.log(this.phonestssec);
      }
   
  }


}
