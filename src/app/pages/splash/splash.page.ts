import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { MadeInSleepAnimatedLogoComponent } from 'src/app/components/made-in-sleep-animated-logo/made-in-sleep-animated-logo.component';

@Component({
  selector: 'app-splash',
  templateUrl: './splash.page.html',
  styleUrls: ['./splash.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, MadeInSleepAnimatedLogoComponent]
})
export class SplashPage implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
    let skipStartup = window.localStorage.getItem('skipStartup');
    skipStartup == 'true' ? this.redirectToHome() : this.redirectToStartup();
  }

  redirectToHome() {
    setTimeout(() => {
      this.router.navigate(['/home']);
    }, 1850)
  }

  redirectToStartup() {
    setTimeout(() => {
      this.router.navigate(['/startup']);
    }, 1850)
  }
}