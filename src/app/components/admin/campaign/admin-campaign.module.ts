import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { AdminSharedModule } from '../../../shared/admin-shared.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { AdminCampaignRoutingModule } from './admin-campaign.route';
import { CampaignComponent } from './campaign.component';
import { MailuploadComponent } from '../mailupload/mailupload.component';
import { AttendiesComponent } from '../attendies/attendies.component';
import { ArchwizardModule } from 'ng2-archwizard';
import { ClipboardModule } from 'ngx-clipboard';
import { CampaignPipe } from './campaignPipe';
import { AttendiesPipe } from '../attendies/attendiesPipe';
import { MailuploadPipe } from '../mailupload/mailuploadPipe';
import { OrderModule } from 'ngx-order-pipe';
@NgModule({
  imports: [
    AdminSharedModule,
    AdminCampaignRoutingModule,
    NgxPaginationModule,
    ArchwizardModule,
    ClipboardModule,
    OrderModule
  ],
  declarations: [CampaignComponent,
    MailuploadComponent,
    AttendiesComponent,
    CampaignPipe,
    AttendiesPipe,
    MailuploadPipe]
})
export class AdminCampaignLevelModule { }