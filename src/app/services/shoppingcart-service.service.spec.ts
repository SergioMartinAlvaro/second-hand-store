import { TestBed } from '@angular/core/testing';

import { ShoppingcartServiceService } from './shoppingcart-service.service';

describe('ShoppingcartServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ShoppingcartServiceService = TestBed.get(ShoppingcartServiceService);
    expect(service).toBeTruthy();
  });
});
