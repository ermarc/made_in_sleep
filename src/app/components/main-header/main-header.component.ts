import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'mainHeader',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.scss'],
  standalone: true,
  imports: [IonicModule]
})
export class MainHeaderComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
