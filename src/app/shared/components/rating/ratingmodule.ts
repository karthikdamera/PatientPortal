import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BodyMassIndexPipe } from './../../filters/bmi-pipe';
// Angular Imports
import { NgModule } from '@angular/core';
import { RatingComponent } from './rating.component';
// This Module's Components


@NgModule({
    imports: [
        CommonModule,
        FormsModule
    ],
    declarations: [
        RatingComponent
    ],
    exports: [
        RatingComponent,
    ]
})
export class RatingModule {

}
