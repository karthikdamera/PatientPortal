// Angular Imports
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormscontrolComponent } from '../formscontrol/formscontrol.component';
// This Module's Components
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CampaignAttendeeComponent } from './campaign-attendee.component';
import { ToastModule } from 'ng2-toastr/ng2-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ValidationModule } from '../../shared/validation/validation.module';
import { NgxMyDatePickerModule } from 'ngx-mydatepicker';
import { CampaignAttendeeRouting } from './campaign-attendee.route';
import { TextMaskModule } from 'angular2-text-mask';
import { MDBBootstrapModule, ModalModule } from 'angular-bootstrap-md';
@NgModule({
    imports: [
        ValidationModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        TextMaskModule,
        MDBBootstrapModule,
        NgxMyDatePickerModule.forRoot(),
        // NgbModule.forRoot(),
        ToastModule.forRoot(),
        //  BrowserAnimationsModule,
        CampaignAttendeeRouting,
        ModalModule.forRoot()
    ],
    declarations: [
        CampaignAttendeeComponent
    ],
    exports: [
        CampaignAttendeeComponent,
    ]
})
export class CampaignAttendeeModule {

}
