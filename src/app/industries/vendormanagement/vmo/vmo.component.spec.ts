import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VmoComponent } from './vmo.component';

describe('VmoComponent', () => {
  let component: VmoComponent;
  let fixture: ComponentFixture<VmoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VmoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VmoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
