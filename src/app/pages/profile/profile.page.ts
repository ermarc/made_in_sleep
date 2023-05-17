import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SmallHeaderComponent } from 'src/app/components/small-header/small-header.component';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import { CameraService } from 'src/app/services/camera.service';
import { StorageService } from 'src/app/services/storage.service';
import { Geolocation } from '@capacitor/geolocation';
import * as L from 'leaflet';
import { FloatingButtonComponent } from 'src/app/components/floating-button/floating-button.component';

@Component({
	selector: 'app-profile',
	templateUrl: './profile.page.html',
	styleUrls: ['./profile.page.scss'],
	standalone: true,
	imports: [IonicModule, CommonModule, FormsModule, SmallHeaderComponent, NavbarComponent, FloatingButtonComponent]
})
export class ProfilePage implements OnInit {

	userImage: string | undefined = '';
	userName: string = 'Cargando...';
	userDesc: string = 'Cargando...';
	geoMap: any = null;

	constructor(private camera: CameraService, private storage: StorageService) { }

	ngOnInit() {
		this.searchForAvailableLocalPhoto();
		this.generateGeoMap();
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
			.then(() => { this.storage.set('profilePhoto', this.camera.photos[0].webviewPath) })
			.then(() => { this.searchForAvailableLocalPhoto() })
	}

	generateGeoMap() {
		this.geoMap = L.map('map', {
			center: [40.46, -3.74],
			zoom: 7,
			attributionControl: false
		});

		const geoAssets = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
			maxZoom: 20,
			minZoom: 3
		});
  
    	geoAssets.addTo(this.geoMap);

		setTimeout(() => {
			this.geoMap.invalidateSize()
		}, 10)
	}
	
	async retrieveFromGeolocation() {
		const coordinates = await Geolocation.getCurrentPosition();
		this.geoMap.panTo(new L.LatLng(coordinates.coords.latitude, coordinates.coords.longitude));
	}


}
