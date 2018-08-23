import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute, Params } from '@angular/router';
import { Title } from '@angular/platform-browser';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import { AuthService } from './auth/auth.service';
import { TenantResponse } from './models/tenant.model';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'app';
  private tenant = 'TenantData';
  constructor(private authService: AuthService, private activatedRoute: ActivatedRoute) {
    if (window.location.pathname === '/scheduler') {
      localStorage.clear();
      // localStorage.setItem('IsRegular', 'true');
    }
  }
  ngOnInit() {
    this.GetTenantSettings();
  }
  GetTenantSettings() {
   // alert();
    let tenantData: TenantResponse;
    // let ImagesUrl;
    // let Domain;
    tenantData = new TenantResponse();
    const loacalData = JSON.parse(localStorage.getItem(this.tenant)) as TenantResponse;
    // let domainfromstorage = localStorage.getItem('Domaindata');
    if ((loacalData != undefined) && (window.location.hostname === loacalData.Domain)) {
      // if (loacalData != undefined) {
      tenantData = loacalData; // JSON.parse(loacalData) as TenantResponse;
    } else {
      // get tenant data from server
      this.authService.TenantDetails().subscribe(res => {
         console.log(res.data);
        if (res.Success) {
        tenantData.OrganisationSettings = res.data.OrgSettings;
        tenantData.SliderSettings = res.data.SliderSettings;
        tenantData.ImagesUrl = res.data.ImagesUrl;
        tenantData.Domain = res.data.Domain;
        // console.log(window.location.hostname);
        // setTimeout(() => {
        localStorage.setItem(this.tenant, JSON.stringify(tenantData));
        // localStorage.setItem('imgurl', ImagesUrl);
        // localStorage.setItem('Domaindata', Domain);
        // }, 2000);
        } else {
          tenantData = new TenantResponse();
        }
      });
      // console.log(tenantData);
    }
  }


}
