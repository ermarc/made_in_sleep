import { Component, OnInit, Input } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'floatingTagInputNum',
  templateUrl: './floating-tag-input-num.component.html',
  styleUrls: ['./floating-tag-input-num.component.scss'],
  standalone: true,
  imports: [IonicModule]
})
export class FloatingTagInputNumComponent  implements OnInit {

  @Input()
  itemName : string = 'Cargando...';

  @Input()
  itemImageUrl : string = 'assets/images/unknown.png';

  @Input()
  itemRedirectUrl : string = '';

  constructor(private router: Router) { }

  ngOnInit() {}

  redirectTo() {
    if (this.itemRedirectUrl) { this.router.navigate([this.itemRedirectUrl]); }
  }

}
