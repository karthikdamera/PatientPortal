import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentChangeComponent } from './appointment-change.component';

describe('AppointmentChangeComponent', () => {
  let component: AppointmentChangeComponent;
  let fixture: ComponentFixture<AppointmentChangeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppointmentChangeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentChangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
