import { providerdata } from './../../../models/person-slot.model';
import { ProfileSettingsService } from './../profile-settings/profile-settings.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PersonalInfo } from '../../../models/person-slot.model';
import { AuthService } from '../../../auth/auth.service';
declare var $: any;
import { PersonComponent } from '../person.component';
@Component({
  selector: 'app-person-dashboard',
  templateUrl: './person-dashboard.component.html',
  styleUrls: ['./person-dashboard.component.scss'],
  providers: [ProfileSettingsService, AuthService]
})

export class PersonDashboardComponent implements OnInit {
  profileimage: string;
  imageshow: boolean;
  adminlogindata: any;
  profileInfo: PersonalInfo;
  ProviderInfo: providerdata;
  ProviderInfo1: any = [];
  constructor(private route: Router , private _profileSettingsService: ProfileSettingsService, private authService: AuthService,
  private _personcomponent: PersonComponent) {
    this.adminlogindata = JSON.parse(localStorage.getItem('loginData'));
    this.profileInfo = new PersonalInfo();
    this.ProviderInfo = new providerdata();
    this._personcomponent.Popupopenclose('close');
   }

  ngOnInit() {
    this.getProfile();
    // this.prodata();
  }


  getProfile() {
    this._profileSettingsService.getProfile(this.adminlogindata.Id).subscribe(
        res => {
         //   console.log('profile info' + (JSON.stringify(this.profileInfo = res.data)));
                this.profileInfo = res.data;
              //  console.log(this.profileInfo.Email);
                this.prodata();
              //   this.profileimage = this.profileInfo.ImageUrl;
              // // console.log(this.profileimage);
              //   if (this.profileimage === '') {
              //       this.imageshow = true;
              //   } else {
              //       this.imageshow = false;
              //   }
                }

    );

}

prodata() {
  // alert(this.profileInfo.Email);
  this.authService.LoginDetails(this.profileInfo.Email).subscribe(data => {
    this.ProviderInfo1 = data.data.ProviderData;
    console.log(this.ProviderInfo1);
    this.profileimage = this.ProviderInfo1.ImageUrl;
    // console.log(this.profileimage);
      if (this.profileimage === '') {
          this.imageshow = true;
      } else {
          this.imageshow = false;
      }
  });
}
  sidebar() {
    $('.btn-expand-collapse').click(function (e) {
      $('.navbar-primary').toggleClass('collapsed');
    });

  }
  myappointment() {
    this.route.navigate(['./person/my-appointments']);
  }
  pharmacy() {
    this.route.navigate(['./person/pharmacy']);
  }
  insurance() {
    this.route.navigate(['./person/insurance']);
  }
  creditcard() {
    this.route.navigate(['./person/payment']);
}
requestsRefills() {
  this.route.navigate(['./person/requestrefills']);
}
requestsTestResults() {
  this.route.navigate(['./person/testresults']);
}
requestsBilling() {
  this.route.navigate(['./person/billingquestions']);
}
requestsInfo() {
  this.route.navigate(['./person/requestinfo']);
}
requestsRecords() {
  this.route.navigate(['./person/requestrecords']);
}
Referal() {
  this.route.navigate(['./person/referal']);
}
profile() {
  this.route.navigate(['./person/profile-settings']);
}
requestsAskQuestion() {
  this.route.navigate(['./person/asksquestion']);
}
schedule(){
  this.route.navigate(['./person/schedulerlogin']);
}
  questionnaire() {
    this.route.navigate(['./person/assessments']);
  }
}
