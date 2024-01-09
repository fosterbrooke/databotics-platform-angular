import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForecastTrendAnalysisComponent } from './forecast-trend-analysis.component';

describe('ForecastTrendAnalysisComponent', () => {
  let component: ForecastTrendAnalysisComponent;
  let fixture: ComponentFixture<ForecastTrendAnalysisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForecastTrendAnalysisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForecastTrendAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
