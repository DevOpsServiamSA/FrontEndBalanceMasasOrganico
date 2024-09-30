import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDetalleHiloXArticuloComponent } from './dialog-detalle-hilo-x-articulo.component';

describe('DialogDetalleHiloXArticuloComponent', () => {
  let component: DialogDetalleHiloXArticuloComponent;
  let fixture: ComponentFixture<DialogDetalleHiloXArticuloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogDetalleHiloXArticuloComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogDetalleHiloXArticuloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
