import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrmsUsecase3Component } from './hrms-usecase3.component';

describe('HrmsUsecase3Component', () => {
  let component: HrmsUsecase3Component;
  let fixture: ComponentFixture<HrmsUsecase3Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrmsUsecase3Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrmsUsecase3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
