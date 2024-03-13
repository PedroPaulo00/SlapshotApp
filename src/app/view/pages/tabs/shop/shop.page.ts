import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.page.html',
  styleUrls: ['./shop.page.scss'],
})
export class ShopPage implements OnInit {
  products: any[] = [];
  cartItems: any[] = [];
  totalPrice: number = 0;

  constructor(private firestore: AngularFirestore, private router: Router, private navCtrl: NavController) { }

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    // Supondo que os detalhes dos produtos estejam disponíveis em um serviço ou em uma fonte de dados.
    // Aqui, vamos adicionar manualmente alguns produtos de exemplo para os times especificados.

    this.products.push({
      name: 'Regata',
      image: 'https://firebasestorage.googleapis.com/v0/b/slapshot-76529.appspot.com/o/regata.jpg?alt=media&token=ca8ea31d-fa47-48cc-b978-5fdd65f7d645',
      price: 'R$ 319,90',
      quantity: 0  // Começando com quantidade zero
    });

    this.products.push({
      name: 'Bermuda',
      image: 'https://firebasestorage.googleapis.com/v0/b/slapshot-76529.appspot.com/o/bermuda.webp?alt=media&token=edca1499-4bb4-43da-aafb-ac55121243bd',
      price: 'R$ 219,90',
      quantity: 0  // Começando com quantidade zero
    });

    this.products.push({
      name: 'Moletom',
      image: 'https://firebasestorage.googleapis.com/v0/b/slapshot-76529.appspot.com/o/moletom.webp?alt=media&token=b91ff63a-6d67-41fd-89e9-4818ddb63898',
      price: '520,00 ',
      quantity: 0
    });

    this.products.push({
      name: 'Jaqueta',
      image: 'https://firebasestorage.googleapis.com/v0/b/slapshot-76529.appspot.com/o/jaqueta.webp?alt=media&token=9fa34169-8183-4484-87c6-08209a8824fc',
      price: '650,00',
      quantity: 0
    });
  }

  increaseQuantity(product) {
    product.quantity++;
    this.updateCart();
  }
  
  decreaseQuantity(product) {
    if (product.quantity > 0) {
      product.quantity--;
      if (product.quantity === 0) {
        this.removeFromCart(product);
      }
      this.updateCart();
    }
  }
  
  
  removeFromCart(product) {
    const index = this.cartItems.indexOf(product);
    if (index !== -1) {
      this.cartItems.splice(index, 1);
      this.updateCart(); // Remova o argumento 'product' aqui
    }
  }
  

  addToCart(product) {
    // Adiciona o produto ao carrinho apenas se a quantidade for maior que zero
    if (product.quantity > 0) {
      this.cartItems.push(product);
      this.updateCart();
    }
  }
  

  updateCart() {
    try {
      this.totalPrice = this.cartItems.reduce((total, item) => {
        const price = item.price.replace('R$', '').replace(',', '.').trim(); // Remover o 'R$', substituir vírgulas por pontos e remover espaços em branco
        const itemPrice = parseFloat(price);
        return total + (itemPrice * item.quantity);
      }, 0);
    } catch (error) {
      console.error('Erro ao calcular o preço total do carrinho:', error);
      this.totalPrice = 0; // Definir o preço total como 0 em caso de erro
    }
  }

  irParaConfig() {
    this.router.navigate(['/tabs/config']); 
  }
}
