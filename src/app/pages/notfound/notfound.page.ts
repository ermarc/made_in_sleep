import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SmallHeaderComponent } from 'src/app/components/small-header/small-header.component';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';

@Component({
  selector: 'app-notfound',
  templateUrl: './notfound.page.html',
  styleUrls: ['./notfound.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, SmallHeaderComponent, NavbarComponent]
})
export class NotfoundPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
