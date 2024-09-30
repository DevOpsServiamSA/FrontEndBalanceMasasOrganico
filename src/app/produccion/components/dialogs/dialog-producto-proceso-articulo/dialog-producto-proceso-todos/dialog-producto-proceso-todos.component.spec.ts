import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogProductoProcesoTodosComponent } from './dialog-producto-proceso-todos.component';

describe('DialogProductoProcesoTodosComponent', () => {
  let component: DialogProductoProcesoTodosComponent;
  let fixture: ComponentFixture<DialogProductoProcesoTodosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogProductoProcesoTodosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogProductoProcesoTodosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
