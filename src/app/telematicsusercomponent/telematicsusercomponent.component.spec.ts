import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TelematicsusercomponentComponent } from './telematicsusercomponent.component';

describe('TelematicsusercomponentComponent', () => {
  let component: TelematicsusercomponentComponent;
  let fixture: ComponentFixture<TelematicsusercomponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TelematicsusercomponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TelematicsusercomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
