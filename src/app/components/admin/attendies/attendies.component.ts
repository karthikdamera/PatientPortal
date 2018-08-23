import { Router } from '@angular/router';
import { AttendiesService } from './attendies.service';
import { Component, OnInit } from '@angular/core';
import { AttendiesPipe } from './attendiesPipe';
@Component({
  moduleId: module.id,
  selector: 'app-attendies',
  templateUrl: './attendies.component.html',
  styleUrls: ['./attendies.component.scss'],
  providers: [AttendiesService]
})
export class AttendiesComponent implements OnInit {
    userFilter: string;
  page: number = 1;
  order: string ;
  reverse: boolean = false;
  attendieData: any = [];
  attendeeUrl: string;
  constructor(private _attendiesService: AttendiesService, private router: Router) {
      this.attendeeUrl = localStorage.getItem('attendeeUrl');
  }
  // on page load get call
  ngOnInit() {
      this.getcampaigndata();
  }
  addAttendee() {
    //  alert(this.attendeeUrl);
      localStorage.setItem('adminattendee', 'admin');
      this.router.navigate(['./campaign-attendee', this.attendeeUrl]);
  }
  getcampaigndata() {
      const id = localStorage.getItem('attendieId');
      return this._attendiesService.getAttendiesbyId(id).subscribe(
          res => {
              this.attendieData = res.data;
              this.order = 'FirstName';
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

}
