import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StateOverviewComponent } from './state-overview.component';

describe('StateOverviewComponent', () => {
  let component: StateOverviewComponent;
  let fixture: ComponentFixture<StateOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StateOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StateOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
