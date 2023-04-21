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

  getProduct(productId: string | null) {
    return this.http.get(`https://marcariza.cat/api/products/${productId}/?display=[name, description]&output_format=JSON&ws_key=AAPPRHCE1V5PTNV3ZY8Q3L45N1UTZ9DC`);
  }

  getProductImageArray(productId : string | null) {
    return this.http.get(`https://marcariza.cat/api/images/products/${productId}?ws_key=AAPPRHCE1V5PTNV3ZY8Q3L45N1UTZ9DC&output_format=JSON`);
  }

  // getProductImageArray(productId : string | null) {
  //   return this.http.get(`https://marcariza.cat/api/products/23?display=[id_default_combination]&output_format=JSON&ws_key=AAPPRHCE1V5PTNV3ZY8Q3L45N1UTZ9DC`)
  // }
}
