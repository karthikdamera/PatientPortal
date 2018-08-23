import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatinetcheckoutComponent } from './patinetcheckout.component';

describe('PatinetcheckoutComponent', () => {
  let component: PatinetcheckoutComponent;
  let fixture: ComponentFixture<PatinetcheckoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatinetcheckoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatinetcheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
