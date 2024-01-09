import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RetailAnalyticsTwoComponent } from './retail-analytics-two.component';

describe('RetailAnalyticsTwoComponent', () => {
  let component: RetailAnalyticsTwoComponent;
  let fixture: ComponentFixture<RetailAnalyticsTwoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RetailAnalyticsTwoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RetailAnalyticsTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
