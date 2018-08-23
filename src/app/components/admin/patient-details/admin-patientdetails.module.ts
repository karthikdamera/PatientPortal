
import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { AdminSharedModule } from '../../../shared/admin-shared.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { Ng2AutoCompleteModule } from 'ng2-auto-complete';
import { Ng2Timeline } from 'ng2-timeline';
import { AdminPatientdetailsRoutingModule } from './admin-patientdetails.route';
import { TabsModule } from '../../../shared/components/ngx-tabset-component/ngx-tabset';
import { PatientListComponent } from './patient-list/patient-list.component';
import { PatientDetailsComponent } from './patient-details.component';
import { AdminAssessmentsComponent } from '../admin-assessments/admin-assessments.component';
import { AllCustomAssessmentsComponent } from '../admin-assessments/all-custom-assessments/all-custom-assessments.component';
import { AssessmentWiseScoreChartsComponent } from '../admin-assessments/assessment-wise-score-charts/assessment-wise-score-charts.component';
import { IndividualChartsComponent } from '../admin-assessments/individual-charts/individual-charts.component';
import { MoodComponent } from '../mood/mood.component';
import { JournalEntriesComponent } from '../journal-entries/journal-entries.component';
import { BreathComponent } from '../breath/breath.component';
import { AddBreathComponent } from '../breath/add-breath/add-breath.component';
import { ActivitiesComponent } from '../activities/activities.component';
import { AddActivitiesComponent } from '../activities/add-activities/add-activities.component';
import { PatientMedicationsComponent } from '../patient-medications/patient-medications.component';
import { AddMedicationsComponent } from '../patient-medications/add-medications/add-medications.component';
import { PatientMedicationviewComponent } from '../patient-medications/patient-medicationview/patient-medicationview.component';
import { InterventionsComponent } from '../interventions/interventions.component';
import { AddInterventionsComponent } from '../interventions/add-interventions/add-interventions.component';
import { PatientListPipe } from './patient-list/patientlistPipe';
import { OrderModule } from 'ngx-order-pipe';
@NgModule({
  imports: [
    AdminSharedModule,
    AdminPatientdetailsRoutingModule,
    NgxPaginationModule,
    TabsModule.forChild(),
    Ng2AutoCompleteModule,
    Ng2Timeline,
    OrderModule
  ],
  declarations: [PatientListComponent,
    PatientDetailsComponent,
    AdminAssessmentsComponent,
    AllCustomAssessmentsComponent,
    AssessmentWiseScoreChartsComponent,
     IndividualChartsComponent,
    MoodComponent,
     JournalEntriesComponent,
      BreathComponent,
    AddBreathComponent,
     ActivitiesComponent,
      AddActivitiesComponent,
    PatientMedicationsComponent,
     AddMedicationsComponent,
    PatientMedicationviewComponent,
     InterventionsComponent,
    AddInterventionsComponent,
    PatientListPipe],
    schemas: [CUSTOM_ELEMENTS_SCHEMA , NO_ERRORS_SCHEMA]
})
export class AdminPatientdetailsLevelModule { }
