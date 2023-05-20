import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SmallHeaderComponent } from 'src/app/components/small-header/small-header.component';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import { CameraService } from 'src/app/services/camera.service';
import { StorageService } from 'src/app/services/storage.service';
import { PrestaShopService } from 'src/app/services/presta-shop.service';

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
	options: any;

	constructor(private camera: CameraService, private storage: StorageService, private prestaShop: PrestaShopService) { }

	ngOnInit() {
		this.searchForAvailableLocalPhoto();
		this.getCustomerInfo();
	}

	async searchForAvailableLocalPhoto() {
		let userImage = await this.storage.get('profilePhoto');
		if (userImage) {
			this.userImage = userImage;
		} else {
			this.userImage = 'assets/images/unknown.png';
		}
	}


	addPhotoToGallery() {
		this.camera.addNewToGallery()
			// .then(() => { this.storage.set('profilePhoto', this.camera.photos[0].webviewPath) })
			// .then(() => { this.searchForAvailableLocalPhoto() })
	}

	getCustomerInfo() {
		this.prestaShop.getCapitanSalamiCustomer().subscribe((response:any) => {
			this.userName = response.customer.firstname;
			this.userSurname = response.customer.lastname;
		})
	}
}