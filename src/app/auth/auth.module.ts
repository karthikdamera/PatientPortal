import { CommonModule } from '@angular/common';
import { LoginModule } from './login/login.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { routing } from './auth.route';
import { LoginComponent } from './login/login.component';
// Angular Imports
import { NgModule } from '@angular/core';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
// This Module's Components
import { AuthComponent } from './auth.component';
import { ForgotComponent } from './forgot/forgot.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { ValidationModule } from './../shared/validation/validation.module';
// import { PersonModule } from '../components/person/person.module';
// import { PersonloginComponent } from '../components/person/personlogin/personlogin.component';


@NgModule({
    imports: [
        routing,
        LoginModule,
        FormsModule,
        // MDBBootstrapModule,
        ReactiveFormsModule,
        CommonModule,
        ValidationModule,
        // PersonModule
    ],
    declarations: [
        AuthComponent,
        ForgotComponent,
        ResetpasswordComponent,
        // PersonloginComponent
        // RegistrationComponent,
        // LoginComponent
    ],
    exports: [
        AuthComponent, ForgotComponent, ResetpasswordComponent
    ],
    providers: []
})
export class AuthModule {

}
