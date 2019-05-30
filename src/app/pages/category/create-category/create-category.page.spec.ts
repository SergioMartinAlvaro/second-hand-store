import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCategoryPage } from './create-category.page';

describe('CreateCategoryPage', () => {
  let component: CreateCategoryPage;
  let fixture: ComponentFixture<CreateCategoryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateCategoryPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCategoryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
