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
import { Share } from '@capacitor/share';

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

  // Obtiene la ID mediante parámetro de URL.
  getIdFromUrl() {
    this.productId = this.route.snapshot.paramMap.get('id');
  }

  // Obtiene el producto mediante la ID recibida.
  //
  // En caso de obtener respuesta afirmativa, se inyectarán los valores recibidos en las variables correspondientes.
  // En caso negativo, se llamará a redirectToNotFound().
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

  // NO UTILIZADO, IGNORAR.
  //
  // Llamada al servicio de PrestaShop para obtener una colección de imágenes.
  // Utilizar con Slider dentro de la sección de imágenes de producto.
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

  // Añade un producto al carrito.
  //
  // Si el carrito está vacío o inicializado como null, inicializará el array.
  // Si el array está inicializado, buscará si dicho producto ya existe.
  //
  // En caso de no estarlo, añade un nuevo objeto con el ID del producto y cantidad 1.
  // En caso de estarlo, obtendrá su cantidad existente y la incrementará en 1 unidad.
  async addProductToCart() {
    let cartProducts : any = await this.storage.get('cartProducts');

    if (cartProducts == null) {
      await this.storage.set('cartProducts', [{productId: this.productId, productQuantity: 1}]);
    } else {
      let productIndex = this.getProductIndexInCart(cartProducts);
      if (productIndex != -1) {
        cartProducts[productIndex].productQuantity++;
      } else {
        cartProducts.push({productId: this.productId, productQuantity: 1});
      }

      await this.storage.set('cartProducts', cartProducts);
    }
  }

  getProductIndexInCart(cartProducts : any) {
    return cartProducts.findIndex((element : any) => element.productId == this.productId);
  }

  // Esta función es llamada si el ID de un producto no corresponde con ninguno en la base de datos de PS.
  // Redirige a una página de 'Not found'.
  redirectToNotFound() {
    this.router.navigate(['/notfound']);
  }

  async shareProduct() {
    if ((await Promise.resolve(Share.canShare())).value) {
      await Share.share({
        title: `Comparte a ${this.productName}`,
        url: `${this.productImages[0]}`
      });
    }
  }
}
