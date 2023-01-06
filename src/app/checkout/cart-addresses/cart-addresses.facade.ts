import { Injectable } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { CartState } from 'src/app/store/cart/cart.state';
import { CustomerState } from 'src/app/store/customer/customer.state';

@Injectable({
    providedIn: 'root'
})
export class AddressesFacade {

    @Select(CartState.getIsGuest) isGuest$: Observable<any>;

    @Select(CartState.getCart) cart$: Observable<any>;

    @Select(CustomerState.getCustomer) customer$: Observable<any>;

    @Select(CustomerState.getSession) session$: Observable<any>;

    @Select(CustomerState.isLoggedIn) isCustomerLoggedIn$: Observable<any>;

    readonly viewState$: Observable<any>;

    constructor(
        private store: Store,
    ) {
        this.viewState$ = combineLatest(
            [
                this.isCustomerLoggedIn$,
                this.cart$,
                this.customer$,
                this.session$,
            ]
        ).pipe(
            map(([
                isCustomerLoggedIn,
                cart,
                customer,
                session
            ]) => ({
                isCustomerLoggedIn,
                cart,
                customer,
                session
            }))
        );
    }
}
