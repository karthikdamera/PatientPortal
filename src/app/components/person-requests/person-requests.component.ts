import { Component, OnInit } from '@angular/core';
import { PersonRequestsService } from './../person/requests/requests.service';
import { PersonRequestService } from './person-requests.service';
@Component({
  selector: 'app-person-requests',
  templateUrl: './person-requests.component.html',
  styleUrls: ['./person-requests.component.scss'],
  providers: [PersonRequestsService, PersonRequestService]
})
export class PersonRequestsComponent implements OnInit {

  Guid: any;
  constructor(private _PersonRequestsService: PersonRequestsService, private SchedulerService: PersonRequestService) { }

  ngOnInit() {
   // this.getslotsbyguid();
  }

  // getslotsbyguid() {
  //   this._PersonRequestsService.getslotsbyguid()
  //     .subscribe(res => {
  //       this.Guid = res;
  //      console.log(JSON.stringify((this.Guid)));
  //     });
  // }
  }
