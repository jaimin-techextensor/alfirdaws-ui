import { TestBed } from '@angular/core/testing';

import { AddCampaignService } from './add-campaign.service';

describe('AddCampaignService', () => {
  let service: AddCampaignService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AddCampaignService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
