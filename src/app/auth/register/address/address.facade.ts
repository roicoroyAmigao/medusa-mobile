import { Injectable } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable, combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';
import { AddressesState } from 'src/app/store/addresses/addresses.state';
import { CustomerState } from 'src/app/store/customer/customer.state';

@Injectable({
    providedIn: 'root'
})
export class RegisterAddressFacade {
    @Select(AddressesState.getRegionList) regionList$: Observable<any> | any;

    @Select(AddressesState.getCountryList) countryList$: Observable<any> | any;

    @Select(CustomerState.getCustomer) customer$: Observable<any> | any;

    readonly viewState$: Observable<any>;

    constructor(
        private store: Store,
    ) {
        this.viewState$ = combineLatest(
            [
                this.regionList$,
                this.countryList$,
                this.customer$,
            ]
        ).pipe(
            map((
                [
                    regionList,
                    countryList = null,
                    customer = null
                ]
            ) => ({
                regionList,
                countryList,
                customer
            }))
        );
    }
}
