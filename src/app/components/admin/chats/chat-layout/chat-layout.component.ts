import { PatientDetailsService } from './../../patient-details/patient-details.service';
import {
  Component,
  OnInit,
  ViewContainerRef,
  ViewChild,
  ElementRef
} from '@angular/core';
import { ChatService } from '../chats.service';
import { Router, NavigationEnd, NavigationStart } from '@angular/router';
import { ToastsManager } from 'ng2-toastr/ng2-toastr';
import { Toast } from 'ng2-toastr/src/toast';
import { ChatModel, CreateGroup } from '../../../../models/chat.model';
import { ChatPipe } from '../chatpipe';
import { ScrollbarComponent } from 'ngx-scrollbar';
import { ModalDirective } from 'angular-bootstrap-md';
declare var jQuery: any;
@Component({
  selector: 'app-chat-layout',
  templateUrl: './chat-layout.component.html',
  styleUrls: ['./chat-layout.component.scss'],
  providers: [ChatService, PatientDetailsService]
})
export class ChatLayoutComponent implements OnInit {
  @ViewChild('addnewnumber') public addnewnumber: ModalDirective;
  @ViewChild('scrollRef') scrollRef: ScrollbarComponent;
  date: Date = new Date();
  providerfilter = { Name: '' };
  patientfilter = { PatientName: '', PhoneNumber: '' };
  checked: boolean = false;
  addnewsts: boolean;
  checksts: boolean = true;
  Groupname: string;
  getProviderdata: any = [];
  getPatientdata: any = [];
  getOrgdata: any = [];
  getSMS: any = [];
  email: string = '';
  splitarray = [];
  providerPhoneno: string;
  providercount: number;
  providerqueryString: string;
  queryString: string;
  patientcount: number;
  filestatus: boolean;
  filename: string;
  chatmodel: ChatModel;
  public filteredList = [];
  public selected = [];
  public query = '';
  items: any = [];
  Template: any;
  groupName: string;
  checkedb: any = [{ checked: false }];
  count: any = [{ name: '', phone: '', image: '' }];
  providermessage: any = [];
  mulitchatmessage: any = [];
  current: number = 0;
  patientprofileimage: string;
  // more: boolean;
  constructor(
    private router: Router,
    private _chatService: ChatService,
    public toastr: ToastsManager,
    vcr: ViewContainerRef,
    private patientdetailsservice: PatientDetailsService
  ) {
    this.toastr.setRootViewContainerRef(vcr);
    this.providerPhoneno = '';
    this.filestatus = true;
    this.patientprofileimage = '';
    this.filename = '';
    this.Groupname = '';
    // this.providermessage = '';
    // this.mulitchatmessage = '';
    this.chatmodel = new ChatModel();
    this.groupName = 'groupname';
    this.addnewsts = true;
  }

  ngOnInit() {
    this.providercount = 0;
    this.patientcount = 0;
    this.getOrganiZationData();
    // this.getProviderList();
  }
  filter() {
    // alert(this.query);
    this.selected = [];
    this.filteredList = [];
    if (this.query !== '' && this.query.length >= 3) {
      return this.patientdetailsservice
        .getListofPersons(this.query)
        .subscribe(res => {
          this.items = res.data;
          this.filteredList = this.items.filter((el: any) => {
            return el; // .FirstName.toLowerCase().indexOf(this.query.toLowerCase()) > -1;
          });
          //   console.log(this.filteredList);
        });
    } else {
      this.filteredList = [];
    }
  }
  select(item) {
    this.selected.push(item);
    //    console.log(this.selected);

    this.email = '+1' + this.selected[0].PhoneNo;

    this.filteredList = [];
  }
  addcontact() {
    if (this.selected.length > 0) {
      this.count.push({
        name: this.selected[0].FirstName,
        phone: this.email,
        image: this.patientprofileimage
      });
      this.chatmodel.ToNumbers.push(this.email);
      this.success('New Contact Added Sucessfully', '');
    } else {
      this.error('please select one contact', '');
    }
  }
  clear() {
    this.email = '';
    this.selected = [];
    this.filename = '';
    this.Groupname = '';
  }
  getOrganiZationData() {
    return this._chatService.getOrganizations().subscribe(res => {
      this.getOrgdata = res.data.GroupNames;
      //    console.log('org data' + (JSON.stringify(this.getOrgdata)));
      // if (this.getOrgdata.length > 0) {
      //   if (this.getOrgdata[0].Numbers.length > 0) {
      // // let providermob: any;
      // this.providerPhoneno  = this.getOrgdata[0].Numbers[0].Number;
      // console.log(this.providerPhoneno);
      // this.gteAllPatientInfo(this.providerPhoneno);
      //   }
      // }
    });
  }
  getAllMessages(patientno, providerno) {
    this.getSMS = [];
    return this._chatService
      .getSmslist(patientno, providerno)
      .subscribe(res => {
        this.getSMS = res.data;
        this.scrollRef.scrollYTo(200 * this.getSMS.length);
        // document.getElementById('chatend').scrollIntoView(false);
        //   console.log('chat data' + (JSON.stringify(this.getSMS)));
      });
  }
  changeListener($event): void {
    this.filestatus = false;
    if ($event.target !== undefined) {
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

    myReader.onloadend = e => {
      //   console.log(e);
      this.Template = myReader.result;
      //   console.log('file data' + JSON.stringify(this.Template));
    };
    myReader.readAsDataURL(file);
  }
  gteAllPatientInfo(phone) {
    this.count = [];
    return this._chatService.getpatientdata(phone).subscribe(res => {
      this.getPatientdata = res.data;
      //     console.log('patient data' + (JSON.stringify(this.getPatientdata)));
      // if (this.getPatientdata.length > 0) {
      //   if (this.getPatientdata[0].ImageUrl === '') {
      //     this.patientprofileimage = '';
      // } else if (this.getPatientdata[0].ImageUrl !== null) {
      //   this.patientprofileimage = 'data:image/jpeg;base64,' + this.getPatientdata[0].ImageUrl;
      //     }
      //   this.getAllMessages(this.getPatientdata[0].PhoneNumber , this.providerPhoneno);

      // }
    });
  }
  //  checkdiv(listofpatients,index){
  //    console.log(listofpatients);
  //    for(let i=0;i<this.getPatientdata.length;i++){
  // if(this.getPatientdata[i].PhoneNumber===listofpatients.PhoneNumber){
  //  // alert(JSON.stringify(this.getPatientdata[i].PhoneNumber)+','+listofpatients.PhoneNumber);
  //   // this.checked=true;
  //   if(this.checksts===true){
  //   this.checkedb.checked=true;
  //   this.checksts=false;
  //   }
  //   else{
  //     this.checkedb.checked=true;
  //     this.checksts=true;
  //   }
  // }
  //    }

  //  }
  getpatientinfo(event, list, i) {
    this.addnewsts = false;
    this.queryString = '';
    this.getSMS = [];
    this.providerPhoneno = '';
    this.providercount = i;
    this.patientcount = 0;
    this.providermessage = [];
    this.mulitchatmessage = [];
    this.count = [];
    this.chatmodel = new ChatModel();
    this.groupName = list.Name;
    this.providerPhoneno = list.Number;
    this.gteAllPatientInfo(this.providerPhoneno);
  }
  pushPhoneNumbers(event, slectList, index) {
    this.mulitchatmessage = [];
    this.providermessage = [];
    this.patientprofileimage = '';
    //  console.log(slectList.ImageUrl);
    this.patientcount = index;
    this.chatmodel.FromNumber = this.providerPhoneno;
    if (event.target.checked) {
      //  alert('displayarray');
      if (slectList.ImageUrl === '') {
        this.patientprofileimage = '';
      } else if (slectList.ImageUrl !== null) {
        this.patientprofileimage = slectList.ImageUrl;
      }
      if (slectList.PatientType === 'G') {
      //  alert(JSON.stringify(slectList.GroupMembers));
        this.splitarray = slectList.GroupMembers.split(',');
        for (let i = 0; i <= this.splitarray.length - 1; i++) {
          this.count.push({
            name: slectList.PatientName,
            phone: this.splitarray[i],
            image: this.patientprofileimage
          });
          this.chatmodel.ToNumbers.push(this.splitarray[i]);
          for (let j = 0; j <= this.getPatientdata.length - 1; j++) {
            if (this.getPatientdata[j].PatientName === slectList.PatientName) {
              this.getPatientdata[j].IsSelected = true;
            }
          }
        }
        console.log(this.count);
      } else {
      this.count.push({
        name: slectList.PatientName,
        phone: slectList.PhoneNumber,
        image: this.patientprofileimage
      });
      this.chatmodel.ToNumbers.push(slectList.PhoneNumber);
      for (let i = 0; i <= this.getPatientdata.length - 1; i++) {
        if (this.getPatientdata[i].PhoneNumber === slectList.PhoneNumber) {
          this.getPatientdata[i].IsSelected = true;
        }
      }
    }
      // this.getSMS = slectList.Messages;
      // alert(this.patientmessage);
      if (this.count.length === 1) {
        this.getAllMessages(slectList.PhoneNumber, this.providerPhoneno);
      }
    } else {
      if (this.count.length === 1) {
        this.getSMS = [];
      }
      for (let i = 0; i < this.chatmodel.ToNumbers.length; i++) {
        if (slectList.PhoneNumber === this.chatmodel.ToNumbers[i]) {
          // alert(slectList.PhoneNumber +','+this.chatmodel.ToNumbers[i]);
          this.chatmodel.ToNumbers.splice(i, 1);
        }
      }
      for (let i = 0; i <= this.count.length - 1; i++) {
           // console.log(this.count[i].phone + ',' + JSON.stringify(this.count[i]) + ',' + slectList.PhoneNumber);
        if (this.count[i].phone === slectList.PhoneNumber) {
          this.count.splice(i, 1);
        }
        if (this.count.length === 1) {
          this.patientprofileimage = this.count[0].image;
          this.getAllMessages(this.count[0].phone, this.providerPhoneno);
        }
      }
      for (let j = 0; j <= this.count.length - 1; j++) {
      for (let k = 0; k <= this.splitarray.length - 1; k++) {
       // console.log(this.count[j].phone + ',' + JSON.stringify(this.count[j]) + ',' + this.splitarray[k]);
        if (this.count[j].phone === this.splitarray[k]) {
         // console.log(this.count[j].phone  + ',' + this.splitarray[k]);
          this.count.splice(j, 1);
        }
      }
    }
    for (let p = 0; p <= this.chatmodel.ToNumbers.length - 1; p++) {
      for (let q = 0; q <= this.splitarray.length - 1; q++) {
       // console.log(this.count[j].phone + ',' + JSON.stringify(this.count[j]) + ',' + this.splitarray[k]);
        if (this.chatmodel.ToNumbers[p] === this.splitarray[q]) {
         // console.log(this.count[j].phone  + ',' + this.splitarray[k]);
          this.chatmodel.ToNumbers.splice(p, 1);
        }
      }
    }
      // if (this.count.length < 4) {
      //   this.more = true;
      // }
    }
    //  console.log(this.chatmodel);
  }
  sendSMS() {
    if (this.chatmodel.Body !== '') {
      if (this.count.length === 1) {
        // alert(this.count.length + ',' + this.chatmodel.Body);
        this.providermessage.push(this.chatmodel.Body);
        this.scrollRef.scrollYTo(200 * this.getSMS.length);
        //    console.log(this.providermessage);
      } else {
        this.mulitchatmessage.push(this.chatmodel.Body);
      }
         console.log(this.chatmodel);
      this._chatService.postMessage(this.chatmodel).subscribe(res => {
        //     console.log((JSON.stringify(res)));
        if (res.Success) {
          this.chatmodel.Body = '';
          //  this.chatmodel = new ChatModel();
          // this.getOrganiZationData().add(() => {
          // });
        }
      });
    } else {
      this.error('message should not be blank', 'error');
     }
  }
  submitcsv() {
    const finalTemplate = this.Template.replace(
      'data:application/vnd.ms-excel;base64,',
      ''
    );
    let csvpostobject = {
      GroupName: this.Groupname,
      TemplateUrl: finalTemplate,
      FromNumber: this.providerPhoneno
    };
    console.log(csvpostobject);
    this._chatService.postcsvdata(csvpostobject).subscribe(res => {
       console.log(res);
      if (res.Success) {
    this.success('Group Created Successfully', '');
    this.gteAllPatientInfo(this.providerPhoneno);
      } else {
        this.error(res.data, '');
      }
    });
  }
  /** Add,Edit,delete Referral methods end */
  /** Toast messages for success and failure */
  success(successmsg, type) {
    this.toastr
      .success(successmsg, null, {
        dismiss: 'controlled',
        showCloseButton: true,
        positionClass: 'toast-bottom-right',
        newestOnTop: true,
        progressBar: false,
        showEasing: 'swing',
        closeButton: false,
        preventDuplicates: false,
        debug: false,
        hideEasing: 'linear',
        showMethod: 'fadeIn',
        hideMethod: 'fadeOut'
      })
      .then((toast: Toast) => {
        setTimeout(() => {
          this.toastr.dismissToast(toast);
          if (type === 'add') {
          }
          if (type === 'update') {
          }
          this.getOrganiZationData().add(() => {});
        }, 2000);
        this.addnewnumber.hide();
        //  jQuery('#addnewnumber').modal('hide');
      });
  }
  error(errormsg, type) {
    this.toastr
      .error(errormsg, null, {
        dismiss: 'controlled',
        showCloseButton: true,
        positionClass: 'toast-bottom-right',
        newestOnTop: true,
        progressBar: false,
        showEasing: 'swing',
        closeButton: false,
        preventDuplicates: false,
        debug: false,
        hideEasing: 'linear',
        showMethod: 'fadeIn',
        hideMethod: 'fadeOut'
      })
      .then((toast: Toast) => {
        setTimeout(() => {
          this.toastr.dismissToast(toast);
        }, 2000);
      });
  }
}
