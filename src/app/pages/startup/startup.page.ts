import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { register } from 'swiper/element/bundle';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

register()

@Component({
  selector: 'app-startup',
  templateUrl: './startup.page.html',
  styleUrls: ['./startup.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class StartupPage implements OnInit {


  constructor() { }

  ngOnInit() {
  }

  ionViewWillEnter() {
  }

  endSlider() {
    document.cookie = "skipStartup=true; expires=Fri, 31 Dec 9999 23:59:59 GMT";
    window.location.href = "/";
  }
 
}
