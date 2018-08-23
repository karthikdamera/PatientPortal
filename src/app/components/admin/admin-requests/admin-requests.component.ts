import { Component, OnInit, ViewContainerRef, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { RequestTypeIdEnum } from '../../../models/requests.model';
import { PersonRequestsService } from '../../person/requests/requests.service';
import { statusenum, statusenum1 } from './../../../models/person-slot.model';
import { DatePipe, AsyncPipe } from '@angular/common';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Toast } from 'ng2-toastr/src/toast';
import { adminrequests } from './admin-requests.service';
import { ModalDirective } from 'angular-bootstrap-md';
import { adminrequestSearchPipe } from './adminrequestpipe';
import { MedicalRecordPipe } from './medicalRecordPipe';

@Component({
    selector: 'app-admin-requests',
    templateUrl: './admin-requests.component.html',
    styleUrls: ['./admin-requests.component.scss'],
    providers: [PersonRequestsService, DatePipe, MedicalRecordPipe, adminrequestSearchPipe, adminrequests]
})
export class AdminRequestsComponent implements OnInit {
    @ViewChild('reply') public reply: ModalDirective;
    requesttypeId: number;
    statusname: any = [];
    statusenum1: any = [];
    page: number;
    requestfilter: string;
    name: string;
    checksts: string;
    binddata: string;
    requestqueryString:string;
    norecordstspending: boolean;
    norecordstsanswers: boolean;
    binddataphone: string;
    bindemail: string;
    bindclaim: string;
    medicalrecordrearch:string;
    temp: any = {};
    StatusJSon = [];
    Email:string;
    PhoneNo:string;
    replymsg = { 'Message': '' };
    status: string;
    postDateFormat = 'dd/MMM/yyyy';
    requestsList: any = [];
    userFilter: any = {Status: 'Pending' };
    sample: any;
    constructor(private router: Router, private _personRequestsService: PersonRequestsService,
        private adminservice: adminrequests, public datepipe: DatePipe, public toastr: ToastsManager, vcr: ViewContainerRef) {
        this.toastr.setRootViewContainerRef(vcr);
        this.sample = 'Unanswered';
        // this.status = true;
        for (let i = 0; i < 2; i++) {
            this.statusname.push(statusenum[i]);
        }
        for (let j = 0; j < 2; j++) {
            this.statusenum1.push(statusenum1[j]);
        }
        this.page = 1;
        this.norecordstspending = false;
        this.norecordstsanswers = false;
    }
    ngOnInit() {
        this.checksts = 'Approve';
        this.requestsList = [];
        this.requestRedirect('medicinerefil');
        this.statusjson();
        //this.replymsgs('Approve');
    }
    filters(status) {
        if (status === 'Approve') {
            this.temp.Status = 'Approved';
        } else {
            this.temp.Status = 'Declined';
        }
    }
    // questions() {
    //     this.status = false;
    //     this.requestsList = [];
    // }
    //   /** changesubRequest from dropdown */
    //   changesubResultType(value) {
    //     //   alert(value);    //       this.patientQuestion = value;
    //       this.requestsList = [];
    //       if (value === 'Question') {
    //         this.requestRedirect('requestquestion');
    //       } else if (value === 'Billing') {
    //         this.requestRedirect('requestbilling');
    //       } else if (value === 'Information') {
    //         this.requestRedirect('requestinfo');
    //     }
    // }
    requestRedirect(requestType) {
        // this.userFilter = { Email: '', Status: 'Pending' };
       this.sample = 'Unanswered';
        this.norecordstspending = false;
        this.norecordstsanswers = false;
       this.userFilter = { Email: '', Status: 'Pending' };
        // alert(requestType);
        // this.status = false;
        this.requestsList = [];
        const patientId = 0;
        if (requestType === 'medicinerefil') {
            this.requesttypeId = RequestTypeIdEnum.medicineRefills;
        } else if (requestType === 'requestrecords') {
            this.requesttypeId = RequestTypeIdEnum.requestRecords;
        } else if (requestType === 'testresults') {
            
            this.requesttypeId = RequestTypeIdEnum.testResults;
        } else if (requestType === 'requestquestion') {
            this.requesttypeId = RequestTypeIdEnum.requestQuestion;
        } else if (requestType === 'requestinfo') {
            this.requesttypeId = RequestTypeIdEnum.requestInformation;
        } else if (requestType === 'requestbilling') {
            this.requesttypeId = RequestTypeIdEnum.requestBilling;
        }
      
        return this._personRequestsService.getRequest(patientId, this.requesttypeId).subscribe(
            res => {
                this.requestsList = res.data;
                for(let i = 0; i <= this.requestsList.length -1 ;i++) {
         if(this.requestsList[i].Status == 'Pending' || this.requestsList[i].Status == 'PENDING'){

            this.norecordstspending = true;
            break;
         } else if(this.requestsList[i].Status == 'Approved') {
            this.norecordstsanswers = true;
         }
                }
          //      console.log('medicine refill list' + (JSON.stringify(this.requestsList)));
                // this.disableButton = false;
            }
        );
    }
    OnTabSelect(tabIndex: number) {
        switch (tabIndex) {
            case 0: this.requestRedirect('medicinerefil');
                break;
            case 1: this.requestRedirect('requestrecords');
                break;
            case 2: this.requestRedirect('testresults');
                break;
            case 3: this.requestRedirect('requestquestion');
                break;
            case 4: this.requestRedirect('requestbilling');
                break;
            case 5: this.requestRedirect('requestinfo');
                break;
        }
    }
    patientstatus(d) {
        // console.log(d);
        this.binddata = d.CreatedOn;
        this.binddataphone = d.PhoneNo;
        this.bindemail = d.Email;
        this.bindclaim = d.BillClaimNo;
        let date: any;
        date = new Date();
        this.status = '';
        const currentdata = this.datepipe.transform(date, this.postDateFormat);
        const currenttime = currentdata + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
   //     console.log(this.replymsg.Message);
        this.temp = {
            // AppointmentDateTime: data.SlotTime,
            // CheckInDateTime: currenttime,
            Id: d.Id,
            Status: this.status,
            ReplyMessage: this.replymsg.Message,
            ReadStatus: false
        };

        //jQuery('#Replymsg').modal('show');

    }
    patientreply(d) {
        // alert('reply');
        this.binddata = d.CreatedOn;
        this.binddataphone = d.PhoneNo;
        this.bindemail = d.Email;
        this.bindclaim = d.BillClaimNo;
        let date: any;
        date = new Date();
        this.status = '';
        const currentdata = this.datepipe.transform(date, this.postDateFormat);
        const currenttime = currentdata + ' ' + date.getHours() + ':' + date.getMinutes() + ':' + date.getSeconds();
        this.temp = {
            Id: d.Id,
            Status: '',
            ReplyMessage: '',
            ReadStatus: false
        };
        //jQuery('#Replymsg').modal('show');
    }
    approve(type) {
        if (type === 'reply') {
            if (this.replymsg.Message === '') {
                this.error('Please enter text');
            } else {
            //    console.log('msg' + this.replymsg.Message);
                this.temp.ReplyMessage = this.replymsg.Message;
                this.temp.RequestTypeId = this.requesttypeId;
             //   console.log(this.temp);
                this.adminservice.adminrequestPost(this.temp).subscribe(
                    res => {
                 //       console.log((JSON.stringify(res)));
                        if (res.Success) {
                            this.success('Reply sent successfully ', 'reply', true);
                        } else {
                            this.error(res.data);
                      //      console.log(res);
                        }
                    }
                );
            }
        } else {
          //  console.log('msg' + this.replymsg.Message);
            this.temp.ReplyMessage = this.replymsg.Message;
            this.temp.RequestTypeId = this.requesttypeId;
            this.adminservice.adminrequestPost(this.temp).subscribe(
                res => {
                 //   console.log((JSON.stringify(res)));
                    if (res.Success) {
                        this.success('You are successfully Approved', 'aprove', true);
                    } else {
                        this.error(res.data);
                   //     console.log(res);
                    }
                }
            );
        }

    }
    filterstatus(t: string): void {
         // alert(t)
        this.sample = t;
        if (t === 'Answered') {
            // if(this.norecordstsanswers === true) {
            //     this.norecordstspending = true;
            // }
            this.userFilter.Status = 'Approved' || 'Declined';
        } else {
            
            this.userFilter.Status = 'Pending';
        }
    }
    statusjson() {
        return this.adminservice.statusjson()
            .subscribe(res => {
                this.StatusJSon = res;

            });


    }
    radioCheck(value) {

        this.checksts = value;
        this.replymsgs(this.checksts);
    }
    replymsgs(data) {
        this.checksts = data;
        if (data === 'Approve') {
            this.temp.Status = 'Approved';
        } else {
            this.temp.Status = 'Declined';
        }
        this.statusjson();
        let requestType: string = '';
        if (this.requesttypeId === 1) {
            requestType = 'Refills';
        } else if (this.requesttypeId === 6) {
            requestType = 'Medical';
        } else if (this.requesttypeId === 2) {
            requestType = 'Test';
        } else if (this.requesttypeId === 3) {
            requestType = 'Questions';
        } else if (this.requesttypeId === 5) {
            requestType = 'Information';
        } else if (this.requesttypeId === 7) {
            requestType = 'Billings';
        }
        var approvemsg = this.StatusJSon.filter(status => status.Status == data && status.RequestType == requestType);
        this.replymsg.Message = approvemsg[0].Message;

    }
    success(successmsg, ststype, loadgrid?: boolean) {
        if (loadgrid == null || loadgrid == undefined) {
            loadgrid = false;
        }
        const patientId = 0;
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
                if (ststype === 'reply') {
                    this.reply.hide();
                    // jQuery('#Replymsg').modal('hide');
                }
                if (ststype === 'aprove') {
                    //  jQuery('#Patientstatus').modal('hide');
                    this.reply.hide();
                }
            }, 2000);
            this.replymsg.Message = '';
            if (!loadgrid) {
                this.requestRedirect('medicinerefil');
            } else {
                return this._personRequestsService.getRequest(patientId, this.requesttypeId).subscribe(
                    res => {
                        this.requestsList = res.data;
                    }
                );
            }

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
            }, 3000);
        });
    }

}

