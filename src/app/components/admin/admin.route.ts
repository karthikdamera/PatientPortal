import { AppointmentHistoryComponent } from './appointment-history/appointment-history.component';
import { ChatLayoutComponent } from './chats/chat-layout/chat-layout.component';
import { ChatsComponent } from './chats/chats.component';
import { ProviderSlotDetailsComponent } from './provider-slot-details/provider-slot-details.component';
import { AppointmentSettingsComponent } from './appointment-settings/appointment-settings.component';
import { DesignationComponent } from './designation/designation.component';
import { ProvidersComponent } from './providers/providers.component';
import { StaffComponent } from './staff/staff.component';
import { Routes, RouterModule } from '@angular/router';
import { admin } from './admin.component';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { MedicationsComponent } from './medications/medications.component';
import { PatientcheckinComponent } from './patientcheckin/patientcheckin.component';
import { CampaignComponent } from './campaign/campaign.component';
import { MailuploadComponent } from './mailupload/mailupload.component';
import { AttendiesComponent } from './attendies/attendies.component';
import { AdminSettingsComponent } from './admin-settings/admin-settings.component';
import { AdminRequestsComponent } from './admin-requests/admin-requests.component';
import { SlotBookingComponent } from './slot-booking/slot-booking.component';
import { AdminProfileComponent } from './profile/profile.component';
import { AuthGuard } from '../../auth/auth.guard';
import { PatientDetailsComponent } from './patient-details/patient-details.component';
import { MastersComponent } from './masters/masters.component';
import { PatinetcheckoutComponent } from './patinetcheckout/patinetcheckout.component';
import { PatientListComponent } from './patient-details/patient-list/patient-list.component';
import { AdminquickSearchComponent } from './adminquick-search/adminquick-search.component';
import { LeadDataComponent } from './lead-data/lead-data.component';
import { SubmitSlotAvailabilityComponent } from './providers/submit-slot-availability/submit-slot-availability.component';
import { NgModule } from '@angular/core';

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    component: AdminLoginComponent
  },
  {
    path: '', component: admin,
    children: [
      {
        path: '',
        children: [
          { path: '', redirectTo: '', pathMatch: 'full' },
          {
            path: 'admindashboard',
            // Loading by relative path didn't seem to work here
            // loadChildren: './deep/deep.module#DeepModule'
            loadChildren: 'app/components/admin/admin-dashboard/admin-dashboard.module#AdminDashboardLevelModule', canActivate: [AuthGuard]
          },
          // { path: 'patientcheckout', component: PatinetcheckoutComponent, canActivate: [AuthGuard] },
          // { path: 'appointmenthistory', component: AppointmentHistoryComponent, canActivate: [AuthGuard] },
          // { path: 'leaddata', component: LeadDataComponent, canActivate: [AuthGuard] },
          {
            path: 'admin-requests',
            loadChildren: 'app/components/admin/admin-requests/admin-request.module#AdminRequestLevelModule', canActivate: [AuthGuard]
          },
          {
            path: 'adminsettings',
            loadChildren: 'app/components/admin/admin-settings/admin-settings.module#AdminSettingsModule', canActivate: [AuthGuard]
          },
          {
            path: 'masters',
            loadChildren: 'app/components/admin/masters/admin-masters.module#AdminMastersLevelModule', canActivate: [AuthGuard]
          },
          {
            path: 'providerssettings',
            loadChildren: 'app/components/admin/providers/admin-providers.module#AdminProvidersLevelModule', canActivate: [AuthGuard]
          },
          {
            path: 'campaign',
            loadChildren: 'app/components/admin/campaign/admin-campaign.module#AdminCampaignLevelModule', canActivate: [AuthGuard]
          },
          {
            path: 'chats',
            loadChildren: 'app/components/admin/chats/admin-chat.module#AdminChatLevelModule', canActivate: [AuthGuard]
          },
          {
            path: 'slot-booking',
            loadChildren: 'app/components/admin/slot-booking/admin-slotbooking.module#AdminSlotbookingLevelModule', canActivate: [AuthGuard]
          },
          {
            path: 'patientlist',
            loadChildren: 'app/components/admin/patient-details/admin-patientdetails.module#AdminPatientdetailsLevelModule',
            canActivate: [AuthGuard]
          },
          {
            path: 'medications',
            loadChildren: 'app/components/admin/medications/admin-medications.module#AdminMedicationsLevelModule',
            canActivate: [AuthGuard]
          },
          {
            path: 'profile',
            loadChildren: 'app/components/admin/profile/admin-profile.module#AdminProfileLevelModule', canActivate: [AuthGuard]
          },
          {
            path: 'patientcheckin',
            loadChildren: 'app/components/admin/patientcheckin/admin-patientcheckin.module#AdminPatientcheckinLevelModule',
            canActivate: [AuthGuard]
          },
          {
            path: 'patientcheckout',
            loadChildren: 'app/components/admin/patinetcheckout/admin-patientcheckout.module#AdminPatientcheckoutLevelModule',
            canActivate: [AuthGuard]
          },
          {
            path: 'appointmenthistory',
            loadChildren: 'app/components/admin/appointment-history/admin-apptmnthistory.module#AdminApptmntHistoryLevelModule',
            canActivate: [AuthGuard]
          },
          {
            path: 'leaddata',
            loadChildren: 'app/components/admin/lead-data/admin-lead.module#AdminLeadLevelModule',
            canActivate: [AuthGuard]
          },
        ]
      }]
  }
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: []
})
export class AdminRouting { }
