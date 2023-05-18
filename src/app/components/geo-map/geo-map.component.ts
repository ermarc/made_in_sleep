import { Component, OnInit } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';
import * as L from 'leaflet';
import { FloatingButtonComponent } from 'src/app/components/floating-button/floating-button.component';

@Component({
  selector: 'geoMap',
  templateUrl: './geo-map.component.html',
  styleUrls: ['./geo-map.component.scss'],
  standalone: true,
  imports: [FloatingButtonComponent]
})
export class GeoMapComponent  implements OnInit {
  geoMap: any = null;

  constructor() { }

  ngOnInit() {
    this.generateGeoMap();
  }

  generateGeoMap() {
		this.geoMap = L.map('map', {
			center: [40.46, -3.74],
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
	
	async retrieveFromGeolocation() {
		const coordinates = await Geolocation.getCurrentPosition();
		this.geoMap.panTo(new L.LatLng(coordinates.coords.latitude, coordinates.coords.longitude));
	}

}
