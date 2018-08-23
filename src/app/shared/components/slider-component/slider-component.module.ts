import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { SliderComponentComponent } from './slider-component.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { OrderBy } from '../../services/orderformatPipe';
// This Module's Components

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        MDBBootstrapModule.forRoot(),
    ],
    declarations: [
        SliderComponentComponent,
        OrderBy
    ],
    exports: [
        SliderComponentComponent,
    ]
})
export class SliderComponentModule {

}
