import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';

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


    constructor(private router: Router) { }

    ngOnInit() {}

    goToProduct() {
      this.router.navigate(['/product']);
    }

}
