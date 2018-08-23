import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailSubjectComponent } from './email-subject.component';

describe('EmailSubjectComponent', () => {
  let component: EmailSubjectComponent;
  let fixture: ComponentFixture<EmailSubjectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EmailSubjectComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EmailSubjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
