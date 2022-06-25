import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginContinuePage } from './login-continue.page';

describe('LoginContinuePage', () => {
  let component: LoginContinuePage;
  let fixture: ComponentFixture<LoginContinuePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginContinuePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginContinuePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
