import { TestBed } from '@angular/core/testing';

import { PriceModelService } from './price-model.service';

describe('PriceModelService', () => {
  let service: PriceModelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PriceModelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
