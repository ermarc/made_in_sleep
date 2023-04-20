import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SmallHeaderComponent } from 'src/app/components/small-header/small-header.component';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import { FloatingButtonComponent } from 'src/app/components/floating-button/floating-button.component';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.page.html',
  styleUrls: ['./product-detail.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, SmallHeaderComponent, NavbarComponent, FloatingButtonComponent]
})
export class ProductDetailPage implements OnInit {

  productImage: string = '/assets/images/productPlaceholder.webp';
  productName : string = 'Cargando...';
  productDesc : string = 'Cargando...';

  constructor() { }

  ngOnInit() {
  }

}
