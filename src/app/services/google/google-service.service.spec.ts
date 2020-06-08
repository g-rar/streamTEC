import { TestBed } from '@angular/core/testing';

import { GoogleServiceService } from './google-service.service';

describe('GoogleServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GoogleServiceService = TestBed.get(GoogleServiceService);
    expect(service).toBeTruthy();
  });
});
