import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogConsumoProveedorComponent } from './dialog-consumo-proveedor.component';

describe('DialogConsumoProveedorComponent', () => {
  let component: DialogConsumoProveedorComponent;
  let fixture: ComponentFixture<DialogConsumoProveedorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogConsumoProveedorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogConsumoProveedorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
