import { TestBed } from '@angular/core/testing';

import { VatTypeService } from './vat-type.service';

describe('VatTypeService', () => {
  let service: VatTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VatTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
