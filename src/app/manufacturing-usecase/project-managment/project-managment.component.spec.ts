import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectManagmentComponent } from './project-managment.component';

describe('ProjectManagmentComponent', () => {
  let component: ProjectManagmentComponent;
  let fixture: ComponentFixture<ProjectManagmentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectManagmentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectManagmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
