import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderSlotDetailsComponent } from './provider-slot-details.component';

describe('ProviderSlotDetailsComponent', () => {
  let component: ProviderSlotDetailsComponent;
  let fixture: ComponentFixture<ProviderSlotDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProviderSlotDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProviderSlotDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
