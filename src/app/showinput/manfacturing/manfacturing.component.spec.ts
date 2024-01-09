import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManfacturingComponent } from './manfacturing.component';

describe('ManfacturingComponent', () => {
  let component: ManfacturingComponent;
  let fixture: ComponentFixture<ManfacturingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManfacturingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManfacturingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
