import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteHelpCSRComponent } from './route-help-csr.component';

describe('RouteHelpCSRComponent', () => {
  let component: RouteHelpCSRComponent;
  let fixture: ComponentFixture<RouteHelpCSRComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RouteHelpCSRComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RouteHelpCSRComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
