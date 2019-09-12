import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewPropertyPage } from './view-property.page';

describe('ViewPropertyPage', () => {
  let component: ViewPropertyPage;
  let fixture: ComponentFixture<ViewPropertyPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewPropertyPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewPropertyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
