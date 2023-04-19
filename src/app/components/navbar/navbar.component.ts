import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'mainNavbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  standalone: true,
  imports: [IonicModule]
})
export class NavbarComponent  implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {}

  goToHome() {
    this.router.navigate(['/home']);
  }

  goToSearch() {
    this.router.navigate(['/search']);
  }

  goToCart() {
    this.router.navigate(['/cart']);
  }

  goToOrders() {
    this.router.navigate(['/orders']);
  }

  goToProfile() {
    this.router.navigate(['/profile']);
  }

}
