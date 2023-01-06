import { Injectable } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { CustomerState } from 'src/app/store/customer/customer.state';
import { ProductState } from 'src/app/store/products/products.state';

@Injectable({
    providedIn: 'root'
})
export class ProductsListinFacade {

    @Select(CustomerState.getCustomer) customer$: Observable<any>;

    @Select(CustomerState.isLoggedIn) isCustomerLoggedIn$: Observable<any>;

    @Select(ProductState.getSelectedVariant) selectedVariant$: Observable<any>;

    @Select(ProductState.getProductList) productList$: Observable<any>;

    readonly viewState$: Observable<any>;

    constructor() {
        this.viewState$ = combineLatest(
            [
                this.customer$,
                this.isCustomerLoggedIn$,
                this.selectedVariant$,
                this.productList$,
            ]
        ).pipe(
            map((
                [
                    customer,
                    isCustomerLoggedIn,
                    selectedVariant,
                    productList
                ]
            ) => ({
                customer,
                isCustomerLoggedIn,
                selectedVariant,
                productList,
            }))
        );
    }
}
