import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogConsumoHiloDetalleComponent } from './dialog-consumo-hilo-detalle.component';

describe('DialogConsumoHiloDetalleComponent', () => {
  let component: DialogConsumoHiloDetalleComponent;
  let fixture: ComponentFixture<DialogConsumoHiloDetalleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogConsumoHiloDetalleComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogConsumoHiloDetalleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
