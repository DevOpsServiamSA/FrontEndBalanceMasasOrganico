import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogProductoProcesoArticuloComponent } from './dialog-producto-proceso-articulo.component';

describe('DialogProductoProcesoArticuloComponent', () => {
  let component: DialogProductoProcesoArticuloComponent;
  let fixture: ComponentFixture<DialogProductoProcesoArticuloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogProductoProcesoArticuloComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogProductoProcesoArticuloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
