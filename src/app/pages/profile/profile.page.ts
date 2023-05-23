import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SmallHeaderComponent } from 'src/app/components/small-header/small-header.component';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import { CameraService } from 'src/app/services/camera.service';
import { StorageService } from 'src/app/services/storage.service';
import { PrestaShopService } from 'src/app/services/presta-shop.service';
import { ViewChild } from '@angular/core';

@Component({
	selector: 'app-profile',
	templateUrl: './profile.page.html',
	styleUrls: ['./profile.page.scss'],
	standalone: true,
	imports: [IonicModule, CommonModule, FormsModule, SmallHeaderComponent, NavbarComponent]
})
export class ProfilePage implements OnInit {

	userImage: string | undefined = '';
	userName: string = 'Cargando...';
	userSurname: string = 'Cargando...';
	testOpen : boolean = false;

	constructor(private camera: CameraService, private storage: StorageService, private prestaShop: PrestaShopService) { }

	ngOnInit() {
		this.searchForAvailableLocalPhoto();
		this.getCustomerInfo();
	}

	// Busca la fotografía actualmente existente dentro del localStorage.
	//
	// En caso de encontrarla, servirá su Base64 como src de la imagen.
	// En caso de no encontrarla, servirá unknown.png como src de la imagen.
	async searchForAvailableLocalPhoto() {
		let userImage = await this.storage.get('profilePhoto');
		if (userImage) {
			this.userImage = userImage;
		} else {
			this.userImage = 'assets/images/unknown.png';
		}
	}

	// Llamada al servicio de la cámara para obtener la información de la fotografía sacada dentro del modal.
	// Procede a actualizar el HTML para mostrar que la foto ha sido actualizada.
	async addPhotoToGallery() {
		this.closePopover();
		await this.storage.set('profilePhoto', await this.camera.addNewToGallery());
		await this.searchForAvailableLocalPhoto();
		
	}

	// Elimina la foto de perfil actual en el localStorage.
	// Procede a actualizar el HTML para mostrar que la foto ha sido eliminada.
	async removeProfilePhoto() {
		this.closePopover();
		await this.storage.set('profilePhoto', undefined);
		await this.searchForAvailableLocalPhoto();
	}

	// Cierra el ION-POPOVER existente.
	closePopover() {
		document.getElementsByTagName('ion-popover')[0].dismiss();
	}

	// Llamada a la API para obtener información de cliente.
	// Está hardcodeado para obtener siempre información del Capitán Salami. 
	getCustomerInfo() {
		this.prestaShop.getCapitanSalamiCustomer().subscribe((response:any) => {
			this.userName = response.customer.firstname;
			this.userSurname = response.customer.lastname;
		})
	}
}