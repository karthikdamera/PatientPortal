
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AdminRequestsComponent } from './admin-requests.component';


const routes: Routes = [
  {
    path: '',
    component: AdminRequestsComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class AdminRequestRoutingModule { }
