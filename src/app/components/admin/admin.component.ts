import { Component, OnInit, HostListener ,NgModule  } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { TenantResponse } from '../../models/tenant.model';
import { adminstaff } from '../../models/person-slot.model';
import { Subscription } from 'rxjs/Subscription';
import { StaffService } from './profile/profile.service';
//  import { FilterPipe } from '../../shared/services/FilterPipe';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
  providers: [StaffService]
})
export class admin implements OnInit {
  collapseMenu: boolean;
  tenantData: TenantResponse;
  profileimage: string;
  adminlogindata: any;
  profileInfo: adminstaff;
  imageshow: boolean;
  windowWidth: number = window.innerWidth;
  navWindowWidth: number;
  quickSearchQuery:string;
  filteredMenu:any=[];
  searchKey:string;
  adminmenu:any;
  searchResult: any;
  query: string;
  userFilter: any = {name: '' };
  subscription: Subscription;
  constructor(private activatedRoute: ActivatedRoute, private route: Router, private _profile: StaffService) {
    this.tenantData = new TenantResponse();
    this.collapseMenu = false;
    this.quickSearchQuery = '';
    this.profileInfo = new adminstaff();
    this.adminlogindata = JSON.parse(localStorage.getItem('loginData'));
    setTimeout(() => {
      const tenantData = localStorage.getItem('TenantData');
      if (tenantData != null) {
        this.tenantData = JSON.parse(tenantData) as TenantResponse;
     //   console.log(this.tenantData);
      }
    }, 3000);
    this.navWindowWidth = 992;
    this.collapseMenu = (this.windowWidth < this.navWindowWidth);
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
        'name': 'Appointments History',
        'title': 'Appointments History',
        'routername': 'appointmenthistory'
      },
      {
        'name': 'Leads Data',
        'title': 'Leads Data',
        'routername': 'leaddata'
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
   //   console.log(this.searchResult);
    });
    this.subscription = this._profile.getimage().subscribe(res => { console.log(res.image); });
  }
  ngAfterViewInit() {
    this.windowWidth = window.innerWidth;
  }

  // if screen size changes it'll update
  @HostListener('window:resize', ['$event'])
  resize(event) {
    this.windowWidth = window.innerWidth;
    this.collapseMenu = (this.windowWidth < this.navWindowWidth);
  }

  ngOnInit() {
    this.getProfile();
  }
  getProfile() {
    this._profile.getadminProfile(this.adminlogindata.Id).subscribe(
      res => {
        //   console.log('profile info' + (JSON.stringify(this.profileInfo = res.data)));
        this.profileInfo = res.data;
        this.profileimage = this.profileInfo.ImageUrl;
     //   console.log(this.profileimage + JSON.stringify(this.profileInfo));
        this.profileimage += '?random+\=' + Math.random();
        if (this.profileimage === '') {
          this.imageshow = true;
          this.profileimage += '?random+\=' + Math.random();
        } else {
          this.imageshow = false;
        }
      }

    );

  }
  toDashboard(){
    this.route.navigate(['./admin/admindashboard']);
  }

  chats() {
    this.route.navigate(['./admin/chats']);
  }
  medication() {
    this.route.navigate(['./admin/medications']);
  }
  toDayAppointments() {
    this.route.navigate(['./admin/patientcheckin']);
  }
  campaign() {
    this.route.navigate(['./admin/campaign']);
  }
  settings() {
    this.route.navigate(['./admin/adminsettings']);
  }
  requests() {
    this.route.navigate(['./admin/admin-requests']);
  }
  Schedule() {
    this.route.navigate(['./admin/slot-booking']);
  }
  staff() {
    this.route.navigate(['./admin/staffsettings']);
  }
  Provider() {
    this.route.navigate(['./admin/providerssettings']);
  }
  Designation() {
    this.route.navigate(['./admin/designationsettings']);
  }
  appointment() {
    this.route.navigate(['./admin/appointmentsettings']);
  }
  myProfile() {
    this.route.navigate(['./admin/profile']);
  }
  PatientCard() {
    this.route.navigate(['./admin/patientdetails']);
  }
  collapse() {
    this.collapseMenu = !this.collapseMenu;
  }
  logout() {

    localStorage.clear();
    // localStorage.setItem('IsRegular', 'true');
    localStorage.setItem('TenantData', JSON.stringify(this.tenantData));
    this.route.navigate(['./admin']);
  }
  // quickSearch() {
  //   if (this.quickSearchQuery.trim() !== '') {
  //     this.route.navigate(['./admin/adminquicksearch'], { queryParams: { id: this.quickSearchQuery }, skipLocationChange: true });
  //   }
  // }
  setMsg(value) {
    this.quickSearchQuery = value;
  }
 
  quickSearch() {
     this.filteredMenu = [];
     this.query = '';
    // return this._appoinmentservice.getLocationtype().subscribe(res => {

      // this.items2 = res.data;
      this.filteredMenu = this.adminmenu.filter((el: any) => {
        return el; // .FirstName.toLowerCase().indexOf(this.query.toLowerCase()) > -1;
      // });
    // });

  });
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
