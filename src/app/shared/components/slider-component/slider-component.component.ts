import { Component, OnInit } from '@angular/core';
import { TenantResponse } from '../../../models/tenant.model';
import { OrderBy } from '../../services/orderformatPipe';

@Component({
  selector: 'app-slider-component',
  templateUrl: './slider-component.component.html',
  styleUrls: ['./slider-component.component.scss']
})
export class SliderComponentComponent implements OnInit {
  tenantData: TenantResponse;
  slidsImage: any = [];
  orderpipr: OrderBy;
  constructor() {
    this.orderpipr = new OrderBy();
    this.tenantData = new TenantResponse();
      let tenantData = localStorage.getItem('TenantData');

      if (tenantData != null) {
        this.tenantData = JSON.parse(tenantData) as TenantResponse;


        this.getSlidImg();
      }
      console.log('123');

  }

  ngOnInit() {
  }

  getSlidImg() {
    this.slidsImage = this.orderpipr.transform(this.tenantData.SliderSettings, 'OrderNo', true);

    for (let i = 0; i < this.slidsImage.length; i++) {
      this.slidsImage[i].Image += '?random+\=' + Math.random();
    }
    console.log(this.slidsImage);
  }

}
