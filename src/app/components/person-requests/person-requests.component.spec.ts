import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonRequestsComponent } from './person-requests.component';

describe('PersonRequestsComponent', () => {
  let component: PersonRequestsComponent;
  let fixture: ComponentFixture<PersonRequestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonRequestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
