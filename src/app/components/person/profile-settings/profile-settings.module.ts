 
import { ResetpasswordComponent } from './../resetpassword/resetpassword.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProfileSettingsComponent } from './profile-settings.component';
import { PersonReferral } from '../../../models/PatientCard.model';
import { ReferalComponent } from '../referal/referal.component';
import { SliderComponentComponent } from '../../../shared/components/slider-component/slider-component.component';
import { SliderComponentModule } from '../../../shared/components/slider-component/slider-component.module';
import { BmiComponentModule } from '../../../shared/components/bmi-component/bmi-component.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { MyDatePickerModule } from 'mydatepicker';
import { ValidationModule } from '../../../shared/validation/validation.module';
import { NgxMyDatePickerModule } from 'ngx-mydatepicker';
import { TextMaskModule } from 'angular2-text-mask';
import { ScrollbarModule } from 'ngx-scrollbar';
import { ToastModule } from 'ng2-toastr';
import { TabsModule } from '../../../shared/components/ngx-tabset-component/ngx-tabset';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MDBBootstrapModule.forRoot(),
    NgxMyDatePickerModule.forRoot(),
    TabsModule.forChild(),
    MyDatePickerModule,
    ValidationModule,
    // AngularMultiSelectModule, 
    TextMaskModule,
    ScrollbarModule,
    ToastModule,
    BmiComponentModule,
    SliderComponentModule,
  ],
  declarations: [
    ProfileSettingsComponent,
    ReferalComponent,
    ResetpasswordComponent

  ],
  exports: [ProfileSettingsComponent, ResetpasswordComponent]
})
export class ProfileSettingsModule { }
