import { ProviderProfileComponent } from '../provider-profile/provider-profile.component';
import { AuthGuard } from './../../auth/auth.guard';
import { Routes, RouterModule } from '@angular/router';
import { FormscontrolComponent } from '../formscontrol/formscontrol.component';
export const routes: Routes = [
    { path: '', component: ProviderProfileComponent }

];

export const ProviderProfileRouting = RouterModule.forChild(routes);
