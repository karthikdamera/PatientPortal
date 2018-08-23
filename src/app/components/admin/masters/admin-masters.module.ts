
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { AdminSharedModule } from '../../../shared/admin-shared.module';

import { NgxPaginationModule } from 'ngx-pagination';
import { TabsModule } from '../../../shared/components/ngx-tabset-component/ngx-tabset';
import { MastersComponent } from './masters.component';
import { AdminMastersRoutingModule } from './admin-master.route';
import { StaffComponent } from '../staff/staff.component';
import { DesignationComponent } from '../designation/designation.component';
import { LocationComponent } from '../location/location.component';
import { StaffPipe } from '../staff/staffPipe';
import { DesignationPipe } from '../designation/designationPipe';
import { LocationPipe } from '../location/locationPipe';
import { ServiceTypeComponent } from '../service-type/service-type.component';
import { OrderModule } from 'ngx-order-pipe';
@NgModule({
  imports: [
    AdminSharedModule,
    AdminMastersRoutingModule,
    NgxPaginationModule,
    OrderModule,
    TabsModule.forChild()
  ],
  declarations: [MastersComponent,
    StaffComponent,
    DesignationComponent,
    LocationComponent,
    ServiceTypeComponent,
    StaffPipe,
    DesignationPipe,
    LocationPipe],
  schemas: [CUSTOM_ELEMENTS_SCHEMA , NO_ERRORS_SCHEMA]
})
export class AdminMastersLevelModule { }
