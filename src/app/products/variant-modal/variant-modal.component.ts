import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Store } from '@ngxs/store';
import { CounterInputComponent } from 'projects/components/src/lib/components/counter-input/counter-input.component';
import { Observable, Subject } from 'rxjs';
import { CartActions } from 'src/app/store/cart/cart.actions';
import { ProductDetailFacade } from '../product-details/products-details.facade';

@Component({
  selector: 'app-variant-modal',
  templateUrl: './variant-modal.component.html',
  styleUrls: ['./variant-modal.component.scss'],
})
export class VariantModalComponent {

  @ViewChild('counterInput') counterInput: CounterInputComponent;

  @Input() variant: any;

  viewState$: Observable<any>;

  constructor(
    private modalCtrl: ModalController,
    private facade: ProductDetailFacade,
    private store: Store,
  ) {
    this.viewState$ = this.facade.viewState$;
  }

  addToCart() {
    const cartId = this.store.selectSnapshot<any>((state) => state.cart?.cartId);
    if (cartId != null && this.variant != null) {
      this.store.dispatch(new CartActions.AddProductMedusaToCart(cartId, this.counterInput.counterValue, this.variant?.id));
      this.dismiss();
    } else {
      this.store.dispatch(new CartActions.CreateMedusaCart()).subscribe((state) => {
        this.store.dispatch(new CartActions.AddProductMedusaToCart(state.cart?.cartId, this.counterInput.counterValue, this.variant?.id));
        this.dismiss();
      });
    }
  }

  async dismiss() {
    await this.modalCtrl.dismiss();
  }

}