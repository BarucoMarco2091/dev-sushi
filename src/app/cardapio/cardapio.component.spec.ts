import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardapioComponent } from './cardapio.component';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

describe('CardapioComponent', () => {
  let component: CardapioComponent;
  let fixture: ComponentFixture<CardapioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardapioComponent, FormsModule, CommonModule],
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardapioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('deve adicionar item ao carrinho', () => {
  component.addToCart('Sushi', 115.00);
  expect(component.cart.length).toBe(1);
  expect(component.cart[0].name).toBe('Sushi');
  expect(component.cart[0].quantity).toBe(1);
  });

  it('deve aumentar a quantidade do item existente no carrinho', () => {
    component.addToCart('Sushi', 115.00);
    component.addToCart('Sushi', 115.00);
    expect(component.cart.length).toBe(1);
    expect(component.cart[0].quantity).toBe(2);
  })

  it('deve remover item do carrinho', () => {
    component.addToCart('Sushi', 115.00);
    component.removeItemCart('Sushi');
    expect(component.cart.length).toBe(0);
  });

  it('deve diminuir quantidade do item antes de remover', () => {
    component.addToCart('Sushi', 115.00);
    component.addToCart('Nigiri', 105.00);
    component.removeItemCart('Sushi');
    expect(component.cart.length).toBe(1);
    expect(component.cart[0].quantity).toBe(1);
  });

  it('deve calcular o total do carrinho', () => {
    component.addToCart('Sushi', 115.00);
    component.addToCart('Urakami', 125.00);
    expect(component.total).toBe(240.00);
  });
});
