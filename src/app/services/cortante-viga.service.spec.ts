import { TestBed } from '@angular/core/testing';

import { CortanteVigaService } from './cortante-viga.service';

describe('CortanteVigaService', () => {
  let service: CortanteVigaService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CortanteVigaService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
