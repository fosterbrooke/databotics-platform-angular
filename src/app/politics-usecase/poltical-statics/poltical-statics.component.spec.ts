import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PolticalStaticsComponent } from './poltical-statics.component';

describe('PolticalStaticsComponent', () => {
  let component: PolticalStaticsComponent;
  let fixture: ComponentFixture<PolticalStaticsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PolticalStaticsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PolticalStaticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
