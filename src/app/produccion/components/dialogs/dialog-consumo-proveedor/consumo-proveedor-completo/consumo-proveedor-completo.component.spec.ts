import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsumoProveedorCompletoComponent } from './consumo-proveedor-completo.component';

describe('ConsumoProveedorCompletoComponent', () => {
  let component: ConsumoProveedorCompletoComponent;
  let fixture: ComponentFixture<ConsumoProveedorCompletoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ConsumoProveedorCompletoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ConsumoProveedorCompletoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
