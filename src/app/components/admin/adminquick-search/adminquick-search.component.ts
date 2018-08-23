import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-adminquick-search',
  templateUrl: './adminquick-search.component.html',
  styleUrls: ['./adminquick-search.component.scss']
})
export class AdminquickSearchComponent implements OnInit {
  adminmenu:any;
  searchResult: any;
  query: string;
  constructor(private activatedRoute: ActivatedRoute, private route: Router) {
    this.adminmenu=[
      {
        'name': 'Dashboard',
        'title': 'Dashboard',
        'routername': 'admindashboard'
      },
      {
        'name': 'Today Appointments',
        'title': 'Today Appointments',
        'routername': 'patientcheckin'
      },
      {
        'name': 'Checkout',
        'title': 'Checkout',
        'routername': 'patientcheckout'
      },
      {
        'name': 'Twilio',
        'title': 'Twilio',
        'routername': 'chats'
      },
      {
        'name': 'Requests',
        'title': 'Requests',
        'routername': 'admin-requests'
      },
      {
        'name': 'Schedule',
        'title': 'Schedule',
        'routername': 'slot-booking'
      },
      {
        'name': 'Patient Card',
        'title': 'Patient Card',
        'routername': 'patientlist'
      },
      {
        'name': 'Campaign',
        'title': 'Campaign',
        'routername': 'campaign'
      },
      {
        'name': 'Medication',
        'title': 'Medication',
        'routername': 'medications'
      },
      {
        'name': 'Masters',
        'title': 'Masters',
        'routername': 'masters'
      },
      {
        'name': 'Provider Settings',
        'title': 'Provider Settings',
        'routername': 'providerssettings'
      },
      
    ];
    this.activatedRoute.queryParams.subscribe(params => {
      this.query = params['id'];
      this.searchResult = this.adminmenu.filter(adminmenu => adminmenu.name.toLowerCase().indexOf(this.query) >= 0);
     // console.log(this.searchResult);
    });
   }

  ngOnInit() {
  }
  redirect(url){
    this.route.navigate(['./admin/' + url]);
  }
}
