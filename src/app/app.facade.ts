import { Injectable } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { CustomerState } from './store/customer/customer.state';

@Injectable({
    providedIn: 'root'
})
export class AppFacade {

    @Select(CustomerState.getCustomer) customer$: Observable<any>;

    @Select(CustomerState.isLoggedIn) isCustomerLoggedIn$: Observable<any>;

    readonly viewState$: Observable<any>;

    constructor() {
        this.viewState$ = combineLatest(
            [
                this.customer$,
                this.isCustomerLoggedIn$,
            ]
        ).pipe(
            map((
                [
                    customer,
                    isCustomerLoggedIn,                ]
            ) => ({
                customer,
                isCustomerLoggedIn,            }))
        );
    }
}
