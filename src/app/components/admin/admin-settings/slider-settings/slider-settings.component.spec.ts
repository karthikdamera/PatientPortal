import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SliderSettingsComponent } from './slider-settings.component';

describe('SliderSettingsComponent', () => {
  let component: SliderSettingsComponent;
  let fixture: ComponentFixture<SliderSettingsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SliderSettingsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SliderSettingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
