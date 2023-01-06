import { Injectable } from '@angular/core';
import { Select } from '@ngxs/store';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { CustomerState } from 'src/app/store/customer/customer.state';
import { ProductState } from 'src/app/store/products/products.state';

@Injectable({
    providedIn: 'root'
})
export class ProductDetailFacade {

    @Select(ProductState.getSelectedVariant) selectedVariant$: Observable<any>;

    @Select(ProductState.getSelectedProduct) selectedProduct$: Observable<any>;

    @Select(CustomerState.isLoggedIn) isCustomerLoggedIn$: Observable<any>;

    readonly viewState$: Observable<any>;

    constructor() {
        this.viewState$ = combineLatest(
            [
                this.selectedVariant$,
                this.selectedProduct$,
                this.isCustomerLoggedIn$,
            ]
        ).pipe(
            map((
                [
                    selectedVariant,
                    selectedProduct,
                    isCustomerLoggedIn,
                ]
            ) => ({
                selectedVariant,
                selectedProduct,
                isCustomerLoggedIn,
            }))
        );
    }
}
