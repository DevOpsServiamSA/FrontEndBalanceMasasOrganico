import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogResumenConsecutivoSalidaComponent } from './dialog-resumen-consecutivo-salida.component';

describe('DialogResumenConsecutivoSalidaComponent', () => {
  let component: DialogResumenConsecutivoSalidaComponent;
  let fixture: ComponentFixture<DialogResumenConsecutivoSalidaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogResumenConsecutivoSalidaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogResumenConsecutivoSalidaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
