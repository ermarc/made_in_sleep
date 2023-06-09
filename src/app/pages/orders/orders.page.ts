import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MainHeaderComponent } from 'src/app/components/main-header/main-header.component';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import { FloatingTagComponent } from 'src/app/components/floating-tag/floating-tag.component';


@Component({
  selector: 'app-orders',
  templateUrl: './orders.page.html',
  styleUrls: ['./orders.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, MainHeaderComponent, NavbarComponent, FloatingTagComponent]
})
export class OrdersPage implements OnInit {
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

  constructor() { }

  ngOnInit() {
  }

}
