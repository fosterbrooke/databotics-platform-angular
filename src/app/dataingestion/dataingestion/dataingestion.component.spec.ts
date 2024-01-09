import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DataingestionComponent } from './dataingestion.component';

describe('DataingestionComponent', () => {
  let component: DataingestionComponent;
  let fixture: ComponentFixture<DataingestionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DataingestionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DataingestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
