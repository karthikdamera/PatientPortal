import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignAttendeeComponent } from './campaign-attendee.component';

describe('CampaignAttendeeComponent', () => {
  let component: CampaignAttendeeComponent;
  let fixture: ComponentFixture<CampaignAttendeeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampaignAttendeeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignAttendeeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
