import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SmallHeaderComponent } from 'src/app/components/small-header/small-header.component';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import { StorageService } from 'src/app/services/storage.service';
import { PrestaShopService } from 'src/app/services/presta-shop.service';
import { GeoMapComponent } from 'src/app/components/geo-map/geo-map.component';
import { NgModule } from '@angular/core';
import { Router } from '@angular/router';

@Component({
	selector: 'app-checkout',
	templateUrl: './checkout.page.html',
	styleUrls: ['./checkout.page.scss'],
	standalone: true,
	imports: [IonicModule, CommonModule, FormsModule, SmallHeaderComponent, NavbarComponent, GeoMapComponent]
})
export class CheckoutPage implements OnInit {

	cartPrice: string = '0,00€';
	allCountries : Array<any> = [];
	formValues : any = {
		address : '',
		country : '',
		dni : '',
		alias : '',
		city : ''
	}

	@ViewChild(GeoMapComponent) jose : any;

	constructor(private storage: StorageService, private prestaShop: PrestaShopService, private router: Router) {
	}


	ngOnInit() {
		this.setAddressUpdaterInterval();
		this.getCountries();
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
					if (index == x.length-1) this.cartPrice = (Math.round(totalPrice * 100) / 100 + '€').replace(".", ",");
				});
			})
		} else {
			this.cartPrice = "Sin productos.";
		}
	}

	validateCheckout() {
		let count = 0;
		if (this.formValues.address.length > 0) count++;
		if (this.formValues.alias.length > 0) count++;
		if (this.formValues.city.length > 0) count++;
		if (this.formValues.country > 0) count++;
		if (this.formValues.country == 6) {
			if (this.formValues.dni.length == 9 && count == 4) this.submitCheckout();
		} else {
			if (count == 4) this.submitCheckout();
		}
	}

	setAddressUpdaterInterval() {
		setInterval(() => {
			this.formValues.address = this.jose.geoMapAddress;
		}, 1500)
	}

	submitCheckout() {
		let customerAddress = 
		`<prestashop xmlns:xlink="http://www.w3.org/1999/xlink">
			<address>
				<id_customer>4</id_customer>
		  		<id_country>${this.formValues.country}</id_country>
		  		<alias>${this.formValues.alias.slice(0, 31)}</alias>
		  		<lastname>Salami</lastname>
		  		<firstname>Capitán</firstname>
		  		<address1>${this.formValues.address.slice(0, 127)}</address1>
		 		<city>${this.formValues.city.slice(0, 63)}</city>
		  		<dni>${this.formValues.dni}</dni>  
			</address>
	  	</prestashop>`;

		this.prestaShop.postFullAddress(customerAddress).subscribe();
		this.resetCart();
		this.router.navigate(["/home"]);
	}

	getCountries() {
		this.prestaShop.getCountries().subscribe((response : any) => {
			response.countries.forEach((element : any) => {
				this.allCountries.push({countryId: element.id, countryName: element.name});
			})
		})
	}

	async resetCart() {
		await this.storage.set('cartProducts', null);
	}
}
