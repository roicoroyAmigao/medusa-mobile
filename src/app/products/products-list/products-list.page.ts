import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Store } from '@ngxs/store';
import { NavigationService } from 'projects/services/src/lib/services/navigation.service';
import { Observable } from 'rxjs';
import { addSelectedProduct, addSelectedVariant, clearSelectedProduct, clearSelectedVariant, GetProductList } from 'src/app/store/products/products.actions';
import { VariantModalComponent } from '../variant-modal/variant-modal.component';
import { ProductsListinFacade } from './products-list.facade';

@Component({
  selector: 'app-products-list',
  templateUrl: './products-list.page.html',
  styleUrls: ['./products-list.page.scss'],
})
export class ProductsListPage implements OnInit {

  viewState$: Observable<any>;

  constructor(
    private store: Store,
    private navigation: NavigationService,
    private facade: ProductsListinFacade,
    private modalCtrl: ModalController,
  ) { }
  ionViewWillEnter() {
    this.store.dispatch(new GetProductList());
  }
  ngOnInit() {
    this.viewState$ = this.facade.viewState$;
    // this.viewState$.subscribe((state) => {
    //   console.log(state);
    // });
  }
  async selectVariant(variant: any) {
    this.store.dispatch(new addSelectedVariant(variant));
    const modal = await this.modalCtrl.create({
      component: VariantModalComponent,
      componentProps: {
        variant: variant
      },
      cssClass: 'dialog-modal'
    });
    await modal.present();
  }
  navigateDetails(product: any) {
    // this.store.dispatch(new clearSelectedProduct());
    this.navigation.navigateFlip('product-details');
    this.store.dispatch(new addSelectedProduct(product));
  }
  navigateHome() {
    this.store.dispatch(new clearSelectedProduct());
    this.navigation.navigateFlip('/home');
  }
}
