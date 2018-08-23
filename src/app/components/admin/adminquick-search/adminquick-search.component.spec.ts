import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminquickSearchComponent } from './adminquick-search.component';

describe('AdminquickSearchComponent', () => {
  let component: AdminquickSearchComponent;
  let fixture: ComponentFixture<AdminquickSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminquickSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminquickSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
