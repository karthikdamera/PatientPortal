
import { Component, OnInit } from '@angular/core';
// import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { journalEntriesService } from './journal-entries.service';
@Component({
  selector: 'app-journal-entries',
  templateUrl: './journal-entries.component.html',
  styleUrls: ['./journal-entries.component.scss'],
  providers: [journalEntriesService]
})
export class JournalEntriesComponent implements OnInit {
  clientData: any;
  journalEntries: any = [];
  clientid: number;
  user: any;
  closeResult;
  userFilter: any = { Subject: '' };
  showLoader: boolean;
  onViewJournal: any = {};
  constructor(  private _service: journalEntriesService) { }
  ngOnInit() {
    this.getJournalEntries();
  }
  // <---------angular popup fof custom assessment------>
  // open(content) {
  //   this.modalService.open(content).result.then((result) => {
  //     this.closeResult = `Closed with: ${result}`;
  //   }, (reason) => {
  //     this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
  //   });
  // }
  // private getDismissReason(reason: any): string {
  //   if (reason === ModalDismissReasons.ESC) {
  //     return 'by pressing ESC';
  //   } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
  //     return 'by clicking on a backdrop';
  //   } else {
  //     return `with: ${reason}`;
  //   }
  // }
  getJournalEntries() {
    // this.showLoader =true;
    this.clientid = 531;
    return this._service.getJournalEntries(this.clientid)
      .subscribe(arg => {
        this.journalEntries = arg.data;
        // console.log("get journalEntries" + (JSON.stringify(this.journalEntries = arg)))
        // this.showLoader =false;
      });
  }
  viewJournal(value) {
    this.onViewJournal = value;
  }
}
