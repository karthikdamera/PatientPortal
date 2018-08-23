import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddInterventionsComponent } from './add-interventions.component';

describe('AddInterventionsComponent', () => {
  let component: AddInterventionsComponent;
  let fixture: ComponentFixture<AddInterventionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddInterventionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddInterventionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
