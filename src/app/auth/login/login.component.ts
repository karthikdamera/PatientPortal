import { Component, OnInit } from '@angular/core';
import { Response } from '@angular/http';
import { LoginModel } from './../../models/login.model';
import { AuthService } from './../auth.service';
import { Router } from '@angular/router';
import { environment } from './../../../environments/environment';
@Component({
  moduleId: module.id,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  private model = new LoginModel();
  private data: any = [];
  private error: any;
  constructor(private router: Router, private authService: AuthService) {

  }
  ngOnInit() {
  }
  secureLogin() {
    this.authService.LoginUser(this.model.Name, this.model.PassWord)
      .subscribe(
        res => {
          console.log((JSON.stringify(res)));
        },
        err => this.error = console.log(err)
      );
  }



}
