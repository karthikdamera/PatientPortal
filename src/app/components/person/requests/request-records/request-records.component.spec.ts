import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestRecordsComponent } from './request-records.component';

describe('RequestRecordsComponent', () => {
  let component: RequestRecordsComponent;
  let fixture: ComponentFixture<RequestRecordsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestRecordsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestRecordsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
