import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AthenaComponent } from './athena.component';

describe('AthenaComponent', () => {
  let component: AthenaComponent;
  let fixture: ComponentFixture<AthenaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AthenaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AthenaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
