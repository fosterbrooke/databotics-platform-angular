import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FleetmaticsComponent } from './fleetmatics.component';

describe('FleetmaticsComponent', () => {
  let component: FleetmaticsComponent;
  let fixture: ComponentFixture<FleetmaticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FleetmaticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FleetmaticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
