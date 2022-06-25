import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailSignPage } from './detail-sign.page';

describe('DetailSignPage', () => {
  let component: DetailSignPage;
  let fixture: ComponentFixture<DetailSignPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DetailSignPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailSignPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
