import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { MoodService } from './mood.service';
@Component({
  selector: 'app-mood',
  templateUrl: './mood.component.html',
  styleUrls: ['./mood.component.scss'],
  providers: [MoodService]
})
export class MoodComponent implements OnInit {
  clientData: any;
  mood: any = [];
  clientid: number;
  user: any;
  showLoader: boolean;
  userFilter: any = { Description: '' };
  constructor(private _service: MoodService) { }
  ngOnInit() {

    this.getMoods();
  }
  getMoods() {
    // this.showLoader =true;

    this.clientid = 531;

    return this._service.getMood(this.clientid)
      .subscribe(arg => {
        this.mood = arg.data;
        // console.log("get medication" + (JSON.stringify(this.mood = arg)))
        // this.showLoader =false;
      });
  }

}

