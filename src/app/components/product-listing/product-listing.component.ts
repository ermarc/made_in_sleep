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

    ngOnInit() {
      
    }

    goToProduct(productId : number) {
      this.router.navigate([`/product/${productId}`]);
    }

    // checkIfThereAreProducts() {
    //   return (this.products ? true : false);
    // }
}
