import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FleetmaticusescomponentComponent } from './fleetmaticusescomponent.component';

describe('FleetmaticusescomponentComponent', () => {
  let component: FleetmaticusescomponentComponent;
  let fixture: ComponentFixture<FleetmaticusescomponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FleetmaticusescomponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FleetmaticusescomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
