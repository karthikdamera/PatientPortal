import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentCancelComponent } from './appointment-cancel.component';

describe('AppointmentCancelComponent', () => {
  let component: AppointmentCancelComponent;
  let fixture: ComponentFixture<AppointmentCancelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppointmentCancelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentCancelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
