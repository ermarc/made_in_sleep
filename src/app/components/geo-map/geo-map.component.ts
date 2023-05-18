import { Component, EventEmitter, OnInit } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import * as L from 'leaflet';
import { FloatingButtonComponent } from 'src/app/components/floating-button/floating-button.component';
import { Output } from '@angular/core';

@Component({
	selector: 'geoMap',
	templateUrl: './geo-map.component.html',
	styleUrls: ['./geo-map.component.scss'],
	standalone: true,
	imports: [FloatingButtonComponent]
})
export class GeoMapComponent implements OnInit {
	geoMap: any = null;
	coords: any = {latitude: 40.46, longitude: -3.74};
	geoMapAddress: string = '';

	@Output() newItemEvent = new EventEmitter<string>();

	constructor() { }

	ngOnInit() {
		this.generateGeoMap();
		this.createCoordRetrieverInterval();
	}

	generateGeoMap() {
		this.geoMap = L.map('map', {
			center: [this.coords.latitude, this.coords.longitude],
			zoom: 11,
			attributionControl: false
		});

		const geoAssets = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
			maxZoom: 20,
			minZoom: 5
		});

		geoAssets.addTo(this.geoMap);

		setTimeout(() => {
			this.geoMap.invalidateSize()
		}, 10)
	}

	async retrieveCoordsFromGeolocation() {
		let geolocationData = (await Geolocation.getCurrentPosition()).coords;
		this.coords = {lat: geolocationData.latitude, lng: geolocationData.longitude};
		this.geoMap.panTo(new L.LatLng(this.coords.lat, this.coords.lng));
	}

	retrieveAddressFromCoords() {
		fetch(`https://nominatim.openstreetmap.org/search.php?q=${this.coords.lat},${this.coords.lng}&polygon_geojson=1&format=json`)
			.then(response => response.json())
			.then(j => { 
				this.geoMapAddress = j[0].display_name;
				// this.newItemEvent.emit(j[0].display_name);
			})
	}

	createCoordRetrieverInterval() {
		setInterval(() => {
			this.coords = this.geoMap.getCenter();
			this.retrieveAddressFromCoords();
		}, 1500);
	}

}
