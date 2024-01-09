import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CaterpillarOverviewComponent } from './caterpillar-overview.component';

describe('CaterpillarOverviewComponent', () => {
  let component: CaterpillarOverviewComponent;
  let fixture: ComponentFixture<CaterpillarOverviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CaterpillarOverviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CaterpillarOverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
