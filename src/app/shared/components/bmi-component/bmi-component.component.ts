import { Component, OnInit } from '@angular/core';
import { User } from './../../../models/person-slot.model';


@Component({
  selector: 'app-bmi-component',
  templateUrl: './bmi-component.component.html',
  styleUrls: ['./bmi-component.component.scss']
})
export class BmiComponentComponent implements OnInit {
  title = 'Another BMI Calculator';
  user: User ;
  bmi: any;
  height: any;
  weight: any;
  result: any;
  errormsg: boolean;
  constructor() {
    this.user = new User();
    this.bmi = '0.0';
    this.result = '';
    this.errormsg = false;
    // console.log(this.user.weight);
  }

  ngOnInit() {
  }
  calculatebmi () {
    this.errormsg = false;
    if (this.user.height !== '' && this.user.weight !== '') {
      this.height = this.user.height;
      this.weight = this.user.weight;
      var height = this.height / 100;
      this.bmi = this.weight / (height * height);
    //  console.log(this.bmi);
    if (this.bmi !== '') {
    var res = this.bmi.toFixed(1);
   // console.log(res);
    this.bmi = res;
    }
      if (this.bmi < 18.5) {
this.result = 'Underweight';
      }  else if (this.bmi >= 18.5 && this.bmi <= 24.9 ) {
        this.result = 'Normal';
      }  else if (this.bmi >= 25 && this.bmi <= 29.9 ) {
        this.result = 'Overweight';
      }  else if (this.bmi >= 30) {
        this.result = 'Obese';
      } else {
        this.result = '';
      }
      if (this.bmi === 'NaN') {
this.errormsg = true;
      }
  }
  }
}
