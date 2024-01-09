import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HelthCareCovidTwoComponent } from './helth-care-covid-two.component';

describe('HelthCareCovidTwoComponent', () => {
  let component: HelthCareCovidTwoComponent;
  let fixture: ComponentFixture<HelthCareCovidTwoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HelthCareCovidTwoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HelthCareCovidTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
