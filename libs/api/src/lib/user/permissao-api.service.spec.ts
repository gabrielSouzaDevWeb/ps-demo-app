import { TestBed } from '@angular/core/testing';

import { PermissaoApiService } from './permissao-api.service';

describe('PermissaoApiService', () => {
  let service: PermissaoApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PermissaoApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
