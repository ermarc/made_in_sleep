import { AfterViewInit, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SmallHeaderComponent } from 'src/app/components/small-header/small-header.component';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import { Geolocation } from '@capacitor/geolocation';
import * as L from 'leaflet';

@Component({
  selector: 'app-geotest',
  templateUrl: './geotest.page.html',
  styleUrls: ['./geotest.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, SmallHeaderComponent, NavbarComponent]
})
export class GeotestPage implements OnInit {

  constructor() { }

  ngOnInit() {
    this.initMap();
    this.somethingCooler();
  }

  something() {
    console.log('holo')
    const printCurrentPosition = async () => {
      const coordinates = await Geolocation.getCurrentPosition();
      console.log('Current position:', coordinates);
    };
    printCurrentPosition();
  }

  somethingCooler() {
    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });
  
    tiles.addTo(this.map);
  }

  private map : any;

  private initMap(): void {
    this.map = L.map('map', {
      center: [ 39.8282, -98.5795 ],
      zoom: 3,
      attributionControl: false
    });

    this.map.attributionControl = false;
  }


}
