import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogLoteXProveedorComponent } from './dialog-lote-x-proveedor.component';

describe('DialogLoteXProveedorComponent', () => {
  let component: DialogLoteXProveedorComponent;
  let fixture: ComponentFixture<DialogLoteXProveedorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogLoteXProveedorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogLoteXProveedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
