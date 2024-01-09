import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HelthCareCovidComponent } from './helth-care-covid.component';

describe('HelthCareCovidComponent', () => {
  let component: HelthCareCovidComponent;
  let fixture: ComponentFixture<HelthCareCovidComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HelthCareCovidComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HelthCareCovidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
