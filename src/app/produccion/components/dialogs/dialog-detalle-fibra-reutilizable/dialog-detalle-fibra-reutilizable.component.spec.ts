import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDetalleFibraReutilizableComponent } from './dialog-detalle-fibra-reutilizable.component';

describe('DialogDetalleFibraReutilizableComponent', () => {
  let component: DialogDetalleFibraReutilizableComponent;
  let fixture: ComponentFixture<DialogDetalleFibraReutilizableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogDetalleFibraReutilizableComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogDetalleFibraReutilizableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
