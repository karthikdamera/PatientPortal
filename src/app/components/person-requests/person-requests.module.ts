import { CollapsibleModule } from 'angular2-collapsible';
import { AppointmentCancelComponent } from './appointment-cancel/appointment-cancel.component';
import { AppointmentChangeComponent } from './appointment-change/appointment-change.component';
import { PersonRequestsComponent } from './person-requests.component';
// Angular Imports
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMyDatePickerModule } from 'ngx-mydatepicker';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastModule } from 'ng2-toastr';
import { appointmentcancelchangeRouting } from './person-requests.route';
// import { routing } from '../../app.route';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { ScrollbarModule } from 'ngx-scrollbar';

@NgModule({
    imports: [
        appointmentcancelchangeRouting,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgxMyDatePickerModule.forRoot(),
        // NgbModule.forRoot(),
        ToastModule.forRoot(),
       // BrowserAnimationsModule,
       //  routing,
        MDBBootstrapModule.forRoot(),
        CollapsibleModule,
        ScrollbarModule
    ],
    declarations: [

        AppointmentCancelComponent,
        AppointmentChangeComponent,
        PersonRequestsComponent


    ],
    exports: [
        PersonRequestsComponent,
    ]
})
export class PersonRequestModule {

}
