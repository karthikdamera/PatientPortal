import { CampaignAttendeeComponent } from './campaign-attendee.component';

import { AuthGuard } from './../../auth/auth.guard';
import { Routes, RouterModule } from '@angular/router';
import { FormscontrolComponent } from '../formscontrol/formscontrol.component';
export const routes: Routes = [
    { path: '', component: CampaignAttendeeComponent }

];

export const CampaignAttendeeRouting = RouterModule.forChild(routes);
