import { TestBed } from '@angular/core/testing';

import { AdoptionRequestService } from './adoption-request.service';

describe('AdoptionRequestService', () => {
  let service: AdoptionRequestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdoptionRequestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
