import { Component, ViewChild } from '@angular/core';
import { MenuController, Platform } from '@ionic/angular';
import { Store } from '@ngxs/store';
import { CartMenuComponent } from 'projects/components/src/lib/components/app-menu/cart-menu.component';
import { MedusaCartComponent } from 'projects/components/src/lib/components/medusa-cart/medusa-cart.component';
import { AppAuthService } from 'projects/services/src/lib/services/auth.service';
import { Observable } from 'rxjs';
import { AppFacade } from './app.facade';
import { clearSelectedProduct } from './store/products/products.actions';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  @ViewChild(MedusaCartComponent) medusaCartComponent: MedusaCartComponent;

  @ViewChild(CartMenuComponent) menuComponent: CartMenuComponent;

  viewState$: Observable<any>;

  public appPages = [
    { title: 'Inbox', url: '/folder/Inbox', icon: 'mail' },
    { title: 'Outbox', url: '/folder/Outbox', icon: 'paper-plane' },
    { title: 'Favorites', url: '/folder/Favorites', icon: 'heart' },
    { title: 'Archived', url: '/folder/Archived', icon: 'archive' },
    { title: 'Trash', url: '/folder/Trash', icon: 'trash' },
    { title: 'Spam', url: '/folder/Spam', icon: 'warning' },
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

  constructor(
    private authService: AppAuthService,
    public menu: MenuController,
    public store: Store,
    private platform: Platform,
    private facade: AppFacade,
  ) {
    this.initApp();
  }

  async initApp() {
    this.platform.ready().then(() => {
      this.viewState$ = this.facade.viewState$;
    });
  }
  checkout() {
    this.menu.toggle('end').then(() => {
      this.medusaCartComponent.goToCheckout();
      this.store.dispatch(new clearSelectedProduct());
    });
  }
  logout(): void {
    this.authService.logout();
  }

}
