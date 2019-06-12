import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PayShoppingCartPage } from './pay-shopping-cart.page';

describe('PayShoppingCartPage', () => {
  let component: PayShoppingCartPage;
  let fixture: ComponentFixture<PayShoppingCartPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PayShoppingCartPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PayShoppingCartPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
