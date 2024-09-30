import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogResumenConsecutivoSalidaTodosComponent } from './dialog-resumen-consecutivo-salida-todos.component';

describe('DialogResumenConsecutivoSalidaTodosComponent', () => {
  let component: DialogResumenConsecutivoSalidaTodosComponent;
  let fixture: ComponentFixture<DialogResumenConsecutivoSalidaTodosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogResumenConsecutivoSalidaTodosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogResumenConsecutivoSalidaTodosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
