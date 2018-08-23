import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadDataComponent } from './lead-data.component';

describe('LeadDataComponent', () => {
  let component: LeadDataComponent;
  let fixture: ComponentFixture<LeadDataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LeadDataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LeadDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
