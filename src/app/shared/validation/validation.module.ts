// Angular Imports
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';
// This Module's Components
import { ValidationComponent } from './validation.component';
import { ValidationService } from './validation.service';
import { CommonModule } from '@angular/common';

@NgModule({
    imports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule
    ],
    declarations: [
        ValidationComponent,
    ],
    schemas: [ CUSTOM_ELEMENTS_SCHEMA],
    exports: [
        ValidationComponent,
    ],
    providers: [
        ValidationService
      ]
})
export class ValidationModule {

}
