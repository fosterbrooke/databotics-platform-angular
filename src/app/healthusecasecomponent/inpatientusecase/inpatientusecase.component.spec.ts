import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InpatientusecaseComponent } from './inpatientusecase.component';

describe('InpatientusecaseComponent', () => {
  let component: InpatientusecaseComponent;
  let fixture: ComponentFixture<InpatientusecaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InpatientusecaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InpatientusecaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
