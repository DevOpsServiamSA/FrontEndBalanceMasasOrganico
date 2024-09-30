import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDetalleFibraReutilizableXArticuloComponent } from './dialog-detalle-fibra-reutilizable-x-articulo.component';

describe('DialogDetalleFibraReutilizableXArticuloComponent', () => {
  let component: DialogDetalleFibraReutilizableXArticuloComponent;
  let fixture: ComponentFixture<DialogDetalleFibraReutilizableXArticuloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogDetalleFibraReutilizableXArticuloComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogDetalleFibraReutilizableXArticuloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
