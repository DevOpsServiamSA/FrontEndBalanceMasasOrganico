import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogResumenConsecutivoTodosComponent } from './dialog-resumen-consecutivo-todos.component';

describe('DialogResumenConsecutivoTodosComponent', () => {
  let component: DialogResumenConsecutivoTodosComponent;
  let fixture: ComponentFixture<DialogResumenConsecutivoTodosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogResumenConsecutivoTodosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogResumenConsecutivoTodosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
