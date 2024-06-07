import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InsertProdutosComponent } from './insert-produtos.component';

describe('InsertProdutosComponent', () => {
  let component: InsertProdutosComponent;
  let fixture: ComponentFixture<InsertProdutosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InsertProdutosComponent]
    });
    fixture = TestBed.createComponent(InsertProdutosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
