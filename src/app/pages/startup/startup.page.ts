import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { register } from 'swiper/element/bundle';
import { MadeInSleepAnimatedLogoComponent } from 'src/app/components/made-in-sleep-animated-logo/made-in-sleep-animated-logo.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { SmallHeaderComponent } from 'src/app/components/small-header/small-header.component';
import { StorageService } from 'src/app/services/storage.service';

register()

@Component({
  selector: 'app-startup',
  templateUrl: './startup.page.html',
  styleUrls: ['./startup.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, MadeInSleepAnimatedLogoComponent, SmallHeaderComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class StartupPage implements OnInit {


  constructor(private storage: StorageService) { }

  ngOnInit() {
  }

  ionViewWillEnter() {
  }
    
  async endSlider() {
    window.localStorage.setItem('skipStartup',  'true');
    await this.storage.set('skipStartup', true);
    window.location.href = "/home";
  }
 
}
