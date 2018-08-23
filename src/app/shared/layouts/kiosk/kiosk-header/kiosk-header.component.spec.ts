import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KioskHeaderComponent } from './kiosk-header.component';

describe('KioskHeaderComponent', () => {
  let component: KioskHeaderComponent;
  let fixture: ComponentFixture<KioskHeaderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KioskHeaderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KioskHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
