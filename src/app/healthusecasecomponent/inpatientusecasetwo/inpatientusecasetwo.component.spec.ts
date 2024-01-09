import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InpatientusecasetwoComponent } from './inpatientusecasetwo.component';

describe('InpatientusecasetwoComponent', () => {
  let component: InpatientusecasetwoComponent;
  let fixture: ComponentFixture<InpatientusecasetwoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InpatientusecasetwoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InpatientusecasetwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
