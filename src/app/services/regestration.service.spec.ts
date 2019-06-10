import { TestBed } from '@angular/core/testing';

import { RegestrationService } from './regestration.service';

describe('RegestrationService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: RegestrationService = TestBed.get(RegestrationService);
    expect(service).toBeTruthy();
  });
});
