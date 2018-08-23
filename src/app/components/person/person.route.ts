import { QuickSearchComponent } from './quick-search/quick-search.component';
import { ProfileSettingsComponent } from './profile-settings/profile-settings.component';
import { ReferalComponent } from './referal/referal.component';
import { PersonComponent } from './person.component';
import { Routes, RouterModule } from '@angular/router';
import { PersonDashboardComponent } from './person-dashboard/person-dashboard.component';
import { SchedulerComponent } from './scheduler/scheduler.component';
import { PharmacyComponent } from './pharmacy/pharmacy.component';
import { AuthGuard } from '../../auth/auth.guard';
import { PersonloginComponent } from './personlogin/personlogin.component';
import { PaymentComponent } from './payment/payment.component';
import { InsuranceComponent } from './insurance/insurance.component';
import { SubscriberComponent } from './subscriber/subscriber.component';
import { RequestForRefillsComponent } from './requests/request-for-refills/request-for-refills.component';
import { TestResultsComponent } from './requests/test-results/test-results.component';
import { ReferAFriendComponent } from './requests/refer-a-friend/refer-a-friend.component';
import { BillingQuestionsComponent } from './requests/billing-questions/billing-questions.component';
import { RequestInformationComponent } from './requests/request-information/request-information.component';
import { RequestRecordsComponent } from './requests/request-records/request-records.component';
import { AskAQuestionComponent } from './requests/ask-a-question/ask-a-question.component';
import { MyAppontmentsComponent } from './my-appontments/my-appontments.component';
import { AssessmentsComponent } from './assessments/assessments.component';
import { SchedulerloginComponent } from './schedulerlogin/schedulerlogin.component';
export const routes: Routes = [

    {
        path: '', component: PersonComponent,
        children: [
            {
                path: '',
                children: [
                    { path: '', redirectTo: '', pathMatch: 'full' },
                    { path: 'quick-search', component: QuickSearchComponent },
                    { path: 'pharmacy', component: PharmacyComponent },
                    { path: 'schedulerlogin', component: SchedulerloginComponent },
                    { path: 'my-appointments', component: MyAppontmentsComponent },
                    // { path: 'dashboard', component: PersonDashboardComponent },
                    { path: 'requestrefills', component: RequestForRefillsComponent },
                    { path: 'referafriend', component: ReferAFriendComponent },
                    { path: 'billingquestions', component: BillingQuestionsComponent },
                    { path: 'requestinfo', component: RequestInformationComponent },
                    { path: 'requestrecords', component: RequestRecordsComponent },
                    { path: 'asksquestion', component: AskAQuestionComponent },
                    { path: 'testresults', component: TestResultsComponent },
                    { path: 'dashboard', component: PersonDashboardComponent },
                    { path: 'payment', component: PaymentComponent },
                    { path: 'insurance', component: InsuranceComponent },
                    { path: 'subscriber', component: SubscriberComponent },
                    { path: 'assessments', component: AssessmentsComponent },
                    { path: 'profile-settings', component: ProfileSettingsComponent },
                    { path: 'referal', component: ReferalComponent },

                ]
            }
        ]
    },


];
export const personRouting = RouterModule.forChild(routes);
