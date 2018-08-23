import { NgModule, CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { AdminSharedModule } from '../../../shared/admin-shared.module';
import { AdminProfileComponent } from './profile.component';
import { AdminProfileRoutingModule } from './admin-profile.route';
import { BmiComponentModule } from '../../../shared/components/bmi-component/bmi-component.module';
import { SliderComponentModule } from '../../../shared/components/slider-component/slider-component.module';
@NgModule({
  imports: [
    AdminSharedModule,
    AdminProfileRoutingModule,
    BmiComponentModule,
    SliderComponentModule,
  ],
  declarations: [AdminProfileComponent],
})
export class AdminProfileLevelModule { }