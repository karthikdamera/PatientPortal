// import { Component } from '@angular/core';

// @Component({
//     moduleId: module.id,
//     selector: 'validation',
//     templateUrl: 'validation.component.html',
//     styleUrls: ['validation.component.scss']
// })
// export class ValidationComponent {

// }
import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ValidationService } from './validation.service';

@Component({
  selector: 'app-validation',
  template: `<span *ngIf="errorMessage !== null" class="error_alert">{{errorMessage}}</span>`
})
export class ValidationComponent implements OnInit {
  @Input() control: FormControl;
  constructor() { }
  ngOnInit() {
    //this.geterrorMessage();
 }
  get errorMessage() {
    for (let propertyName in this.control.errors) {
      if (this.control.errors.hasOwnProperty(propertyName) && this.control.touched) {
        return ValidationService.getValidatorErrorMessage(propertyName, this.control.errors[propertyName]);
      }
    }
    return null;
  }
 }
