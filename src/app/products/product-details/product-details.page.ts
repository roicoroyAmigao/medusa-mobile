import { Component, OnInit, ViewChild } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Store } from '@ngxs/store';
import { CounterInputComponent } from 'projects/components/src/lib/components/counter-input/counter-input.component';
import { NavigationService } from 'projects/services/src/lib/services/navigation.service';
import { Observable } from 'rxjs';
import { CartActions } from 'src/app/store/cart/cart.actions';
import { clearSelectedProduct } from 'src/app/store/products/products.actions';
import { ProductDetailFacade } from './products-details.facade';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.page.html',
  styleUrls: ['./product-details.page.scss'],
})
export class ProductDetailsPage implements OnInit {

  @ViewChild('counterInput') counterInput: CounterInputComponent;

  viewState$: Observable<any>;

  slidesOptions: any = {
    zoom: {
      toggle: false // Disable zooming to prevent weird double tap zomming on slide images
    }
  };

  productOptions: any = [];

  optionsVariants: any = [];

  productVariants: any = [];

  selectedOptionId: string;

  selectedVariantId: string;

  constructor(
    private store: Store,
    private navigation: NavigationService,
    private facade: ProductDetailFacade,
    public alertController: AlertController,
  ) {
    this.viewState$ = this.facade.viewState$;
  }
  ngOnInit() {
  }
  onSelectChange(option: any) {
    this.selectedOptionId = option.id;
    this.optionsVariants = [];
    this.selectedVariantId = '';
    this.optionsVariants = option;
  }
  onSelectOption(option: any) {
    console.log(option.variant_id);
    this.selectedVariantId = option.variant_id;
  }
  onSelectVariant(variantId: any) {
    this.selectedVariantId = variantId.variant_id;
  }
  addToCart() {
    if (this.selectedVariantId && this.counterInput?.counterValue > 0) {
      const cartId = this.store.selectSnapshot<any>((state) => state.cart?.cartId);
      if (cartId != null && this.selectedVariantId != null) {
        this.store.dispatch(new CartActions.AddProductMedusaToCart(cartId, this.counterInput?.counterValue, this.selectedVariantId));
      } else {
        this.store.dispatch(new CartActions.CreateMedusaCart()).subscribe((state) => {
          this.store.dispatch(new CartActions.AddProductMedusaToCart(state.cart?.cartId, this.counterInput?.counterValue, this.selectedVariantId));
        });
      }
    }
  }
  navigateBack() {
    this.optionsVariants = [];
    this.navigation.navigateFlip('products-list');
    this.store.dispatch(new clearSelectedProduct());
  }
}
