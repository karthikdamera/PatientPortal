import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientcheckinComponent } from './patientcheckin.component';

describe('PatientcheckinComponent', () => {
  let component: PatientcheckinComponent;
  let fixture: ComponentFixture<PatientcheckinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatientcheckinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatientcheckinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
