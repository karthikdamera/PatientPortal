
import { NgModule } from '@angular/core';
import { AdminDashboardRoutingModule } from './admin-dashboard.route';
import { AdminDashboardComponent } from './admin-dashboard.component';
import { AdminSharedModule } from '../../../shared/admin-shared.module';


@NgModule({
  imports: [
    AdminSharedModule,
    AdminDashboardRoutingModule
  ],
  declarations: [AdminDashboardComponent]
})
export class AdminDashboardLevelModule { }