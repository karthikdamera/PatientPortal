import { PatientListPipe } from './patientlistPipe';
import { Router, NavigationExtras } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { PatientCard } from './../../../../models/PatientCard.model';
import { PatientDetailsService } from './../patient-details.service';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.scss'],
  providers: [PatientDetailsService]
})
export class PatientListComponent implements OnInit {
  userFilter: string;
  ListData: any = [];
  public selected = [];
  patientcarddata: PatientCard;
  patientid: number;
  name: string;
  parentData: Subject<number> = new Subject();
  profileimage: string;
  dataCheck: boolean;
  order: string ;
 reverse: boolean = false;
  isVippatient: String;
  email: string = '';
  public age: number;
  constructor(private patientdetailsService: PatientDetailsService, private router: Router) {
    this.profileimage = '';
    this.dataCheck = false;
    this.patientcarddata = new PatientCard();
    this.isVippatient = '';
  }

  ngOnInit() {
    this.getPatientList();
  }
  getPatientList() {
    this.patientdetailsService.getpatientlist().subscribe(
      res => {
        this.ListData = res.data;
        this.order = 'FirstName';
      //  console.log(JSON.stringify(this.ListData));
      });
  }
  filter() { }
  PatientCard(id) {
    //  alert();
    let navigation: NavigationExtras = {
      queryParams: {
        'personid': id,
      }
      , skipLocationChange: true
    };
    this.router.navigate(['./admin/patientlist/patientdetails'], navigation);
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
