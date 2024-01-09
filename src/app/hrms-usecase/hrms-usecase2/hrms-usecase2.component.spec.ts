import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrmsUsecase2Component } from './hrms-usecase2.component';

describe('HrmsUsecase2Component', () => {
  let component: HrmsUsecase2Component;
  let fixture: ComponentFixture<HrmsUsecase2Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrmsUsecase2Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrmsUsecase2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
