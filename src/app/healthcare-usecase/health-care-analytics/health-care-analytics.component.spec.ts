import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthCareAnalyticsComponent } from './health-care-analytics.component';

describe('HealthCareAnalyticsComponent', () => {
  let component: HealthCareAnalyticsComponent;
  let fixture: ComponentFixture<HealthCareAnalyticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HealthCareAnalyticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HealthCareAnalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
