import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BillingQuestionsComponent } from './billing-questions.component';

describe('BillingQuestionsComponent', () => {
  let component: BillingQuestionsComponent;
  let fixture: ComponentFixture<BillingQuestionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BillingQuestionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BillingQuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
