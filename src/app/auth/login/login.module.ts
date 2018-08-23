import { HttpClient } from './../../shared/services/httpClient.service';
// Angular Imports
import { NgModule } from '@angular/core';

// This Module's Components
import { LoginComponent } from './login.component';

import {Http, Headers, Response, HttpModule} from '@angular/http';
@NgModule({
    imports: [
        HttpModule
    ],
    declarations: [
        LoginComponent,
    ],
    exports: [
        LoginComponent,
    ],
    providers: [HttpClient]
})
export class LoginModule {

}
