import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { admin } from './admin.component';

describe('admin', () => {
  let component: admin;
  let fixture: ComponentFixture<admin>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ admin ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(admin);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
