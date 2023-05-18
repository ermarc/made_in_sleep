import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SmallHeaderComponent } from 'src/app/components/small-header/small-header.component';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import { StorageService } from 'src/app/services/storage.service';
import { PrestaShopService } from 'src/app/services/presta-shop.service';
import { GeoMapComponent } from 'src/app/components/geo-map/geo-map.component';

@Component({
	selector: 'app-checkout',
	templateUrl: './checkout.page.html',
	styleUrls: ['./checkout.page.scss'],
	standalone: true,
	imports: [IonicModule, CommonModule, FormsModule, SmallHeaderComponent, NavbarComponent, GeoMapComponent]
})
export class CheckoutPage implements OnInit {

	cartPrice: string = '0,00€';
	geoMapAddress: string = '';

	@ViewChild(GeoMapComponent) jose : any;

	constructor(private storage: StorageService, private prestaShop: PrestaShopService) {

	}

	ngOnInit() {
		this.soda();
	}

	ionViewWillEnter() {
		this.calculateTotalPrice();
	}

	async calculateTotalPrice() {
		let array = await this.storage.get('cartProducts');
		let totalPrice: number = 0;

		if (array != null) {
			let arrayPromises : Array<any> = [];
			array.forEach((element: any) => {
				arrayPromises.push(this.prestaShop.getPriceByProductId(element.productId).toPromise());
			})
			
			Promise.all(arrayPromises).then(x => {
				x.forEach((element, index) => {
					totalPrice += Number(element.products[0].price) * array[index].productQuantity;
					if (index == x.length-1) this.cartPrice = (totalPrice + '€').replace(".", ",");
				});
			})
		} else {
			this.cartPrice = "Sin productos.";
		}
	}

	soda() {
		setInterval(() => {
			this.geoMapAddress = this.jose.geoMapAddress;
		}, 1500)
	}
}
