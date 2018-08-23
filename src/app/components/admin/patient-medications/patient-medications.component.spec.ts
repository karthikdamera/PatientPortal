import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientMedicationsComponent } from './patient-medications.component';

describe('PatientMedicationsComponent', () => {
  let component: PatientMedicationsComponent;
  let fixture: ComponentFixture<PatientMedicationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientMedicationsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientMedicationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
