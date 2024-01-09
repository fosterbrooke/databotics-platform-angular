import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProdutionusecaseComponent } from './produtionusecase.component';

describe('ProdutionusecaseComponent', () => {
  let component: ProdutionusecaseComponent;
  let fixture: ComponentFixture<ProdutionusecaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProdutionusecaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProdutionusecaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
