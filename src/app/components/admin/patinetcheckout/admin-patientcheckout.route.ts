

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PatinetcheckoutComponent } from './patinetcheckout.component';

const routes: Routes = [
  {
    path: '',
    component: PatinetcheckoutComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class AdminPatientcheckoutRoutingModule { }
