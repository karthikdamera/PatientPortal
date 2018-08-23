
import { NgModule } from '@angular/core';
import {CommonModule } from '@angular/common';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { ValidationModule } from './validation/validation.module';
import { ScrollbarModule } from 'ngx-scrollbar';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
@NgModule({
    declarations: [
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MDBBootstrapModule,
        ValidationModule,
        ScrollbarModule,
       // ToastModule,
    ],
    imports: [
        CommonModule,
       // ToastModule,
        MDBBootstrapModule.forRoot(),
       // NgxMyDatePickerModule.forRoot(),
    ],
    // providers: [
    //  ToastOptions, ToastsManager
    // ]
})
export class SharedInAdminModule {


}
