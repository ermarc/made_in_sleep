import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MainHeaderComponent } from 'src/app/components/main-header/main-header.component';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import { FloatingTagComponent } from 'src/app/components/floating-tag/floating-tag.component';
import { FloatingButtonComponent } from 'src/app/components/floating-button/floating-button.component';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, MainHeaderComponent, NavbarComponent, FloatingTagComponent, FloatingButtonComponent]
})
export class CartPage implements OnInit {
  Items : any = [
    {name: 'jose'},
    {name: 'jose'},
    {name: 'jose'},
    {name: 'jose'},
    {name: 'jose'},
    {name: 'jose'},
    {name: 'jose'},
    {name: 'jose'},
  ]
  cartPrice : string = '0,00'

  constructor() { }

  ngOnInit() {
  }

}
