import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HrmsUsecase1Component } from './hrms-usecase1.component';

describe('HrmsUsecase1Component', () => {
  let component: HrmsUsecase1Component;
  let fixture: ComponentFixture<HrmsUsecase1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HrmsUsecase1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HrmsUsecase1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
