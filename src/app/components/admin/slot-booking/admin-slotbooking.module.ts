
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { AdminSharedModule } from '../../../shared/admin-shared.module';
import { AdminSlotbookingRoutingModule } from './admin-slotbooking.route';
import { SlotBookingComponent } from './slot-booking.component';
import { CalendarModule } from 'ap-angular2-fullcalendar';
import { Ng2AutoCompleteModule } from 'ng2-auto-complete';

@NgModule({
  imports: [
    AdminSharedModule,
    AdminSlotbookingRoutingModule,
    CalendarModule,
    Ng2AutoCompleteModule
  ],
  declarations: [SlotBookingComponent]
})
export class AdminSlotbookingLevelModule { }
