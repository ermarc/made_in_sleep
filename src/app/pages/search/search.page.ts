import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MainHeaderComponent } from 'src/app/components/main-header/main-header.component';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import { SearchBarComponent } from 'src/app/components/search-bar/search-bar.component';
import { ProductListingComponent } from 'src/app/components/product-listing/product-listing.component';
import { PrestaShopService } from 'src/app/services/presta-shop.service';
import { FloatingMessageComponent } from 'src/app/components/floating-message/floating-message.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, MainHeaderComponent, NavbarComponent, SearchBarComponent,ProductListingComponent, FloatingMessageComponent]
})
export class SearchPage implements OnInit {
  items: any;
  products : Array<Object> = [];
  searchStarted : boolean = false;

  constructor(public prestaShop: PrestaShopService) { }

  ngOnInit() {
  }

  startSearch() {
    this.getProducts();
  }

  getSearchBarInfo() {
    let searchBar : any = document.getElementsByClassName('searchBarInput')[0];
    return searchBar.value;
  }

  async getProducts() {
		let productArray : Array<Object> = [];

		this.prestaShop.getProductsByName(this.getSearchBarInfo()).subscribe((response : any) => {
      if (response.products != undefined) {
        response.products.forEach((product : any) => {
          productArray.push(
            {
              name: product.name,
              id: product.id, 
              productImageUrl: `https://marcariza.cat/api/images/products/${product.id}/${product.id_default_image}?ws_key=AAPPRHCE1V5PTNV3ZY8Q3L45N1UTZ9DC`,
            });

        });
      }
			this.products = productArray;
      this.searchStarted = true;
		});
	}

}
