import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportusecasecomponentComponent } from './reportusecasecomponent.component';

describe('ReportusecasecomponentComponent', () => {
  let component: ReportusecasecomponentComponent;
  let fixture: ComponentFixture<ReportusecasecomponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportusecasecomponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportusecasecomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
