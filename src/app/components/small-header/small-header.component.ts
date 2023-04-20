import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'smallHeader',
  templateUrl: './small-header.component.html',
  styleUrls: ['./small-header.component.scss'],
  standalone: true,
  imports: [IonicModule]
})
export class SmallHeaderComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
