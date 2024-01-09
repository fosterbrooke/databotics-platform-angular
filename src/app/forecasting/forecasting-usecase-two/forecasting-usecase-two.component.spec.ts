import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ForecastingUsecaseTwoComponent } from './forecasting-usecase-two.component';

describe('ForecastingUsecaseTwoComponent', () => {
  let component: ForecastingUsecaseTwoComponent;
  let fixture: ComponentFixture<ForecastingUsecaseTwoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ForecastingUsecaseTwoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ForecastingUsecaseTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
