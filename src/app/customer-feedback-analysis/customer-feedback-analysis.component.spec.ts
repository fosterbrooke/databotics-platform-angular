import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerFeedbackAnalysisComponent } from './customer-feedback-analysis.component';

describe('CustomerFeedbackAnalysisComponent', () => {
  let component: CustomerFeedbackAnalysisComponent;
  let fixture: ComponentFixture<CustomerFeedbackAnalysisComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerFeedbackAnalysisComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerFeedbackAnalysisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
