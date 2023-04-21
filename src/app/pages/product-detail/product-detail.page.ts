import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { SmallHeaderComponent } from 'src/app/components/small-header/small-header.component';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import { FloatingButtonComponent } from 'src/app/components/floating-button/floating-button.component';
import { PrestaShopService } from 'src/app/services/presta-shop.service';

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
  productImages : Array<string> = [];

  constructor(private route: ActivatedRoute, public prestaShop: PrestaShopService) { }

  ngOnInit() {
    this.getIdFromUrl();
    this.getProductById();
    this.getProductImagesById();
  }

  getIdFromUrl() {
    this.productId = this.route.snapshot.paramMap.get('id');
  }

  getProductById() {
    this.prestaShop.getProduct(this.productId).subscribe((response : any) => {
      this.productName = response.products[0].name;
      this.productDesc = response.products[0].description.replaceAll('<p>', '').replaceAll('</p>', '');
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

}
