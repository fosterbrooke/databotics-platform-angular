import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RetailAnalyticsOneComponent } from './retail-analytics-one.component';

describe('RetailAnalyticsOneComponent', () => {
  let component: RetailAnalyticsOneComponent;
  let fixture: ComponentFixture<RetailAnalyticsOneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RetailAnalyticsOneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RetailAnalyticsOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
