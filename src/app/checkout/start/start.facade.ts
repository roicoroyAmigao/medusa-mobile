import { Injectable } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { CartState } from 'src/app/store/cart/cart.state';

import { CustomerState } from 'src/app/store/customer/customer.state';

@Injectable({
    providedIn: 'root'
})
export class StartFacade {

    @Select(CartState.getCart) cart$: Observable<any>;

    @Select(CustomerState.isLoggedIn) isCustomerLoggedIn$: Observable<any>;

    @Select(CustomerState.getCustomer) customer$: Observable<any>;

    readonly viewState$: Observable<any>;

    constructor() {
        this.viewState$ = combineLatest(
            [
                this.cart$,
                this.isCustomerLoggedIn$,
                this.customer$,
            ]
        ).pipe(
            map((
                [
                    cart,
                    isCustomerLoggedIn,
                    customer,
                ]
            ) => ({
                cart,
                isCustomerLoggedIn,
                customer,
            }))
        );
    }
}
