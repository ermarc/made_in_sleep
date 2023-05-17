import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PrestaShopService {

  constructor(public http: HttpClient) { }

  getProducts() {
    return this.http.get('https://marcariza.cat/api/products/?display=[name, id, id_default_image]&output_format=JSON&ws_key=AAPPRHCE1V5PTNV3ZY8Q3L45N1UTZ9DC');
  }

  getProductCart(productId : any) {
    return this.http.get(`https://marcariza.cat/api/products/?display=[name, id, id_default_image]&filter[id]=[${productId}]&output_format=JSON&ws_key=AAPPRHCE1V5PTNV3ZY8Q3L45N1UTZ9DC`);
  }

  getProduct(productId: string | null) {
    return this.http.get(`https://marcariza.cat/api/products/${productId}/?display=[name, description, price]&output_format=JSON&ws_key=AAPPRHCE1V5PTNV3ZY8Q3L45N1UTZ9DC`);
  }

  getProductWithImage(productId: string | null) {
    return this.http.get(`https://marcariza.cat/api/products/${productId}/?display=[name, description, price, id_default_image]&output_format=JSON&ws_key=AAPPRHCE1V5PTNV3ZY8Q3L45N1UTZ9DC`);
  }

  getProductImageArray(productId : string | null) {
    return this.http.get(`https://marcariza.cat/api/images/products/${productId}?ws_key=AAPPRHCE1V5PTNV3ZY8Q3L45N1UTZ9DC&output_format=JSON`);
  }

  getProductsByName(productName : string) {
    return this.http.get(`https://marcariza.cat/api/products/?display=[name, id, id_default_image]&filter[name]=%[${productName}]%&output_format=JSON&ws_key=AAPPRHCE1V5PTNV3ZY8Q3L45N1UTZ9DC`);
  }

  // AÑADIR PRICE SI HAY FALLO
  getProductsById(productIdArray : any) {

    let idString : string = this.buildFilterArray(productIdArray);

    return this.http.get(`https://marcariza.cat/api/products/?display=[name, id, id_default_image]&filter[id]=[${idString}]&output_format=JSON&ws_key=AAPPRHCE1V5PTNV3ZY8Q3L45N1UTZ9DC`);
  }

  getCategories() {
    return this.http.get('https://marcariza.cat/api/categories?display=[name,%20id]&filter[id]=[3,999]&output_format=JSON&ws_key=AAPPRHCE1V5PTNV3ZY8Q3L45N1UTZ9DC');
  }

  getCategoryProducts(categoryId : any) {
    return this.http.get(`https://marcariza.cat/api/products/?display=[name,%20id,%20id_default_image]&filter[id_category_default]=[${categoryId}]&output_format=JSON&ws_key=AAPPRHCE1V5PTNV3ZY8Q3L45N1UTZ9DC`)
  }

  getProductsByCategoryId(categoryId: any) {

  }

  getPriceByProductId(productId: any) {
    return this.http.get(`https://marcariza.cat/api/products/${productId}/?display=[price]&output_format=JSON&ws_key=AAPPRHCE1V5PTNV3ZY8Q3L45N1UTZ9DC`);
  }

  buildFilterArray(arrayToFilter : any) {
    let string = '';

    arrayToFilter.forEach((element : any) => {
      string += element.productId + '|';
    })

    return string;
  }


}
