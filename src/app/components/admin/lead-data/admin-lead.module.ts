
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { AdminSharedModule } from '../../../shared/admin-shared.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { AdminLeadRoutingModule } from './admin-lead.route';
import { LeadDataComponent } from './lead-data.component';
import { LeadDataPipe } from './leaddataPipe';
@NgModule({
  imports: [
    AdminSharedModule,
    AdminLeadRoutingModule,
    NgxPaginationModule,
  ],
  declarations: [
    LeadDataComponent,
    LeadDataPipe
  ]
})
export class AdminLeadLevelModule { }
