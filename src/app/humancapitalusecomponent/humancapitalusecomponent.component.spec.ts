import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HumancapitalusecomponentComponent } from './humancapitalusecomponent.component';

describe('HumancapitalusecomponentComponent', () => {
  let component: HumancapitalusecomponentComponent;
  let fixture: ComponentFixture<HumancapitalusecomponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HumancapitalusecomponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HumancapitalusecomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
