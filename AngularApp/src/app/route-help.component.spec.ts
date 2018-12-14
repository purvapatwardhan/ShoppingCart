import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RouteHelpComponent } from './route-help.component';

describe('RouteHelpComponent', () => {
  let component: RouteHelpComponent;
  let fixture: ComponentFixture<RouteHelpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RouteHelpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RouteHelpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
