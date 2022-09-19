import { TestBed } from '@angular/core/testing';

import { campaignService } from './campaign.service';

describe('campaignService', () => {
  let service: campaignService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(campaignService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
