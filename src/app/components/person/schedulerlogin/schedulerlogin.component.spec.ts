import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedulerloginComponent } from './schedulerlogin.component';

describe('SchedulerloginComponent', () => {
  let component: SchedulerloginComponent;
  let fixture: ComponentFixture<SchedulerloginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SchedulerloginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SchedulerloginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
