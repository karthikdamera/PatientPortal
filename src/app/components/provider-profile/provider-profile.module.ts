// import { SlotregistrationModule } from './../person/slot-registration/slot-registration.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProviderProfileRouting } from './provider-profile.route';
// Angular Imports
import { NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
// This Module's Components
import { ProviderProfileComponent } from './provider-profile.component';
// import { ClientHeaderModule } from '../../shared/layouts/client/client-header/client-header.module';
// import { ClientFooterModule } from '../../shared/layouts/client/client-footer/client-footer.module';

import { BmiComponentModule } from '../../shared/components/bmi-component/bmi-component.module';
import { SliderComponentModule } from '../../shared/components/slider-component/slider-component.module';
import { CollapsibleModule } from 'angular2-collapsible';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { ScrollbarModule } from 'ngx-scrollbar';
import { NgxMyDatePickerModule } from 'ngx-mydatepicker';
import { TextMaskModule } from 'angular2-text-mask';
import { RatingModule } from '../../shared/components/rating/ratingmodule';
import {ToastOptions, ToastsManager, ToastModule } from 'ng2-toastr';
import { TabsModule } from '../../shared/components/ngx-tabset-component/ngx-tabset';


@NgModule({
    imports: [
        ProviderProfileRouting,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        TabsModule.forChild(),
        BmiComponentModule,
        SliderComponentModule,
        CollapsibleModule,
        MDBBootstrapModule,
        ScrollbarModule,
        NgxMyDatePickerModule.forRoot(),
        TextMaskModule,
         RatingModule,
         ToastModule

    ],
    declarations: [
        ProviderProfileComponent,

    ],
    exports: [
        ProviderProfileComponent,
    ],
    schemas: [NO_ERRORS_SCHEMA],
    providers: [ToastOptions, ToastsManager]
})
export class ProviderProfileModule {

}
