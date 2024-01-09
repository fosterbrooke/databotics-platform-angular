import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplychainUsecaseTwoComponent } from './supplychain-usecase-two.component';

describe('SupplychainUsecaseTwoComponent', () => {
  let component: SupplychainUsecaseTwoComponent;
  let fixture: ComponentFixture<SupplychainUsecaseTwoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupplychainUsecaseTwoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplychainUsecaseTwoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
