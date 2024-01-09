import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseAnalyticsComponent } from './expense-analytics.component';

describe('ExpenseAnalyticsComponent', () => {
  let component: ExpenseAnalyticsComponent;
  let fixture: ComponentFixture<ExpenseAnalyticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpenseAnalyticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpenseAnalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
