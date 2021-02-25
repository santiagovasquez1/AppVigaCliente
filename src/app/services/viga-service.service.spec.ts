import { TestBed } from '@angular/core/testing';

import { VigaServiceService } from './viga-service.service';

describe('VigaServiceService', () => {
  let service: VigaServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VigaServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
