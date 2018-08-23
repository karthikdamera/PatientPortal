import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../../auth/auth.guard';
import { SchedulerComponent } from './scheduler.component';
const schedulerRoutes: Routes = [
    { path: '', component: SchedulerComponent },
];
export const schedulerRouting = RouterModule.forChild(schedulerRoutes);
