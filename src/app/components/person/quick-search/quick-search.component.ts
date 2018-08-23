import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-quick-search',
  templateUrl: './quick-search.component.html',
  styleUrls: ['./quick-search.component.scss']
})
export class QuickSearchComponent implements OnInit {
  menu: any;
  searchResult: any;
  query: string;
  constructor(private activatedRoute: ActivatedRoute, private route: Router) {
    this.menu =
      [
        {
          'name': 'Pharmacy',
          'icon': 'fa fa-hospital-o',
          'title': 'Pharmacy',
          'routername': 'pharmacy'
        },
        {
          'name': 'Referral',
          'icon': 'fa fa-user-o',
          'title': 'Referral',
          'routername': 'referal'
        },
        {
          'name': 'Schedule',
          'icon': 'fa fa-calendar-check-o',
          'title': 'Schedule',
          'routername': 'schedulerlogin'
        },
        {
          'name': 'My Appointments',
          'icon': 'fa fa-stethoscope',
          'title': 'My Appointments',
          'routername': 'my-appointments'
        },
        {
          'name': 'Payment',
          'icon': 'fa fa-credit-card-alt',
          'title': 'Credit Card',
          'routername': 'payment'
        },
        {
          'name': 'Questionnaire',
          'icon': 'fa fa-book',
          'title': 'Questionnaire',
          'routername': 'assessments'
        },
        {
          'name': 'Insurance',
          'icon': 'fa fa-heartbeat',
          'title': 'Insurance',
          'routername': 'insurance'
        },
        {
          'name': 'Subscriber Info',
          'icon': 'fa fa-info-circle',
          'title': 'Subscriber',
          'routername': 'subscriber'
        },
        {
          'name': 'My Profile',
          'icon': 'fa fa-user',
          'title': 'profile-settings',
          'routername': 'profile-settings'
        },
        {
          'name': 'Request for Refill',
          'icon': 'fa fa-envelope',
          'title': 'Requests',
          'routername': 'requestrefills'
      },
      {
        'name': 'Test results',
        'icon': 'fa fa-envelope',
        'title': 'Requests',
        'routername': 'testresults'
      },
      {
        'name': 'Billing Questions',
        'icon': 'fa fa-envelope',
        'title': 'Requests',
        'routername': 'billingquestions'
      },
      {
        'name': 'Request information',
        'icon': 'fa fa-envelope',
        'title': 'Requests',
        'routername': 'requestinfo'
      },
      {
        'name': 'Request records',
        'icon': 'fa fa-envelope',
        'title': 'Requests',
        'routername': 'requestrecords'
      },
      {
        'name': 'Ask a question',
        'icon': 'fa fa-envelope',
        'title': 'Requests',
        'routername': 'asksquestion'
      }
      ];

    this.activatedRoute.queryParams.subscribe(params => {
      this.query = params['id'];
      this.searchResult = this.menu.filter(menu => menu.name.toLowerCase().indexOf(this.query) >= 0);
    //  console.log(this.searchResult);
    });
  }

  ngOnInit() {
  }
  redirect(url) {
    this.route.navigate(['./person/' + url]);
  }
}
