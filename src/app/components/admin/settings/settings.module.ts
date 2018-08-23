// Angular Imports
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// This Module's Components
import { SettingsComponent } from './settings.component';
// import { MailSettingsComponent } from './mail-settings/mail-settings.component';
import { ValidationModule } from '../../../shared/validation/validation.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
 // import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
 import { ToastModule } from 'ng2-toastr';
import { EmailSubjectComponent } from './email-subject/email-subject.component';
import { MailSettingsComponent } from './mail-settings/mail-settings.component';
// import { AdminHeaderModule } from '../../../shared/layouts/admin/admin-header/admin-header.module';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ValidationModule,
       // NgbModule.forRoot(),
        ReactiveFormsModule,
        NgxPaginationModule,
        ToastModule.forRoot(),
      //  AdminHeaderModule
      MDBBootstrapModule.forRoot()
    ],
    declarations: [
        SettingsComponent,
        EmailSubjectComponent,
        MailSettingsComponent,
        // MailSettingsComponent
    ],
    exports: [
        SettingsComponent,
        EmailSubjectComponent,
        MailSettingsComponent
    ]
})
export class SettingsModule {

}
