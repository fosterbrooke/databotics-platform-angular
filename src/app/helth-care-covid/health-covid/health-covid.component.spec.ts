import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HealthCovidComponent } from './health-covid.component';

describe('HealthCovidComponent', () => {
  let component: HealthCovidComponent;
  let fixture: ComponentFixture<HealthCovidComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HealthCovidComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HealthCovidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
