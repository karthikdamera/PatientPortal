
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MedicationsComponent } from './medications.component';




const routes: Routes = [
  {
    path: '',
    component: MedicationsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class AdminMedicationsRoutingModule { }
