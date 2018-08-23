import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientMedicationviewComponent } from './patient-medicationview.component';

describe('PatientMedicationviewComponent', () => {
  let component: PatientMedicationviewComponent;
  let fixture: ComponentFixture<PatientMedicationviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientMedicationviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientMedicationviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
