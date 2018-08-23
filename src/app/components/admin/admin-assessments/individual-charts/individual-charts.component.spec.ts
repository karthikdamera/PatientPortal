import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualChartsComponent } from './individual-charts.component';

describe('IndividualChartsComponent', () => {
  let component: IndividualChartsComponent;
  let fixture: ComponentFixture<IndividualChartsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IndividualChartsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IndividualChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
