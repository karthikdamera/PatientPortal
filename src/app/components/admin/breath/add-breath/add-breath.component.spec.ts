import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddBreathComponent } from './add-breath.component';

describe('AddBreathComponent', () => {
  let component: AddBreathComponent;
  let fixture: ComponentFixture<AddBreathComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddBreathComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddBreathComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
