import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { PrestaShopService } from 'src/app/services/presta-shop.service';

@Component({
  selector: 'productListing',
  templateUrl: './product-listing.component.html',
  styleUrls: ['./product-listing.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class ProductListingComponent  implements OnInit {

    @Input()
    products : any = '';


    constructor(private router: Router, public prestaShop: PrestaShopService) { }

    ngOnInit() {}

    goToProduct() {
      this.router.navigate(['/product']);
    }

    getProductImage(product : any) {
      let productImage : string = '';
      this.prestaShop.getProductImage(product.id, product.id_default_image).subscribe((response: any) => {
        productImage = response;
        console.log(response);
      })

      return productImage;
    } 

}
