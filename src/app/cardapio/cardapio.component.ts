import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

interface CardapioItem {
  name: string;
  price: number;
  quantity: number;
}

@Component({
  selector: 'app-cardapio',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './cardapio.component.html',
  styleUrl: './cardapio.component.scss'
})
export class CardapioComponent {

  menuItems = [
    { name: 'Frango ao molho de laranja', description: 'Arroz temperado, enrolado em alga nori e recheado com salmão e vegetais', price: 120.00, image: '/frangomolholaranja.webp' },
    { name: 'Frango xadrez', description: 'Arroz temperado, enrolado em alga nori e recheado com salmão e vegetais', price: 130.00, image: '/frangoxadrez.webp' },
    { name: 'Guioza', description: 'Arroz temperado, enrolado em alga nori e recheado com salmão e vegetais', price: 100.00, image: '/guioza.webp' },
    { name: 'Hot roll', description: 'Arroz temperado, enrolado em alga nori e recheado com salmão e vegetais', price: 110.00, image: '/hotroll.webp' },
    { name: 'Nigiri', description: 'Arroz temperado, enrolado em alga nori e recheado com salmão e vegetais', price: 105.00, image: '/nigiri.webp' },
    { name: 'Sashimi', description: 'Arroz temperado, enrolado em alga nori e recheado com salmão e vegetais', price: 95.00, image: '/sashimi.webp' },
    { name: 'Sushi', description: 'Arroz temperado, enrolado em alga nori e recheado com salmão e vegetais', price: 115.00, image: '/sushi.webp' },
    { name: 'Urakami', description: 'Arroz temperado, enrolado em alga nori e recheado com salmão e vegetais', price: 125.00, image: '/urakami.webp' },
    { name: 'Yakisoba', description: 'Arroz temperado, enrolado em alga nori e recheado com salmão e vegetais', price: 140.00, image: '/yakisoba.webp' },
    { name: 'Rolinho primavera', description: 'Arroz temperado, enrolado em alga nori e recheado com salmão e vegetais', price: 90.00, image: '/rolinhoprimavera.webp' },
    { name: 'Arroz', description: 'Arroz temperado, enrolado em alga nori e recheado com salmão e vegetais', price: 100.00, image: '/friedrice.webp' },
    { name: 'Carne com brócolis', description: 'Arroz temperado, enrolado em alga nori e recheado com salmão e vegetais', price: 100.00, image: '/carnecombrocolis.webp' },
    { name: 'Hosomaki', description: 'Arroz temperado, enrolado em alga nori e recheado com salmão e vegetais', price: 140.00, image: '/hosomaki.jpg' },
    { name: 'Niguiri', description: 'Arroz temperado, enrolado em alga nori e recheado com salmão e vegetais', price: 150.00, image: '/niguiri.jpg' },
    { name: 'Futomaki', description: 'Arroz temperado, enrolado em alga nori e recheado com salmão e vegetais', price: 100.00, image: '/futomaki.jpg' },
  ];

  cart: CardapioItem[] = [];
  isModalOpen = false;
  address = '';
  showAddressWarning = false;

  get total(): number {
    return this.cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }

  openModal() {
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  addToCart(name: string, price: number) {
    const existingItem = this.cart.find(item => item.name === name);
    if(existingItem) {
      existingItem.quantity += 1;
    } else {
      this.cart.push({ name, price, quantity: 1});
    }
  }

  removeItemCart(name: string) {
    const index = this.cart.findIndex(item => item.name === name);
    if(index !== -1) {
      if(this.cart[index].quantity > 1) {
        this.cart[index].quantity -= 1;
      } else {
        this.cart.splice(index, 1);
      }
    }
  }

  checkout() {
    if(this.cart.length === 0) return;

    if(!this.address.trim()) {
      this.showAddressWarning = true;
      return;
    }

    const cartItems = this.cart.map(item => `${item.name} Quantidade: (${item.quantity}) Preço: R$${item.price}`).join(' | ');

    const phone = '5511996221043';
    const message = encodeURIComponent(cartItems + ` Endereço: ${this.address}`);

    window.open(`https://wa.me/${phone}?text=${message}`, '_blank');

    this.cart = [];
    this.address = '';
    this.showAddressWarning = false;
  }
}

