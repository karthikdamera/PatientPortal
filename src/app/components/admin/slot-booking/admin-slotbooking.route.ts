
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SlotBookingComponent } from './slot-booking.component';



const routes: Routes = [
  {
    path: '',
    component: SlotBookingComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class AdminSlotbookingRoutingModule { }
