import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SupplyusercomponentComponent } from './supplyusercomponent.component';

describe('SupplyusercomponentComponent', () => {
  let component: SupplyusercomponentComponent;
  let fixture: ComponentFixture<SupplyusercomponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SupplyusercomponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplyusercomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
