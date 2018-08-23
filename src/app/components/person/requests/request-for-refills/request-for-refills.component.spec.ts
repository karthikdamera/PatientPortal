import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestForRefillsComponent } from './request-for-refills.component';

describe('RequestForRefillsComponent', () => {
  let component: RequestForRefillsComponent;
  let fixture: ComponentFixture<RequestForRefillsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestForRefillsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestForRefillsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
