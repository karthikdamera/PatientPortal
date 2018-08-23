
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { AdminSharedModule } from '../../../shared/admin-shared.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { PatinetcheckoutComponent } from './patinetcheckout.component';
import { AdminPatientcheckoutRoutingModule } from './admin-patientcheckout.route';

@NgModule({
  imports: [
    AdminSharedModule,
    AdminPatientcheckoutRoutingModule,
    NgxPaginationModule,
  ],
  declarations: [
    PatinetcheckoutComponent
  ]
})
export class AdminPatientcheckoutLevelModule { }
