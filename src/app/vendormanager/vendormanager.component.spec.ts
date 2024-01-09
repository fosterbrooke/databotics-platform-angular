import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VendormanagerComponent } from './vendormanager.component';

describe('VendormanagerComponent', () => {
  let component: VendormanagerComponent;
  let fixture: ComponentFixture<VendormanagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VendormanagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VendormanagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
