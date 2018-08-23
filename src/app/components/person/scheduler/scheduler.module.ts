import { CommonModule } from '@angular/common';
// Angular Imports
import { NgModule } from '@angular/core';
// This Module's Components
import { SchedulerComponent } from './scheduler.component';
import { AsyncPipe } from '@angular/common';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { CollapsibleModule } from 'angular2-collapsible';
import { schedulerRouting } from './scheduler.route';
import { SharedModule } from '../../../shared/shared.module';
@NgModule({
    imports: [
        // BrowserModule,
        // FormsModule,
        // ReactiveFormsModule,
        // ValidationModule,
        // CommonModule,
        // BrowserAnimationsModule,
        // CollapsibleModule,
        // MDBBootstrapModule.forRoot(),
        // NgxMyDatePickerModule.forRoot(),
        // MyDatePickerModule,
        // RatingModule,
        // TextMaskModule,
        // PersonModule,
        // AuthModule,
        // ScrollbarModule

        schedulerRouting,
        CollapsibleModule,
        SharedModule
    ],
    declarations: [
        SchedulerComponent,
        // PersonloginComponent,
        // FilterPipe
    ],
    exports: [
        SchedulerComponent,
    ],
    schemas: [NO_ERRORS_SCHEMA],
    providers: []
})
export class SchedulerModule {

}
