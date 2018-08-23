
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SharedInAdminModule } from '../../shared/shared-in-adminmodule';
import { admin } from './admin.component';
import { AdminRouting } from './admin.route';
import { AdminLoginComponent } from './admin-login/admin-login.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AuthModule } from './../../auth/auth.module';
import { AdminquickSearchComponent } from './adminquick-search/adminquick-search.component';
import { AdminDashboardLevelModule } from './admin-dashboard/admin-dashboard.module';
import { AdminRequestLevelModule } from './admin-requests/admin-request.module';
import { AdminMastersLevelModule } from './masters/admin-masters.module';
import { AdminProvidersLevelModule } from './providers/admin-providers.module';
import { AdminCampaignLevelModule } from './campaign/admin-campaign.module';
import { AdminChatLevelModule } from './chats/admin-chat.module';
import { AdminSlotbookingLevelModule } from './slot-booking/admin-slotbooking.module';
import { AdminPatientdetailsLevelModule } from './patient-details/admin-patientdetails.module';
import { AdminSettingsModule } from './admin-settings/admin-settings.module';
import { AppointmentSettingsComponent } from './appointment-settings/appointment-settings.component';
import { AdminMedicationsLevelModule } from './medications/admin-medications.module';
import { AdminProfileLevelModule } from './profile/admin-profile.module';
import { AdminPatientcheckinLevelModule } from './patientcheckin/admin-patientcheckin.module';
import { AdminPatientcheckoutLevelModule } from './patinetcheckout/admin-patientcheckout.module';
import { AdminApptmntHistoryLevelModule } from './appointment-history/admin-apptmnthistory.module';
import { AdminLeadLevelModule } from './lead-data/admin-lead.module';

@NgModule({
    declarations: [
        admin,
        AdminLoginComponent,
        AppointmentSettingsComponent,
        AdminquickSearchComponent
    ],
    imports: [
        AdminRouting,
        SharedInAdminModule,
        AdminDashboardLevelModule,
        AdminRequestLevelModule,
        AdminMastersLevelModule,
        AdminProvidersLevelModule,
        AdminCampaignLevelModule,
        AdminChatLevelModule,
        AdminSlotbookingLevelModule,
        AdminPatientdetailsLevelModule,
        AdminPatientcheckinLevelModule,
        AdminPatientcheckoutLevelModule,
        AdminApptmntHistoryLevelModule,
        AdminLeadLevelModule,
        AdminMedicationsLevelModule,
        AdminSettingsModule,
        AdminProfileLevelModule,
        AuthModule,
    ],
    exports: [
        admin
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
})
export class AdminModule {
}
