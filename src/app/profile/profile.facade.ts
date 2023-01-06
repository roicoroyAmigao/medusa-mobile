import { Injectable } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { CategoriesState } from '../store/categories/categories.state';
import { CustomerState } from '../store/customer/customer.state';

@Injectable({
    providedIn: 'root'
})
export class ProfileFacade {

    @Select(CategoriesState.getgetCategoreisTheme) categories$: Observable<any>;

    @Select(CustomerState.getCustomer) customer$: Observable<any>;

    @Select(CustomerState.isLoggedIn) isCustomerLoggedIn$: Observable<any>;

    readonly viewState$: Observable<any>;

    constructor() {
        this.viewState$ = combineLatest(
            [
                this.categories$,
                this.customer$,
                this.isCustomerLoggedIn$,
            ]
        ).pipe(
            map((
                [
                    categories,
                    customer,
                    isCustomerLoggedIn,
                ]
            ) => ({
                categories,
                customer,
                isCustomerLoggedIn,
            }))
        );
    }
}
