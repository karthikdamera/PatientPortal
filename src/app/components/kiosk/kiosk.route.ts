import { PersonRegistrationComponent } from './person-registration/person-registration.component';

import { AuthGuard } from './../../auth/auth.guard';
import { Routes, RouterModule } from '@angular/router';
import { FormscontrolComponent } from '../formscontrol/formscontrol.component';
import { KioskComponent } from './kiosk.component';
import { PatientRegistartionComponent } from './patient-registartion/patient-registartion.component';
import { HomeComponent } from './home/home.component';
import { PatientQuestionnaireComponent } from './patient-questionnaire/patient-questionnaire.component';
export const routes: Routes = [
    // { path: 'kiosk-reg', component: PersonRegistrationComponent},
     { path: '', component: HomeComponent },
    {
        path: '', component: KioskComponent,
        children: [
            { path: 'home', component: HomeComponent },
            { path: 'patient-reg', component: PatientRegistartionComponent },
            { path: 'kiosk-reg', component: PersonRegistrationComponent },
            { path: 'questions', component: PatientQuestionnaireComponent }
        ]
    }

];

export const KioskRouting = RouterModule.forChild(routes);
