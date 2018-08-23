
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMyDatePickerModule } from 'ngx-mydatepicker';
import { ToastModule } from 'ng2-toastr';
import { ValidationModule } from '../../../shared/validation/validation.module';
import { AdminSettingsComponent } from './admin-settings.component';
import { AdminSettingsRouting } from './admin-settings.route';
import { NgxPaginationModule } from 'ngx-pagination';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { OrgSettingsComponent } from './org-settings/org-settings.component';
import { SettingsModule } from '../settings/settings.module';
import { IntegrationSettingsComponent } from './integration-settings/integration-settings.component';
import { AmdComponent } from './integration-settings/amd/amd.component';
import { AthenaComponent } from './integration-settings/athena/athena.component';
import { SliderSettingsComponent } from './slider-settings/slider-settings.component';
import { ScrollbarModule } from 'ngx-scrollbar';
import { TextMaskModule } from 'angular2-text-mask';
import { TabsModule } from '../../../shared/components/ngx-tabset-component/ngx-tabset';


@NgModule({
    imports: [
        CommonModule,
		FormsModule,
        SettingsModule,
        ReactiveFormsModule,
        NgxMyDatePickerModule.forRoot(),
        MDBBootstrapModule.forRoot(),
        ToastModule.forRoot(),
        AdminSettingsRouting,
        TabsModule.forChild(),
        NgxPaginationModule,
        ValidationModule,
        TextMaskModule,
        ScrollbarModule
    ],
    declarations: [
        AdminSettingsComponent,
        OrgSettingsComponent,
        IntegrationSettingsComponent,
        AmdComponent,
        AthenaComponent,
        SliderSettingsComponent,

        // KioskHeaderComponent
    ],
    exports: [
        AdminSettingsComponent,
    ],
    schemas: [
        CUSTOM_ELEMENTS_SCHEMA
    ],
})
export class AdminSettingsModule {

}
//