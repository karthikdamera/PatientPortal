import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AttendiesComponent } from './attendies.component';

describe('AttendiesComponent', () => {
  let component: AttendiesComponent;
  let fixture: ComponentFixture<AttendiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AttendiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AttendiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
