import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MyAppontmentsComponent } from './my-appontments.component';

describe('MyAppontmentsComponent', () => {
  let component: MyAppontmentsComponent;
  let fixture: ComponentFixture<MyAppontmentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MyAppontmentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MyAppontmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
