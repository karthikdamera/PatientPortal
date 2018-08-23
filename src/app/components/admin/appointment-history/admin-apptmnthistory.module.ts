
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { AdminSharedModule } from '../../../shared/admin-shared.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { AppointmentHistoryComponent } from './appointment-history.component';
import { AdminApptmntHistoryRoutingModule } from './admin-apptmnthistory.route';
import { AppointmentHistoryPipe } from './appointmenthistoryPipe';

@NgModule({
  imports: [
    AdminSharedModule,
    AdminApptmntHistoryRoutingModule,
    NgxPaginationModule,
  ],
  declarations: [
    AppointmentHistoryComponent,
    AppointmentHistoryPipe
  ]
})
export class AdminApptmntHistoryLevelModule { }
