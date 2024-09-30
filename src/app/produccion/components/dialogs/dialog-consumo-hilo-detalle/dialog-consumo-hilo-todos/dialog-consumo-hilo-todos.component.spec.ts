import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogConsumoHiloTodosComponent } from './dialog-consumo-hilo-todos.component';

describe('DialogConsumoHiloTodosComponent', () => {
  let component: DialogConsumoHiloTodosComponent;
  let fixture: ComponentFixture<DialogConsumoHiloTodosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogConsumoHiloTodosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogConsumoHiloTodosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
