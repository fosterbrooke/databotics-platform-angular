import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForecastingUsecaseOneComponent } from './forecasting-usecase-one.component';

describe('ForecastingUsecaseOneComponent', () => {
  let component: ForecastingUsecaseOneComponent;
  let fixture: ComponentFixture<ForecastingUsecaseOneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForecastingUsecaseOneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForecastingUsecaseOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
