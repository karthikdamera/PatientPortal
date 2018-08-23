
import { AuthGuard } from '../../../auth/auth.guard';
import { Routes, RouterModule } from '@angular/router';
import { AdminSettingsComponent } from './admin-settings.component';
import { OrgSettingsComponent } from './org-settings/org-settings.component';
// import { IntegrationSettingsComponent } from './integration-settings/integration-settings.component';
export const routes: Routes = [
     {
        path: '', component: AdminSettingsComponent,
     children: [
         
        { path: '', redirectTo: 'org-settings', pathMatch: 'full' },
        { path: 'org-setting', component: OrgSettingsComponent },
       // { path: 'integration-setting', component: IntegrationSettingsComponent },
    ]
}

];

export const AdminSettingsRouting = RouterModule.forChild(routes);