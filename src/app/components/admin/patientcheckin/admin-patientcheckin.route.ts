

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PatientcheckinComponent } from './patientcheckin.component';





const routes: Routes = [
  {
    path: '',
    component: PatientcheckinComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class AdminPatientcheckinRoutingModule { }
