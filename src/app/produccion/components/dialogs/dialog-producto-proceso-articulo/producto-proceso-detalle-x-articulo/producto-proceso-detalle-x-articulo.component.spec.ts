import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductoProcesoDetalleXArticuloComponent } from './producto-proceso-detalle-x-articulo.component';

describe('ProductoProcesoDetalleXArticuloComponent', () => {
  let component: ProductoProcesoDetalleXArticuloComponent;
  let fixture: ComponentFixture<ProductoProcesoDetalleXArticuloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProductoProcesoDetalleXArticuloComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductoProcesoDetalleXArticuloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
