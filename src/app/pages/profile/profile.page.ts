import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { MainHeaderComponent } from 'src/app/components/main-header/main-header.component';
import { NavbarComponent } from 'src/app/components/navbar/navbar.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule, MainHeaderComponent, NavbarComponent]
})
export class ProfilePage implements OnInit {

  userImage : string = '/assets/images/userPlaceholder.png';
  userName : string = 'Cargando...';
  userDesc : string = 'Cargando...';

  constructor() { }

  ngOnInit() {
  }

}
