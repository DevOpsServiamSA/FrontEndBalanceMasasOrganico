import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogConsumoProveedorDetalleComponent } from './dialog-consumo-proveedor-detalle.component';

describe('DialogConsumoProveedorDetalleComponent', () => {
  let component: DialogConsumoProveedorDetalleComponent;
  let fixture: ComponentFixture<DialogConsumoProveedorDetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogConsumoProveedorDetalleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogConsumoProveedorDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
