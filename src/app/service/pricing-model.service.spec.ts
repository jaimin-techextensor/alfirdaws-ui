import { TestBed } from '@angular/core/testing';

import { PricingModelService } from './pricing-model.service';

describe('PriceModelService', () => {
  let service: PricingModelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PricingModelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
