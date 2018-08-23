
import { NgModule } from '@angular/core';
import { PersonComponent } from './person.component';
import { personRouting } from './person.route';
import { PersonDashboardComponent } from './person-dashboard/person-dashboard.component';
import { PharmacyComponent } from './pharmacy/pharmacy.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { SelectModule } from 'ng2-select';
import { AngularMultiSelectModule } from 'angular2-multiselect-dropdown/angular2-multiselect-dropdown';
import { MomentModule } from 'angular2-moment';
import { BmiComponentModule } from '../../shared/components/bmi-component/bmi-component.module';
import { SliderComponentModule } from '../../shared/components/slider-component/slider-component.module';
import { PaymentComponent } from './payment/payment.component';
import { InsuranceComponent } from './insurance/insurance.component';
import { SubscriberComponent } from './subscriber/subscriber.component';
import { RequestsComponent } from './requests/requests.component';
import { RequestForRefillsComponent } from './requests/request-for-refills/request-for-refills.component';
import { AskAQuestionComponent } from './requests/ask-a-question/ask-a-question.component';
import { BillingQuestionsComponent } from './requests/billing-questions/billing-questions.component';
import { ReferAFriendComponent } from './requests/refer-a-friend/refer-a-friend.component';
import { RequestInformationComponent } from './requests/request-information/request-information.component';
import { RequestRecordsComponent } from './requests/request-records/request-records.component';
import { TestResultsComponent } from './requests/test-results/test-results.component';
import { MyAppontmentsComponent } from './my-appontments/my-appontments.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { AssessmentsComponent } from './assessments/assessments.component';
import { SchedulerloginComponent } from './schedulerlogin/schedulerlogin.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { DateFormat } from '../../shared/services/dateFormat';
import { Ng2FilterPipeModule } from 'ng2-filter-pipe';
import { FilterPipe } from '../../shared/services/FilterPipe';
import { QuickSearchComponent } from './quick-search/quick-search.component';
import { RequestPipe } from './requests/requestPipe';
import { RequestFilterPipe } from './requests/requestFilterPipe';
import { SharedModule } from '../../shared/shared.module';
import { ProfileSettingsModule } from './profile-settings/profile-settings.module';
import { ProviderProfileModule } from '../provider-profile/provider-profile.module';
import { OrderModule } from 'ngx-order-pipe';

@NgModule({
    declarations: [
        PersonComponent,
        PersonDashboardComponent,
        PharmacyComponent,
        PaymentComponent,
        InsuranceComponent,
        SubscriberComponent,
        RequestsComponent,
        RequestForRefillsComponent,
        AskAQuestionComponent,
        BillingQuestionsComponent,
        RequestPipe,
        RequestFilterPipe,
        ReferAFriendComponent,
        RequestInformationComponent,
        RequestRecordsComponent,
        TestResultsComponent,
        MyAppontmentsComponent,
        AssessmentsComponent,
        // ReferalComponent,
        // ProfileSettingsComponent,
        SchedulerloginComponent,
        // ResetpasswordComponent,
        DateFormat,
        // FilterPipe,
        // RegistrationComponent,
        QuickSearchComponent,

        // ProviderProfileModule
        //   SchedulerloginViewprofileComponent
        // ProfileComponent,
        // ForgotComponent,
        // ResetpasswordComponent,
        // PersonloginComponent
    ],
    imports: [
        personRouting,
        // FormsModule,
        // ReactiveFormsModule,
        // MDBBootstrapModule.forRoot(),
        SelectModule,
        // NgxMyDatePickerModule.forRoot(),
        // MyDatePickerModule,
        // CommonModule,
        // ProviderProfileModule,
        // ValidationModule,
        // BrowserAnimationsModule,
        AngularMultiSelectModule,
        // TextMaskModule,
        MomentModule,
        BmiComponentModule,
        // RatingModule,
        SliderComponentModule,
        NgxPaginationModule,
        // TabsModule.forRoot(),
        // ScrollbarModule,
        Ng2FilterPipeModule,
        ProfileSettingsModule,
        ProviderProfileModule,
        SharedModule,
        OrderModule
    ],
    exports: [
        PersonComponent, SchedulerloginComponent
    ],
    schemas: [NO_ERRORS_SCHEMA]
})
export class PersonModule { }
