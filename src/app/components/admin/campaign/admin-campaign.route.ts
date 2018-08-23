

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CampaignComponent } from './campaign.component';
import { MailuploadComponent } from '../mailupload/mailupload.component';
import { AttendiesComponent } from '../attendies/attendies.component';
const routes: Routes = [
  {
    path: '',
    component: CampaignComponent
  },
  {
    path: 'mailupload',
    component: MailuploadComponent
  },
  {
    path: 'attendies',
    component: AttendiesComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class AdminCampaignRoutingModule { }
