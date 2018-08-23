import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-masters',
  templateUrl: './masters.component.html',
  styleUrls: ['./masters.component.scss']
})
export class MastersComponent implements OnInit {
 isprovider: string;
  constructor() {
    this.isprovider = '';
   }

  ngOnInit() {
    this.isprovider = localStorage.getItem('provider');
    localStorage.removeItem('provider');
  }

}
