
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { AdminSharedModule } from '../../../shared/admin-shared.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { AdminPatientcheckinRoutingModule } from './admin-patientcheckin.route';
import { PatientcheckinComponent } from './patientcheckin.component';
import { PatientCheckinPipe } from './PatientCheckinPipe';
@NgModule({
  imports: [
    AdminSharedModule,
    AdminPatientcheckinRoutingModule,
    NgxPaginationModule,
  ],
  declarations: [
      PatientcheckinComponent,
    PatientCheckinPipe,
  ]
})
export class AdminPatientcheckinLevelModule { }
