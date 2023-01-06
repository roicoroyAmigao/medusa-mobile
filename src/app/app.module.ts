import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { IonicStorageModule } from '@ionic/storage-angular';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { NgxStripeModule } from 'ngx-stripe';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { NgxsModule } from '@ngxs/store';
import { environment } from 'src/environments/environment';
import { AddressesState } from './store/addresses/addresses.state';
import { CartState } from './store/cart/cart.state';
import { CategoriesState } from './store/categories/categories.state';
import { CustomerRegisterState } from './store/customer-register/customer-register.state';
import { CustomerState } from './store/customer/customer.state';
import { ErrorsLoggingStateModule } from './store/errors-logging/errors-logging.state';
import { FormsState } from './store/forms/forms.state';
import { MedusaState } from './store/medusa/medusa.state';
import { PaymentState } from './store/payment/payment.state';
import { ProductState } from './store/products/products.state';
import { ShippingState } from './store/shipping/shipping.state';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxsReduxDevtoolsPluginModule } from '@ngxs/devtools-plugin';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { CustomComponentsModule } from 'projects/components/src/public-api';
import { FormComponentsModule } from 'projects/form-components/src/public-api';

@NgModule({
  declarations: [AppComponent],
  imports:
    [BrowserModule,
      IonicModule.forRoot(),
      AppRoutingModule,
      HttpClientModule,
      BrowserAnimationsModule,
      IonicStorageModule.forRoot(),
      NgxsModule.forRoot([
        CustomerState,
        FormsState,
        AddressesState,
        CustomerRegisterState,
        ErrorsLoggingStateModule,
        ProductState,
        CartState,
        ShippingState,
        PaymentState,
        MedusaState,
        CategoriesState,
      ]),
      NgxsStoragePluginModule.forRoot({
        key: [
          "addresses",
          'customer',
          'product',
          'forms',
          'errosLogging',
          'customerRegister',
          'cart',
          'shipping',
          'payment',
          "medusa",
          "categories",
        ]
      }),
      NgxsFormPluginModule.forRoot(),
      NgxsReduxDevtoolsPluginModule.forRoot({
        disabled: false
      }),
      NgxsLoggerPluginModule.forRoot({ disabled: true }),
      NgxStripeModule.forRoot(environment.STRIPE_KEY),
      FormComponentsModule,
      CustomComponentsModule
    ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
