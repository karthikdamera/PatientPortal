import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AssessmentWiseScoreChartsComponent } from './assessment-wise-score-charts.component';

describe('AssessmentWiseScoreChartsComponent', () => {
  let component: AssessmentWiseScoreChartsComponent;
  let fixture: ComponentFixture<AssessmentWiseScoreChartsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AssessmentWiseScoreChartsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssessmentWiseScoreChartsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
