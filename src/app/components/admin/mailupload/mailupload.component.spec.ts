import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MailuploadComponent } from './mailupload.component';

describe('MailuploadComponent', () => {
  let component: MailuploadComponent;
  let fixture: ComponentFixture<MailuploadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MailuploadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MailuploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
