import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { SmallHeaderComponent } from 'src/app/components/small-header/small-header.component';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import { FloatingButtonComponent } from 'src/app/components/floating-button/floating-button.component';
import { PrestaShopService } from 'src/app/services/presta-shop.service';
import { StorageService } from 'src/app/services/storage.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.page.html',
  styleUrls: ['./product-detail.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, SmallHeaderComponent, NavbarComponent, FloatingButtonComponent]
})

export class ProductDetailPage implements OnInit {

  productImage: string = '/assets/images/productPlaceholder.webp';
  productName : string = 'Cargando...';
  productDesc : string = 'Cargando...';
  productId : string | null = '';
  productPrice : any = 'Cargando...';
  productImages : Array<string> = [];

  constructor(private route: ActivatedRoute, private router: Router, public prestaShop: PrestaShopService, private storage: StorageService) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
    this.getIdFromUrl();
    this.getProductById();
  }

  getIdFromUrl() {
    this.productId = this.route.snapshot.paramMap.get('id');
  }

  getProductById() {
    this.prestaShop.getProduct(this.productId).subscribe((response : any) => {
      this.productName = response.products[0].name;
      this.productDesc = response.products[0].description.replaceAll('<p>', '').replaceAll('</p>', '');
      this.productPrice = (Math.round(response.products[0].price * 100) / 100).toFixed(2).replace(".", ",");

      this.getProductImagesById();
    }, 
    (error : any) => {
      this.redirectToNotFound();
    })
  }

  getProductImagesById() {
    let imageObjects : any;
    
    this.prestaShop.getProductImageArray(this.productId).subscribe((response : any) => {
    },
    (error: any) => {
      imageObjects = error.error[Object.keys(error.error)[0]]

      for (let i = 1; i < imageObjects.length; i++) {
        this.productImages.push(`https://marcariza.cat/api/images/products/${this.productId}/${imageObjects[i].id}?ws_key=AAPPRHCE1V5PTNV3ZY8Q3L45N1UTZ9DC&output_format=JSON`)
      }
    })
  }

  async addProductToCart() {
    let cartProducts : any = await this.storage.get('cartProducts');

    if (cartProducts == null) {
      await this.storage.set('cartProducts', [{productId: this.productId, productQuantity: 1}])
    } else {
      let productIndex = this.getProductIndexInCart(cartProducts);
      console.log(productIndex);
      if (productIndex != -1) {
        cartProducts[productIndex].productQuantity++;
      } else {
        cartProducts.push({productId: this.productId, productQuantity: 1});
      }

      await this.storage.set('cartProducts', cartProducts);
    }

    this.router.navigate(['/home']);
  }

  getProductIndexInCart(cartProducts : any) {
    console.log(cartProducts)
    return cartProducts.findIndex((element : any) => element.productId == this.productId);
  }

  redirectToNotFound() {
    this.router.navigate(['/notfound']);
  }
}
