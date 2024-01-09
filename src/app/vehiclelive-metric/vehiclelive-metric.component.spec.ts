import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicleliveMetricComponent } from './vehiclelive-metric.component';

describe('VehicleliveMetricComponent', () => {
  let component: VehicleliveMetricComponent;
  let fixture: ComponentFixture<VehicleliveMetricComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehicleliveMetricComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicleliveMetricComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
