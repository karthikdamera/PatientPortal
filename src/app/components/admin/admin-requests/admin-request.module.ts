
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { AdminSharedModule } from '../../../shared/admin-shared.module';
import { AdminRequestsComponent } from './admin-requests.component';
import { AdminRequestRoutingModule } from './admin-request.route';
import { NgxPaginationModule } from 'ngx-pagination';
import { TabsModule } from '../../../shared/components/ngx-tabset-component/ngx-tabset';
import { adminrequestSearchPipe } from './adminrequestpipe';
import { MedicalRecordPipe } from './medicalRecordPipe';

@NgModule({
  imports: [
    AdminSharedModule,
    AdminRequestRoutingModule,
    NgxPaginationModule,
    TabsModule.forChild()
  ],
  declarations: [AdminRequestsComponent,
    adminrequestSearchPipe,
    MedicalRecordPipe ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA , NO_ERRORS_SCHEMA]
})
export class AdminRequestLevelModule { }
