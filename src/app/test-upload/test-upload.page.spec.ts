import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TestUploadPage } from './test-upload.page';

describe('TestUploadPage', () => {
  let component: TestUploadPage;
  let fixture: ComponentFixture<TestUploadPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TestUploadPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TestUploadPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
