import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BmiComponentComponent } from './bmi-component.component';

describe('BmiComponentComponent', () => {
  let component: BmiComponentComponent;
  let fixture: ComponentFixture<BmiComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BmiComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BmiComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
