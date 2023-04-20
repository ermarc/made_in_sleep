import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MainHeaderComponent } from 'src/app/components/main-header/main-header.component';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';
import { SearchBarComponent } from 'src/app/components/search-bar/search-bar.component';
import { ProductListingComponent } from 'src/app/components/product-listing/product-listing.component';

@Component({
  selector: 'app-search',
  templateUrl: './search.page.html',
  styleUrls: ['./search.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, MainHeaderComponent, NavbarComponent, SearchBarComponent,ProductListingComponent]
})
export class SearchPage implements OnInit {
  items: any;

  constructor() { }

  ngOnInit() {
  }

  startSearch() {
      this.items =	[
        {name: 'flores',
        imgSrc: 'https://www.clara.es/medio/2022/12/27/nombres-de-flores_1cbbabe1_1200x630.jpg'},
        {name: 'flores2',
        imgSrc: 'https://www.clara.es/medio/2022/12/27/nombres-de-flores_1cbbabe1_1200x630.jpg'},
        {name: 'flores3',
        imgSrc: 'https://www.clara.es/medio/2022/12/27/nombres-de-flores_1cbbabe1_1200x630.jpg'},
        {name: 'flores4',
        imgSrc: 'https://www.clara.es/medio/2022/12/27/nombres-de-flores_1cbbabe1_1200x630.jpg'},
        {name: 'flores5',
        imgSrc: 'https://www.clara.es/medio/2022/12/27/nombres-de-flores_1cbbabe1_1200x630.jpg'},
        {name: 'flores6',
        imgSrc: 'https://www.clara.es/medio/2022/12/27/nombres-de-flores_1cbbabe1_1200x630.jpg'},
        {name: 'flores7',
        imgSrc: 'https://www.clara.es/medio/2022/12/27/nombres-de-flores_1cbbabe1_1200x630.jpg'},
    ]
  }

}
