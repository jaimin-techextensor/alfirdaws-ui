import { TestBed } from '@angular/core/testing';

import { CampaignTypeService } from './campaign-type.service';

describe('CampaignTypeService', () => {
  let service: CampaignTypeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CampaignTypeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
