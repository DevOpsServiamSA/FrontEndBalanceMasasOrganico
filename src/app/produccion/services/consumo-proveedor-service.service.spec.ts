import { TestBed } from '@angular/core/testing';

import { ConsumoProveedorServiceService } from './consumo-proveedor-service.service';

describe('ConsumoProveedorServiceService', () => {
  let service: ConsumoProveedorServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConsumoProveedorServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
