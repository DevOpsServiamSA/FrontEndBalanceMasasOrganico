import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogSubproductoTodosComponent } from './dialog-subproducto-todos.component';

describe('DialogSubproductoTodosComponent', () => {
  let component: DialogSubproductoTodosComponent;
  let fixture: ComponentFixture<DialogSubproductoTodosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogSubproductoTodosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogSubproductoTodosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
