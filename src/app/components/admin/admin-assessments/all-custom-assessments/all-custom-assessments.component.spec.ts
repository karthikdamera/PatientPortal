import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AllCustomAssessmentsComponent } from './all-custom-assessments.component';

describe('AllCustomAssessmentsComponent', () => {
  let component: AllCustomAssessmentsComponent;
  let fixture: ComponentFixture<AllCustomAssessmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AllCustomAssessmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AllCustomAssessmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
