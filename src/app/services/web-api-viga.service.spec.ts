import { TestBed } from '@angular/core/testing';

import { WebApiVigaService } from './web-api-viga.service';

describe('WebApiVigaService', () => {
  let service: WebApiVigaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WebApiVigaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
