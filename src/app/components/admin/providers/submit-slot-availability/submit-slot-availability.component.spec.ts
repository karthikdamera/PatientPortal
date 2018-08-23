import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubmitSlotAvailabilityComponent } from './submit-slot-availability.component';

describe('SubmitSlotAvailabilityComponent', () => {
  let component: SubmitSlotAvailabilityComponent;
  let fixture: ComponentFixture<SubmitSlotAvailabilityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubmitSlotAvailabilityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubmitSlotAvailabilityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
