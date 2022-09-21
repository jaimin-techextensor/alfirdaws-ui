import { TestBed } from '@angular/core/testing';

import { ReachTypeService } from './reach-type.service';

describe('ReachService', () => {
  let service: ReachTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReachTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
