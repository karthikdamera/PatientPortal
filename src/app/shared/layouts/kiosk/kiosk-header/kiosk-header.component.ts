import { Component, OnInit } from '@angular/core';

@Component({
  moduleId: module.id,
  selector: 'app-kiosk-header',
  templateUrl: './kiosk-header.component.html',
  styleUrls: ['./kiosk-header.component.scss']
})
export class KioskHeaderComponent implements OnInit {
  authToken: any;
  name: string;
  patientData: any = {};
  constructor() { }

  ngOnInit() {
  }

}
