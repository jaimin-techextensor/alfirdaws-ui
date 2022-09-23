import { TestBed } from '@angular/core/testing';

import { SubscriptionModalService } from './subscription-modal.service';

describe('SubscriptionModalService', () => {
  let service: SubscriptionModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SubscriptionModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
