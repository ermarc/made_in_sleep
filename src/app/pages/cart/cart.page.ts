import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MainHeaderComponent } from 'src/app/components/main-header/main-header.component';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import { FloatingTagComponent } from 'src/app/components/floating-tag/floating-tag.component';
import { FloatingButtonComponent } from 'src/app/components/floating-button/floating-button.component';
import { FloatingTagInputNumComponent } from 'src/app/components/floating-tag-input-num/floating-tag-input-num.component';
import { StorageService } from 'src/app/services/storage.service';
import { PrestaShopService } from 'src/app/services/presta-shop.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, MainHeaderComponent, NavbarComponent, FloatingTagComponent, FloatingButtonComponent, FloatingTagInputNumComponent]
})
export class CartPage implements OnInit {
  products : any = [];
  cartPrice : string = 'Calculando...';

  constructor(private prestaShop: PrestaShopService, private storage: StorageService) { }

  ngOnInit() {
    this.getCartProducts();
    this.generateInputNumEventListener();
  }

  async getCartProducts() {
    let array = await this.storage.get('cartProducts');
    this.prestaShop.getProductsById(array).subscribe((response : any) => {
      response.products.forEach((product : any, index : any) => {
        this.products.push({productName: product.name, productId: product.id, productImageUrl: `https://marcariza.cat/api/images/products/${product.id}/${product.id_default_image}?ws_key=AAPPRHCE1V5PTNV3ZY8Q3L45N1UTZ9DC`, productPrice: product.price, productQuantity: array[index].productQuantity})
      });
      this.calculateTotalPrice();
    });
  }

  calculateTotalPrice() {
    let totalPrice : number = 0;

    this.products.forEach((product : any) => {
      totalPrice += +product.productPrice + 0;
    })

    this.cartPrice = (totalPrice + '€').replace(".", ",");;
  }

  finishShopping() {

  }

  generateInputNumEventListener() {
    document.getElementsByClassName("itemListing")[0].addEventListener("change", () => {
      this.calculateTotalPrice();
    })
  }

}
