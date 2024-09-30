import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogResumenConsecutivoComponent } from './dialog-resumen-consecutivo.component';

describe('DialogResumenConsecutivoComponent', () => {
  let component: DialogResumenConsecutivoComponent;
  let fixture: ComponentFixture<DialogResumenConsecutivoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogResumenConsecutivoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogResumenConsecutivoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
