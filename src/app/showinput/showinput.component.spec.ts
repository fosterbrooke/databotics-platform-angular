import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ShowinputComponent } from './showinput.component';

describe('ShowinputComponent', () => {
  let component: ShowinputComponent;
  let fixture: ComponentFixture<ShowinputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ShowinputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ShowinputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
