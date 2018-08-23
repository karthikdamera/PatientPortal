import { PersonRegistrationComponent } from './person-registration/person-registration.component';
// Angular Imports
import { NgModule } from '@angular/core';

// This Module's Components
import { KioskComponent } from './kiosk.component';
import { PatientRegistartionComponent } from './patient-registartion/patient-registartion.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMyDatePickerModule } from 'ngx-mydatepicker';
// import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ToastModule } from 'ng2-toastr';
import { KioskRouting } from './kiosk.route';
import { ValidationModule } from '../../shared/validation/validation.module';
import { HomeComponent } from './home/home.component';
import { PatientQuestionnaireComponent } from './patient-questionnaire/patient-questionnaire.component';
import { KioskHeaderComponent } from '../../shared/layouts/kiosk/kiosk-header/kiosk-header.component';
import { KioskHeaderModule } from '../../shared/layouts/kiosk/kiosk-header/kiosk-header.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        NgxMyDatePickerModule.forRoot(),
       // NgbModule.forRoot(),
        ToastModule.forRoot(),
        KioskRouting,
        ValidationModule,
        KioskHeaderModule
    ],
    declarations: [
        KioskComponent,
        PatientRegistartionComponent,
        PersonRegistrationComponent,
        HomeComponent,
        PatientQuestionnaireComponent
        // KioskHeaderComponent
    ],
    exports: [
        KioskComponent,
    ]
})
export class KioskModule {

}
