import { Component, OnInit, Input } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { StorageService } from 'src/app/services/storage.service';

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

  @Input()
  itemQuantity : string = '';

  @Input()
  itemId : string = '';

  constructor(private router: Router, private storage: StorageService) { }

  ngOnInit() {}

  redirectTo() {
    if (this.itemRedirectUrl) { this.router.navigate([this.itemRedirectUrl]); }
  }

  async renewProductQuantity(event : any) {
    let cartProducts = await this.storage.get('cartProducts');
    let numberValue = Number(event.target.value);
    
    cartProducts[this.getProductIndexInCart(cartProducts)].productQuantity = numberValue;
    await this.storage.set('cartProducts', cartProducts);
  }

  async destroyProductFromCart() {
    let cartProducts = await this.storage.get('cartProducts');
    cartProducts.splice(this.getProductIndexInCart(cartProducts), 1);
    await this.storage.set('cartProducts', cartProducts);

    window.location.reload();
  }

  getProductIndexInCart(cartProducts : any) {
    return cartProducts.findIndex((element : any) => element.productId == this.itemId);
  }

}
