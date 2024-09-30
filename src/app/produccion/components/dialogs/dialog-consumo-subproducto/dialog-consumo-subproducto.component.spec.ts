import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogConsumoSubproductoComponent } from './dialog-consumo-subproducto.component';

describe('DialogConsumoSubproductoComponent', () => {
  let component: DialogConsumoSubproductoComponent;
  let fixture: ComponentFixture<DialogConsumoSubproductoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogConsumoSubproductoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogConsumoSubproductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
