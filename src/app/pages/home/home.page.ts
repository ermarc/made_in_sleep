import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MainHeaderComponent } from 'src/app/components/main-header/main-header.component';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import { ProductListingComponent } from 'src/app/components/product-listing/product-listing.component';
import { PrestaShopService } from 'src/app/services/presta-shop.service';
import { get } from 'http';

@Component({
    selector: 'app-home',
    templateUrl: './home.page.html',
    styleUrls: ['./home.page.scss'],
    standalone: true,
    imports: [IonicModule, CommonModule, FormsModule, MainHeaderComponent, NavbarComponent, ProductListingComponent]
})
export class HomePage implements OnInit {
	welcomeMessage : string = '';
	products : any;
	items: any = 	[
						{name: 'flores',
						imgSrc: 'https://www.clara.es/medio/2022/12/27/nombres-de-flores_1cbbabe1_1200x630.jpg'},
						{name: 'flores2',
						imgSrc: 'https://www.clara.es/medio/2022/12/27/nombres-de-flores_1cbbabe1_1200x630.jpg'},
						{name: 'flores3',
						imgSrc: 'https://www.clara.es/medio/2022/12/27/nombres-de-flores_1cbbabe1_1200x630.jpg'},
						{name: 'flores4',
						imgSrc: 'https://www.clara.es/medio/2022/12/27/nombres-de-flores_1cbbabe1_1200x630.jpg'},
						{name: 'flores5',
						imgSrc: 'https://www.clara.es/medio/2022/12/27/nombres-de-flores_1cbbabe1_1200x630.jpg'},
						{name: 'flores6',
						imgSrc: 'https://www.clara.es/medio/2022/12/27/nombres-de-flores_1cbbabe1_1200x630.jpg'},
						{name: 'flores7',
						imgSrc: 'https://www.clara.es/medio/2022/12/27/nombres-de-flores_1cbbabe1_1200x630.jpg'},
						{name: 'flores8',
						imgSrc: 'https://www.clara.es/medio/2022/12/27/nombres-de-flores_1cbbabe1_1200x630.jpg'},
						{name: 'flores9',
						imgSrc: 'https://www.clara.es/medio/2022/12/27/nombres-de-flores_1cbbabe1_1200x630.jpg'},
						{name: 'flores10',
						imgSrc: 'https://www.clara.es/medio/2022/12/27/nombres-de-flores_1cbbabe1_1200x630.jpg'},
						{name: 'flores11',
						imgSrc: 'https://www.clara.es/medio/2022/12/27/nombres-de-flores_1cbbabe1_1200x630.jpg'},
						{name: 'flores12',
						imgSrc: 'https://www.clara.es/medio/2022/12/27/nombres-de-flores_1cbbabe1_1200x630.jpg'},
					]

	

  	constructor(public prestaShop: PrestaShopService) { }

  	ngOnInit() { }

	async getProducts() {
		this.prestaShop.getProducts().subscribe((response : any) => {
			this.products = response.products;
		});
	}

	async ionViewWillEnter() {
		this.pickRandomWelcomeMessage();
		let temporalProducts : any = await this.getProducts();

		console.log(temporalProducts.length);
	}

	pickRandomWelcomeMessage() {
		let textOptions : Array<string> = [
			'¿Crisis materialista?<br>¡Lo que necesita, aquí!',
			'¿Dinero sin salida?<br>¡Blanqueo sin precedentes!',
			'¿Cómo, ya en los 40?<br>¡Sin problema, barra libre!',
			'¿Ruptura de pareja depresiva?<br>¡Almohadas abrazables!',
			'¿Promiscuidad sin control?<br>¡Sábanas sin parar!',
			'¿Ludópata y putero?<br>¡Cambie un vicio por otro mejor!',
			'¿Bloquear todas las amenazas?<br>¡Xavineta Cortina, WAF incluído!',
			'¿Desempleado y sin feng shui?<br>¡Sea sólo desempleado!',
			'¿Perdone, cómo dice?<br>Ah sí, soy el tío de la PokéDex...',
			'¿Mi trabajo? Vender trapos.<br>¿El suyo? ¡Al parecer leer esto!',
			'¿Quiere escuchar un chiste?<br>¡Estatuto de los Becarios!',
			'¿Uh? ¿Cómo es posible?<br>¿Este sitio sigue siendo rentable?',
			'¡Mezcla de algodón y poliéster!<br>¿De dónde? ¡Buena pregunta!',
			'¡Ultra absorbente! ¿Para qué?<br> Usted verá... ✊🏼🍌🍌💦💦💦',
			'¡Rescatamos su confort y energía!<br>¡Tal como Europa con nosotros!'
		]
		this.welcomeMessage = textOptions[Math.floor(Math.random() * textOptions.length)];
  	}

}
