import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SmallHeaderComponent } from 'src/app/components/small-header/small-header.component';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import { CameraService } from 'src/app/services/camera.service';
import { StorageService } from 'src/app/services/storage.service';

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
	userDesc: string = 'Cargando...';

	constructor(private camera: CameraService, private storage: StorageService) { }

	ngOnInit() {
		this.searchForAvailableLocalPhoto();
	}

	async searchForAvailableLocalPhoto() {
		let userImage = await this.storage.get('profilePhoto');
		console.log(userImage);
		if (userImage) {
			this.userImage = userImage;
		} else {
			this.userImage = 'assets/images/unknown.png';
		}
	}

	addPhotoToGallery() {
		this.camera.addNewToGallery()
			.then(() => { this.storage.set('profilePhoto', this.camera.photos[0].webviewPath) })
			.then(() => { this.searchForAvailableLocalPhoto() })
	}

}
