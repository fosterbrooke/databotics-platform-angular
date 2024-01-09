import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplychainUsecaseOneComponent } from './supplychain-usecase-one.component';

describe('SupplychainUsecaseOneComponent', () => {
  let component: SupplychainUsecaseOneComponent;
  let fixture: ComponentFixture<SupplychainUsecaseOneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupplychainUsecaseOneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplychainUsecaseOneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
