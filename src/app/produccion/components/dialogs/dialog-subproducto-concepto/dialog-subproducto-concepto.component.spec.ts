import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogSubproductoConceptoComponent } from './dialog-subproducto-concepto.component';

describe('DialogSubproductoConceptoComponent', () => {
  let component: DialogSubproductoConceptoComponent;
  let fixture: ComponentFixture<DialogSubproductoConceptoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DialogSubproductoConceptoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogSubproductoConceptoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
