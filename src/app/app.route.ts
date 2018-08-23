import { Routes, RouterModule } from '@angular/router';
import { NotfoundComponent } from './auth/notfound/notfound.component';
import { LoaderComponent } from './shared/loader/loader.component';
import { AuthGuard } from './auth/auth.guard';

export const routes: Routes = [

    // Without lazy loading
    // { path: '', redirectTo: 'scheduler', pathMatch: 'full' },
    // {path: 'notfound', component: NotfoundComponent},
    //  { path: 'loginandsignup', component: AuthComponent },
    //  { path: 'scheduler', component: SchedulerComponent },
    //  { path: 'loader', component: LoaderComponent },
    //  {path: '**', redirectTo: 'notfound'},



    // Lazy loading
    { path: '', redirectTo: 'scheduler', pathMatch: 'full' },
    { path: 'notfound', component: NotfoundComponent },
    { path: 'scheduler', loadChildren: 'app/components/person/scheduler/scheduler.module#SchedulerModule' },
    { path: 'person', loadChildren: 'app/components/person/person.module#PersonModule' },
    { path: 'provider-profile', loadChildren: 'app/components/provider-profile/provider-profile.module#ProviderProfileModule' },
    { path: 'admin', loadChildren: './components/admin/admin.module#AdminModule'},
    { path: 'personrequest', loadChildren: 'app/components/person-requests/person-requests.module#PersonRequestModule' },
    { path: 'kiosk', loadChildren: 'app/components/kiosk/kiosk.module#KioskModule' },
    { path: 'campaign-attendee/:id', loadChildren: 'app/components/campaign-attendee/campaign-attendee.module#CampaignAttendeeModule' },
    { path: 'loader', component: LoaderComponent },
    { path: '**', redirectTo: 'notfound' },

];

export const routing = RouterModule.forRoot(routes);
