import { PersonalInfo } from './../../models/person-slot.model';
import { ProfileSettingsService } from './profile-settings/profile-settings.service';
import { Component, OnInit, HostListener } from '@angular/core';
import { Router, ActivatedRoute, NavigationExtras } from '@angular/router';
import { PersonService } from './person.service';
import { TenantResponse } from '../../models/tenant.model';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.scss'],
  providers: [ProfileSettingsService, PersonService]
})
export class PersonComponent implements OnInit {
  profileimage: string;
  menu: any;
  counter: number;
  searchResult: any;
  query: string;
  imageshow: boolean;
  adminlogindata: any;
  profileInfo: PersonalInfo;
  collapseMenu: boolean;
  responsivemenu: boolean;
  HideMenu: boolean;
  tenantData: TenantResponse;
  authToken: any;
  name: string;
  patientData: any = {};
  menuName: any = [];
  quickSearchQuery: string;
  windowWidth: number = window.innerWidth;
  navWindowWidth: number;
  showdiv: boolean = true;
  constructor(private _personservice: PersonService,
    private _profileSettingsService: ProfileSettingsService, private activatedRoute: ActivatedRoute, private route: Router) {
    this.adminlogindata = JSON.parse(localStorage.getItem('loginData'));
    this.profileInfo = new PersonalInfo();
    this.collapseMenu = false;
    this.tenantData = new TenantResponse();
    this.quickSearchQuery = '';
    this.showdiv = false;
    this.HideMenu = false;
    this.responsivemenu = false;
    this.counter = 0;
    this.navWindowWidth = 992;
    this.collapseMenu = (this.windowWidth < this.navWindowWidth);
    localStorage.setItem('windowWidth', this.windowWidth.toString());
    localStorage.setItem('navWindowWidth', this.navWindowWidth.toString());
    setTimeout(() => {
      const tenantData = localStorage.getItem('TenantData');

      if (tenantData != null) {
        this.tenantData = JSON.parse(tenantData) as TenantResponse;
        //  console.log(this.tenantData);

      }
    }, 3000);


    this.menu =
      [
        {
          'name': 'Dashboard',
          'title': 'Dashboard',
          'routername': 'dashboard'
        },
        {
          'name': 'Pharmacy',
          'icon': 'fa fa-hospital-o',
          'title': 'Pharmacy',
          'routername': 'pharmacy'
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
    this.Popupopenclose('close');
  }
  ngOnInit() {
    this.getProfile();
    this.getMenu();
  }
  show(){
   // alert()
    this.showdiv = !this.showdiv;
  }
  Popupopenclose(status) {
   // console.log(status);
      if (status === 'open') {
        this.HideMenu = true;
        } else {
          this.HideMenu = false;
        }
  }
  getProfile() {
    this._profileSettingsService.getProfile(this.adminlogindata.Id).subscribe(
      res => {
        //   console.log('profile info' + (JSON.stringify(this.profileInfo = res.data)));
        this.profileInfo = res.data;
        this.profileimage = this.profileInfo.ImageUrl;
        //  console.log(this.profileimage);
        this.profileimage += '?random+\=' + Math.random();
        if (this.profileimage === '') {
          this.profileimage += '?random+\=' + Math.random();
          this.imageshow = true;
          //   console.log(this.profileimage);
          // console.log("profiles data  "+this.profileimage);
        } else {
          this.imageshow = false;
        }
      }

    );

  }
  getMenu() {
    return this._personservice.getMenu()
      .subscribe(res => {
        this.menuName = res;
        // console.log(JSON.stringify((this.menuName)));
      });
  }

  profile() {
    this.route.navigate(['/person/profile-settings']);
  }
  pharmacy() {
    this.route.navigate(['/person/pharmacy']);
  }
  dashboard() {
    this.route.navigate(['/person/dashboard']);
  }
  payment() {
    this.route.navigate(['/person/payment']);
  }
  insurance() {
    this.route.navigate(['/person/insurance']);
  }
  subscriber() {
    this.route.navigate(['/person/subscriber']);
  }
  myappointment() {
    this.route.navigate(['./person/my-appointments']);
  }
  questionnaire() {
    this.route.navigate(['./person/assessments']);
  }
  schedule() {
    this.route.navigate(['./person/schedulerlogin']);
  }
  collapse() {
    this.collapseMenu = !this.collapseMenu;
  }
  logout() {
    // alert();
    localStorage.clear();
    // alert(JSON.stringify(this.tenantData));
    // localStorage.setItem('TenantData', JSON.stringify(this.tenantData));
    window.location.href = '/scheduler';
  }
  //quickSearch() {
  // if (this.quickSearchQuery.trim() !== '') {
  //   this.route.navigate(['./person/quick-search'], { queryParams: { id: this.quickSearchQuery }, skipLocationChange: true });
  // }


  // }
  // setMsg(value) {
  //   this.quickSearchQuery = value;
  // }

  scheduleAppointment() {
    this.counter +=1;
    let navigation: NavigationExtras = {
      queryParams: {
        'counter': this.counter
      },
      skipLocationChange: true
    };
    this.route.navigate(['/person/schedulerlogin'],navigation);
  }

  redirect(url) {
    // this.route.navigate(['./person/' + url]);
  }
  filteredMenu: any = [];
  searchKey: string;
  quickSearch() {
    this.filteredMenu = [];
    this.query = '';
    // return this._appoinmentservice.getLocationtype().subscribe(res => {

    // this.items2 = res.data;
    this.filteredMenu = this.menu.filter((el: any) => {
      return el; // .FirstName.toLowerCase().indexOf(this.query.toLowerCase()) > -1;
      // });
      // });

    });
  }
  ngAfterViewInit() {
    this.windowWidth = window.innerWidth;
  }
  @HostListener('window:resize', ['$event'])
  resize(event) {
    this.windowWidth = window.innerWidth;
    this.collapseMenu = (this.windowWidth < this.navWindowWidth);
    localStorage.setItem('windowWidth', this.windowWidth.toString());
    localStorage.setItem('navWindowWidth', this.navWindowWidth.toString());
   // console.log( this.windowWidth + ',' + this.navWindowWidth);
  }
  @HostListener('document:click', ['$event'])
  handleClick(event) {
    // alert(event.target.id);
    const clickedComponent = event.target.tagName;
    if (event.target.id !== 'menu') {
      this.filteredMenu = [];
    }
    // let clickedComponent = event.target;
    // let inside = false;
    // console.log(clickedComponent);
    // console.log(this.elementRef.nativeElement);
    // do {
    //     if (clickedComponent === this.elementRef.nativeElement) {
    //         inside = true;
    //     }
    //    clickedComponent = clickedComponent.parentNode;
    // } while (clickedComponent);
    //  if (!inside) {
    //      this.filteredList2 = [];
    //  }
  }
}