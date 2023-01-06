import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Store } from '@ngxs/store';
import { AddressesActions } from 'src/app/store/addresses/addresses.actions';
import { CartActions } from 'src/app/store/cart/cart.actions';
import { CustomerActions } from 'src/app/store/customer/customer.actions';
import { MedusaActions } from 'src/app/store/medusa/medusa.actions';
import { StrapiUserActions } from 'src/app/store/strapi-user/strapi-user.actions';
import { environment } from 'src/environments/environment';
import { NavigationService } from './navigation.service';
import Medusa from "@medusajs/medusa-js";
@Injectable({
    providedIn: 'root'
})
export class AppAuthService {
    headers_json = new HttpHeaders().set('Content-Type', 'application/json');
    medusaClient: any;
    constructor(
        private store: Store,
        private navigation: NavigationService,
        private http: HttpClient
    ) {
        this.medusaClient = new Medusa({ baseUrl: environment.MEDUSA_API_BASE_PATH, maxRetries: 10 });

     }

    public async logout(): Promise<void> {
        this.store.dispatch(new CustomerActions.LogOutMedusaUser());
        this.store.dispatch(new MedusaActions.LogOut());
        this.store.dispatch(new CartActions.LogOut());
        this.store.dispatch(new AddressesActions.LogOut());
        this.store.dispatch(new StrapiUserActions.LogOutStrapiUser());
        let sessionRes = await this.medusaClient.auth?.deleteSession();
    }
    public async logoutUser(): Promise<void> {
        let sessionRes = await this.medusaClient.auth?.deleteSession();
        this.store.dispatch(new CustomerActions.LogOutMedusaUser());
        this.store.dispatch(new MedusaActions.LogOut());
        this.store.dispatch(new StrapiUserActions.LogOutStrapiUser());
    }
}
