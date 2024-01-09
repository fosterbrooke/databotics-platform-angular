import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicledataComponent } from './vehicledata.component';

describe('VehicledataComponent', () => {
  let component: VehicledataComponent;
  let fixture: ComponentFixture<VehicledataComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehicledataComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicledataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
