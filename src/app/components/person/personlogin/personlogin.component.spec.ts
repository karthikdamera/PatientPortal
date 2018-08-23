import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonloginComponent } from './personlogin.component';

describe('PersonloginComponent', () => {
  let component: PersonloginComponent;
  let fixture: ComponentFixture<PersonloginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonloginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonloginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
