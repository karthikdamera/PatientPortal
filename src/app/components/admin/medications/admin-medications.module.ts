
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { AdminSharedModule } from '../../../shared/admin-shared.module';

import { NgxPaginationModule } from 'ngx-pagination';
import { AdminMedicationsRoutingModule } from './admin-medications.route';
import { MedicationsComponent } from './medications.component';
import { MedicationsPipe } from './medicationsPipe';
import { OrderModule } from 'ngx-order-pipe';
@NgModule({
  imports: [
    AdminSharedModule,
    AdminMedicationsRoutingModule,
    NgxPaginationModule,
    OrderModule
  ],
  declarations: [MedicationsComponent,
    MedicationsPipe
],
})
export class AdminMedicationsLevelModule { }
