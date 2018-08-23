import { ForgotComponent } from './../../../auth/forgot/forgot.component';
import { CommonModule } from '@angular/common';

import { NgModule } from '@angular/core';
import { AsyncPipe } from '@angular/common';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { SharedModule } from '../../../shared/shared.module';
import { ToastOptions, ToastsManager, ToastModule } from 'ng2-toastr';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { NgxMyDatePickerModule } from 'ngx-mydatepicker';
import { MyDatePickerModule } from 'mydatepicker';
import { TextMaskModule } from 'angular2-text-mask';
import { ScrollbarModule } from 'ngx-scrollbar';
import { ValidationModule } from '../../../shared/validation/validation.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { RegistrationComponent } from '../registration/registration.component';
import { ResetpasswordComponent } from '../../../auth/resetpassword/resetpassword.component';
import { PersonloginComponent } from './personlogin.component';
import { AuthModule } from '../../../auth/auth.module';
import { AuthService } from '../../../auth/auth.service';
@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        MDBBootstrapModule.forRoot(),
        NgxMyDatePickerModule.forRoot(),
        MyDatePickerModule,
        ValidationModule,
        // AngularMultiSelectModule,
        TextMaskModule,
        ScrollbarModule,
        ToastModule,
        AuthModule
    ],
    declarations: [
        PersonloginComponent,
        RegistrationComponent,
        // ForgotComponent,
        // ResetpasswordComponent
    ],
    exports: [
        PersonloginComponent,
        RegistrationComponent,
        // ForgotComponent,
        // ResetpasswordComponent
    ],
    providers: [
        ToastOptions,
        ToastsManager,
        AuthService
    ],
    schemas: [NO_ERRORS_SCHEMA],
})
export class PersonLoginModule {

}
