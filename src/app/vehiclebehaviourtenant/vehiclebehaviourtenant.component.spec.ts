import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiclebehaviourtenantComponent } from './vehiclebehaviourtenant.component';

describe('VehiclebehaviourtenantComponent', () => {
  let component: VehiclebehaviourtenantComponent;
  let fixture: ComponentFixture<VehiclebehaviourtenantComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehiclebehaviourtenantComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehiclebehaviourtenantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
