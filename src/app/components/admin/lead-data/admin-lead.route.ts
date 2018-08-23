

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LeadDataComponent } from './lead-data.component';

const routes: Routes = [
  {
    path: '',
    component: LeadDataComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class AdminLeadRoutingModule { }
