
import { NgModule } from '@angular/core';
import {CommonModule } from '@angular/common';
// import { FilterPipe } from './services/FilterPipe';
import { ToastOptions, ToastsManager, ToastModule } from 'ng2-toastr';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { NgxMyDatePickerModule } from 'ngx-mydatepicker';
import { ValidationModule } from './validation/validation.module';
import { TextMaskModule } from 'angular2-text-mask';
import { ScrollbarModule } from 'ngx-scrollbar';
import { MomentModule } from 'angular2-moment';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { Ng2FilterPipeModule } from 'ng2-filter-pipe';
@NgModule({
    declarations: [
        // FilterPipe
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        // FilterPipe,
        MDBBootstrapModule,
        NgxMyDatePickerModule,
        ValidationModule,
        TextMaskModule,
        ScrollbarModule,
        ToastModule,
        Ng2FilterPipeModule
    ],
    imports: [
        CommonModule,
        ToastModule,
        MDBBootstrapModule.forRoot(),
        NgxMyDatePickerModule.forRoot(),
    ],
    providers: [
        ToastOptions, ToastsManager
    ]
})
export class AdminSharedModule {


}
