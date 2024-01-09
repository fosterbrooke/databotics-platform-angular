import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthusecasecomponentComponent } from './healthusecasecomponent.component';

describe('HealthusecasecomponentComponent', () => {
  let component: HealthusecasecomponentComponent;
  let fixture: ComponentFixture<HealthusecasecomponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HealthusecasecomponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HealthusecasecomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
