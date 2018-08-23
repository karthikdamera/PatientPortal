
import { Component, OnInit, ViewContainerRef, ViewChild } from '@angular/core';
import { MailUploadService } from './mailupload.service';
import { mailupload } from '../../../models/mailupload.model';
// import { App } from './../../../../environments/environment';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Toast } from 'ng2-toastr/src/toast';
import { Angular2Csv } from 'angular2-csv/Angular2-csv';
import { ResponseContentType } from '@angular/http';
import { ModalDirective } from 'angular-bootstrap-md';
import { MailuploadPipe } from './mailuploadPipe';
declare var jQuery: any;
@Component({
  selector: 'app-mailupload',
  templateUrl: './mailupload.component.html',
  styleUrls: ['./mailupload.component.scss'],
  providers: [MailUploadService]
})
export class MailuploadComponent implements OnInit {
  @ViewChild('uploadcsv') public uploadcsv: ModalDirective;
    @ViewChild('sendMail') public sendMail: ModalDirective;
  @ViewChild('csvfile') choosefile: any;
  dataarray: any = {};
  name: string;
  description: string;
  userFilter: string;
  date: any;
  selectchck:any;
  url: any;
  sendbtn: boolean;
  disable:boolean;
  gobtn:boolean;
  isCopied1: boolean;
  pusharray: any = [];
  isSelected: boolean;
  selectall: boolean;
  selectpa: boolean;
  sampledata = [];
  ischecked: boolean;
 // invitebtn: boolean;
  cid: string;
  obj: any;
  filename: string;
  showdrpdwn: boolean;
  mailarray = [];
  allid: any;
  templates=[];
  totalmail= [];
  campaignname: string;
  check: any;
  model={SelectedTemplateId:""};
  campaignid: any;
  Template: any;
  // Name:string;
  userLoginName: string;
  modal: mailupload;
  filestatus: boolean;
  patientData: any = {};
  userfilter: any = { Email: '' };
  constructor(private _mailuploadservice: MailUploadService, public toastr: ToastsManager, vcr: ViewContainerRef) {
  this.modal = new mailupload();
  this.toastr.setRootViewContainerRef(vcr);
  this.patientData = JSON.parse(localStorage.getItem('loginData'));
  // this.userLoginName = this.patientData.FirstName + ' ' + this.patientData.LastName;
  this.sendbtn = true;
 this.filestatus = true;
 // this.invitebtn = true;
 this.isCopied1 = false;
 this.showdrpdwn=true;
 this.gobtn=true;
 this.filename = '';
 this.campaignid = localStorage.getItem('campaignid');
 
    }

 public fileList: FileList;
//  public file: File;
 public formData: FormData;
 public data: any[];
  ngOnInit() {
    this.campaignname = localStorage.getItem('campaignname');
    this.description = localStorage.getItem('campaigndes');
    this.date = localStorage.getItem('campaigndate');
    this.cid = localStorage.getItem('campaignid');
    let base =
    "http://" +
    window.location.hostname.split(".")[0] +
    "." +
    window.location.hostname.split(".")[1] +
    "." +
    window.location.hostname.split(".")[2] +
    "/" ;
    this.url = base + 'campaign-attendee/' + localStorage.getItem('campaignurl');
     this.getuploaddata();
     this.gettemplates();
  }
  // for Get Call
  getuploaddata() {
    return this._mailuploadservice.getdata(this.campaignid).subscribe(res => {
      this.mailarray = res.data;
      if (this.selectall === true) {
      this.selectdAll();
      this.select();
      }
      // console.log(this.mailarray);
    });
  }
  // for Get Templates
  gettemplates(){
    return this._mailuploadservice.GetTemplates().subscribe(res => {
      this.templates = res.data;
    //  console.log(JSON.stringify( this.templates));
    });
  }
  // Checkbox to show dropdown values
  enabledrpdwn(event){
   if(event.target.checked){
this.showdrpdwn=false;
   }
   else{
    this.showdrpdwn=true;
    this.model.SelectedTemplateId="";
   }
  }
  // For Download EMpty Template
  downloadtemplate( data: any) {

  //   let options = {
  //        headers: ['SlNo.', 'FirstName', 'LastName', 'Email', 'PhoneNumber']
  // };
  // let headerobj = {};
  // headerobj = options.headers;
  var col1 = 'SlNo.' + '\,';
  var col2= 'FirstName' + '\,';
  var col3= 'LastName' + '\,';
  var col4= 'Email' + '\,';
  var col5= 'PhoneNumber' + '\,';
    let blob = new Blob([ col1, col2 , col3 , col4 , col5], { type: 'csv' });
    let url = window.URL.createObjectURL(blob);
    if (navigator.msSaveOrOpenBlob) {
        navigator.msSaveBlob(blob, 'Emails.csv');
    } else {
        let a = document.createElement('a');
        a.href = url;
        a.download = 'Emails.csv';
         document.body.appendChild(a);
        a.click();
         document.body.removeChild(a);
    }
    window.URL.revokeObjectURL(url);
  }
  // to send emails
sendEmaildata() {
if (this.selectall === true) {
 // console.log(this.totalmail);
  // for(let i=0;i<=this.totalmail.length;i++){
  //   this.totalmail[i].sele
  // }
  this._mailuploadservice.postuploaddata(this.totalmail).subscribe(
    res => {console.log((JSON.stringify(res)));
  //    console.log(this.totalmail);
      if (res.Success) {
          this.success(res.data);
      } else {
          this.error(res.data);
      }
  },
  err => console.log(err)
);


}

if (this.selectall !== true) {
  //alert(this.model.SelectedTemplateId);
  for(let i=0;i<this.pusharray.length;i++){
    this.pusharray[i].SelectedTemplateId=this.model.SelectedTemplateId;
    //alert(this.model.SelectedTemplateId);
  }
  
 // alert(JSON.stringify(this.pusharray));
  this._mailuploadservice.postuploaddata(this.pusharray).subscribe(
    res => {console.log((JSON.stringify(res)));
   //   console.log(JSON.stringify(this.pusharray));
      if (res.Success) {
          this.success(res.data);
      } else {
          this.error(res.data);
      }
  },
  err => console.log(err)
);

}
this.selectall = false;
}
// TO import csv files
   postuploadCSVdata() {
      const finalTemplate = this.Template.replace('data:application/vnd.ms-excel;base64,', '');
      this.modal.EmailsName = this.dataarray.Name;
      this.modal.TemplateUrl =  finalTemplate;
      this.modal.UserName =  this.userLoginName;
      this.modal.CampaignId = JSON.parse(this.cid);
    //  console.log(JSON.stringify(this.modal));
      this._mailuploadservice.postuploadCSVdata(this.modal).subscribe(
        res => {
      //      console.log((JSON.stringify(res)));
            if (res.Success) {
                this.success('CSV upload successfully');
                this.selectall = true;
            } else {
                this.error(res.data);
            }
        },
        err => console.log(err)
      );

}
// TO Converting baSE 64
 changeListener($event): void {
  this.filestatus = false;
  if ($event.target !== undefined ) {
  this.readThis($event.target);
  }
}

readThis(inputValue: any): void {
  const file: File = inputValue.files[0];
 // console.log(file.name);
  if (file.name !== undefined) {
  this.filename = file.name;
  }
  const myReader: FileReader = new FileReader();

  myReader.onloadend = (e) => {
   //   console.log(e);
      this.Template = myReader.result;
   //   console.log('file data' + JSON.stringify(this.Template));
  };
  myReader.readAsDataURL(file);
}
// SELECT ALL CHECKBOX
  select() {
    if (this.selectall === true) {
      this.isSelected = true;
      this.sendbtn = false;
      this.gobtn=false;
   //   this.invitebtn = false;
      for (let i = 0; i <= this.mailarray.length - 1; i++) {
        this.totalmail.push({
          Id: this.mailarray[i].Id,
          campaignid: this.cid,
          Email: this.mailarray[i].Email,
          SelectedTemplateId:''
        });
      }
   //   console.log(this.totalmail);
    } else {
      this.gobtn=true;
      this.isSelected = false;
      this.sendbtn = true;
    // this.invitebtn = true;
      this.totalmail = [];
    }
  }
  // SELECT SINGLE CHECKBOXES
  send(patientdata, checked, i, id) {
    this.sendbtn = false;
   
    // this.selectall = this.dataarray.every(function (item: any) {
    //   return item.selected == true;
   // })
    if (checked) {
     // this.ischecked = true;
    //  if(this.selectall=false){
      this.gobtn=false;
      patientdata.Checked = true;
      this.pusharray.push({
        Id: patientdata.Id,
        CampaignId: this.cid,
        Email: patientdata.Email,
        SelectedTemplateId:this.model.SelectedTemplateId
      });
    // }
    } else {
      
      if (this.selectall !== true) {
     for (let j = 0; j < this.pusharray.length ; j++) {
       if (this.pusharray[j].Id === id) {
      this.pusharray.splice(j, 1);
       }
      }
    } else {
      for (let j = 0; j < this.totalmail.length ; j++) {
       if (this.totalmail[j].Id === id) {
       this.totalmail.splice(j, 1);
       }
      }
   //   console.log(this.totalmail);
    }
    }
    if(this.pusharray.length===0){
     
    //  this.invitebtn = true;
      this.gobtn=true;
    } 
    else{
      if(this.selectall==false){
        this.gobtn=false;
      }
    }
    if(this.totalmail.length===0 && this.selectall==true){
     
    //  this.invitebtn = true;
      this.selectall=false;
      this.gobtn=true;
     } 
     else{
       if(this.selectall==true){
     // this.invitebtn=false;
      this.gobtn=false;
       }
    }
  }
//   selectcheck(check){
// if(check){
//   this.invitebtn=false;
// }
// else{
//   if(this.pusharray.length===0){
//     alert();
//     this.invitebtn=true;
//   }
// }
  // }
  // to clear the textboxes when click on import emails
  clear() {
    this.dataarray.Name = '';
    this.choosefile.nativeElement.value = '';
    this.filename = '';
  }
  // SELECT ALL CHECKBOX
  selectdAll() {
   // this.invitebtn = false;
    for (let i = 0; i < this.mailarray.length; i++) {
      this.mailarray[i].selected = this.selectall;
    }
  }
  /** Add,Edit,delete Referral methods end */
/** to show Success messages */
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
            //  jQuery('#mailupload').modal('hide');
            this.sendMail.hide();
            this.uploadcsv.hide();
             // this.invitebtn = true;
              this.gobtn=true;
              this.filestatus = true;
              this.dataarray.Name = '';
              this.choosefile.nativeElement.value = '';
              this.pusharray = [];
              this.totalmail = [];
              this.showdrpdwn=true;
              this.model.SelectedTemplateId="";
              this.selectchck=false;
          this.getuploaddata().add(() => {
        });
      }, 2000);

  });
}
/** to show error messages */
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
          // if (type === 'add') {
          //     jQuery('#pharmaaddModal').modal('hide');
          // }
          // if (type === 'update') {
          //     jQuery('#pharamaeditmodel').modal('hide');
          // }
          // this.GetPharma().add(() => {
          // });
      }, 2000);
     // this.disableButton = false;
  });
}

}
