

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProvidersComponent } from './providers.component';
import { ProviderSlotDetailsComponent } from '../provider-slot-details/provider-slot-details.component';
import { SubmitSlotAvailabilityComponent } from './submit-slot-availability/submit-slot-availability.component';



const routes: Routes = [
  {
    path: '',
    component: ProvidersComponent
  },
  {
    path: 'providerslotdetails',
    component: ProviderSlotDetailsComponent
  },
  {
    path: 'slotsAvailability',
    component: SubmitSlotAvailabilityComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class AdminProvidersRoutingModule { }
