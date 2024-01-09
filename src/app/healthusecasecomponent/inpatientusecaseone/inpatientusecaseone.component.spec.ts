import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InpatientusecaseoneComponent } from './inpatientusecaseone.component';

describe('InpatientusecaseoneComponent', () => {
  let component: InpatientusecaseoneComponent;
  let fixture: ComponentFixture<InpatientusecaseoneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InpatientusecaseoneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InpatientusecaseoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
