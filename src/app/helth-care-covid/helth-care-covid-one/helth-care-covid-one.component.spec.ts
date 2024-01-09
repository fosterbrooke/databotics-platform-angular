import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HelthCareCovidOneComponent } from './helth-care-covid-one.component';

describe('HelthCareCovidOneComponent', () => {
  let component: HelthCareCovidOneComponent;
  let fixture: ComponentFixture<HelthCareCovidOneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HelthCareCovidOneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HelthCareCovidOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
