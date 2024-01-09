import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportUsecaseOneComponent } from './report-usecase-one.component';

describe('ReportUsecaseOneComponent', () => {
  let component: ReportUsecaseOneComponent;
  let fixture: ComponentFixture<ReportUsecaseOneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportUsecaseOneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportUsecaseOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
