import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDetalleHiloXLoteHijoComponent } from './dialog-detalle-hilo-x-lote-hijo.component';

describe('DialogDetalleHiloXLoteHijoComponent', () => {
  let component: DialogDetalleHiloXLoteHijoComponent;
  let fixture: ComponentFixture<DialogDetalleHiloXLoteHijoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogDetalleHiloXLoteHijoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogDetalleHiloXLoteHijoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
