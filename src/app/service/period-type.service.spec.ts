import { TestBed } from '@angular/core/testing';

import { PeriodTypeService } from './period-type.service';

describe('PeriodService', () => {
  let service: PeriodTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PeriodTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
