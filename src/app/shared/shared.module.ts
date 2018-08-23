import { AuthModule } from './../auth/auth.module';
import { NgModule } from '@angular/core';
import { DatePipe, CommonModule } from '@angular/common';
import { FilterPipe } from './services/FilterPipe';
import { ToastOptions, ToastsManager, ToastModule } from 'ng2-toastr';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { NgxMyDatePickerModule } from 'ngx-mydatepicker';
import { MyDatePickerModule } from 'mydatepicker';
import { ValidationModule } from './validation/validation.module';
import { TextMaskModule } from 'angular2-text-mask';
import { ScrollbarModule } from 'ngx-scrollbar';
import { MomentModule } from 'angular2-moment';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { PersonLoginModule } from '../components/person/personlogin/personlogin.module';
import { RatingModule } from './components/rating/ratingmodule';

@NgModule({
    declarations: [
        FilterPipe
    ],
    exports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        FilterPipe,
        MDBBootstrapModule,
        NgxMyDatePickerModule,
        MyDatePickerModule,
        ValidationModule,
        TextMaskModule,
        ScrollbarModule,
        ToastModule,
        PersonLoginModule,
        RatingModule
    ],
    imports: [
        CommonModule,
        PersonLoginModule,
        ToastModule,
        MDBBootstrapModule.forRoot(),
        NgxMyDatePickerModule.forRoot(),
    ],
    providers: [
        FilterPipe, ToastOptions, ToastsManager
    ]
})
export class SharedModule {


}
