import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ActivatedRoute } from '@angular/router';
import { MainHeaderComponent } from 'src/app/components/main-header/main-header.component';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import { FloatingTagComponent } from 'src/app/components/floating-tag/floating-tag.component';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.page.html',
  styleUrls: ['./order-detail.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, MainHeaderComponent, NavbarComponent, FloatingTagComponent]
})
export class OrderDetailPage implements OnInit {
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
  orderPrice : string = '0,00';
  orderId : string | null = 'Cargando...';

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.getIdFromUrl();
  }

  getIdFromUrl() {
    this.orderId = this.route.snapshot.paramMap.get('id');
  }

}
