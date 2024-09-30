import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDetalleFibraReutilizableTodosComponent } from './dialog-detalle-fibra-reutilizable-todos.component';

describe('DialogDetalleFibraReutilizableTodosComponent', () => {
  let component: DialogDetalleFibraReutilizableTodosComponent;
  let fixture: ComponentFixture<DialogDetalleFibraReutilizableTodosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogDetalleFibraReutilizableTodosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogDetalleFibraReutilizableTodosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
