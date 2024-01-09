import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportUsecaseTwoComponent } from './report-usecase-two.component';

describe('ReportUsecaseTwoComponent', () => {
  let component: ReportUsecaseTwoComponent;
  let fixture: ComponentFixture<ReportUsecaseTwoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportUsecaseTwoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportUsecaseTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
