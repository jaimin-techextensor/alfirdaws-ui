import { TestBed } from '@angular/core/testing';

import { SubscriptionModelService } from './subscription-model.service';

describe('SubscriptionModelService', () => {
  let service: SubscriptionModelService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubscriptionModelService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
