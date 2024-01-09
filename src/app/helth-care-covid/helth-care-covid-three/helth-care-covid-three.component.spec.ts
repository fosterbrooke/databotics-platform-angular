import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HelthCareCovidThreeComponent } from './helth-care-covid-three.component';

describe('HelthCareCovidThreeComponent', () => {
  let component: HelthCareCovidThreeComponent;
  let fixture: ComponentFixture<HelthCareCovidThreeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HelthCareCovidThreeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HelthCareCovidThreeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
