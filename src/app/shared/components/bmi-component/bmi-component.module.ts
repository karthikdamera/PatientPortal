import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BodyMassIndexPipe } from './../../filters/bmi-pipe';
// Angular Imports
import { NgModule } from '@angular/core';
// This Module's Components
import { BmiComponentComponent } from './bmi-component.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
    ],
    declarations: [
        BmiComponentComponent, BodyMassIndexPipe
    ],
    exports: [
        BmiComponentComponent,
    ]
})
export class BmiComponentModule {

}
