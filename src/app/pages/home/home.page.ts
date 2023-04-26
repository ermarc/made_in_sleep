import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MainHeaderComponent } from 'src/app/components/main-header/main-header.component';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import { ProductListingComponent } from 'src/app/components/product-listing/product-listing.component';
import { PrestaShopService } from 'src/app/services/presta-shop.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.page.html',
    styleUrls: ['./home.page.scss'],
    standalone: true,
    imports: [IonicModule, CommonModule, FormsModule, MainHeaderComponent, NavbarComponent, ProductListingComponent]
})
export class HomePage implements OnInit {
	welcomeMessage : string = '';
	products : Array<Object> = [];

  	constructor(public prestaShop: PrestaShopService) { }

  	ngOnInit() { }

	async getProducts() {
		let productArray : Array<Object> = [];

		this.prestaShop.getProducts().subscribe((response : any) => {
			response.products.forEach((product : any) => {
				productArray.push(
					{
						name: product.name,
						id: product.id, 
						productImageUrl: `https://marcariza.cat/api/images/products/${product.id}/${product.id_default_image}?ws_key=AAPPRHCE1V5PTNV3ZY8Q3L45N1UTZ9DC`,
					});

			});

			this.products = productArray;
		});
	}

	ionViewWillEnter() {
		this.pickRandomWelcomeMessage();
		this.getProducts();
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
