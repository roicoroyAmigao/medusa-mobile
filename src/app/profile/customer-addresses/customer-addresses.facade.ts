import { Injectable } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { CartState } from 'src/app/store/cart/cart.state';
import { CustomerState } from 'src/app/store/customer/customer.state';
import { StrapiUserState } from 'src/app/store/strapi-user/strapi-user.state';

@Injectable({
    providedIn: 'root'
})
export class CutomerAddressDetailsFacade {

    @Select(CartState.getIsGuest) isGuest$: Observable<any>;

    @Select(CartState.getCart) cart$: Observable<any>;

    @Select(CustomerState.getCustomer) customer$: Observable<any>;

    @Select(CustomerState.getSession) session$: Observable<any>;

    @Select(CustomerState.isLoggedIn) isCustomerLoggedIn$: Observable<any>;

    @Select(StrapiUserState.isLoggedIn) isUserLoggedIn$: Observable<any>;

    @Select(StrapiUserState.getUser) user$: Observable<any>;

    @Select(StrapiUserState.getAvatar) avatar$: Observable<any>;

    readonly viewState$: Observable<any>;

    constructor() {
        this.viewState$ = combineLatest(
            [
                this.isCustomerLoggedIn$,
                this.isUserLoggedIn$,
                this.user$,
                this.avatar$,
                this.cart$,
                this.customer$,
                this.session$,
            ]
        ).pipe(
            map(([
                isCustomerLoggedIn,
                isUserLoggedIn,
                user,
                avatar,
                cart,
                customer,
                session
            ]) => ({
                isCustomerLoggedIn,
                isUserLoggedIn,
                user,
                avatar,
                cart,
                customer,
                session
            }))
        );
    }
}
