import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoothinchargeLevelComponent } from './boothincharge-level.component';

describe('BoothinchargeLevelComponent', () => {
  let component: BoothinchargeLevelComponent;
  let fixture: ComponentFixture<BoothinchargeLevelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoothinchargeLevelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoothinchargeLevelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
