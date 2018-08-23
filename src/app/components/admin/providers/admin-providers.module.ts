
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { AdminSharedModule } from '../../../shared/admin-shared.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { AdminProvidersRoutingModule } from './admin-providers.route';
import { ProvidersComponent } from './providers.component';
import { ProviderSlotDetailsComponent } from '../provider-slot-details/provider-slot-details.component';
import { SubmitSlotAvailabilityComponent } from './submit-slot-availability/submit-slot-availability.component';
import { ProviderPipe } from './providerPipe';
import { OrderModule } from 'ngx-order-pipe';
@NgModule({
  imports: [
    AdminSharedModule,
    AdminProvidersRoutingModule,
    NgxPaginationModule,
    OrderModule
  ],
  declarations: [ProvidersComponent,
    ProviderSlotDetailsComponent,
    SubmitSlotAvailabilityComponent,
    ProviderPipe]
})
export class AdminProvidersLevelModule { }
