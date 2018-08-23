import { AuthGuard } from './../../auth/auth.guard';
import { Routes, RouterModule } from '@angular/router';
import { FormscontrolComponent } from '../formscontrol/formscontrol.component';
import { AppointmentCancelComponent } from './appointment-cancel/appointment-cancel.component';
import { AppointmentChangeComponent } from './appointment-change/appointment-change.component';
import { PersonRequestsComponent } from './person-requests.component';

export const routes: Routes = [
    {
        path: '', component: PersonRequestsComponent,
        children: [

            { path: 'appointmentCancel', component: AppointmentCancelComponent },
            { path: 'appointmentChange', component: AppointmentChangeComponent }

        ]
    }
];

export const appointmentcancelchangeRouting = RouterModule.forChild(routes);
