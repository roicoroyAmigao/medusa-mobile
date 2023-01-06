import { Component, OnDestroy, ViewChild } from "@angular/core";
import { Store } from "@ngxs/store";
import { Observable, Subject, take, takeUntil } from "rxjs";
import { CustomerRegisterActions } from "src/app/store/customer-register/customer-register.actions";
import { IRegisterAddress } from "projects/types/types.interfaces";
import { AuthRoutePath } from "../../route-path.enum";
import { NavigationService } from "projects/services/src/lib/services/navigation.service";
import { UtilityService } from "projects/services/src/lib/services/utility.service";
import { RegisterAddressFacade } from "./address.facade";
import { AddressFormComponent } from "projects/form-components/src/lib/components/address-form/address-form.component";

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss'],
})
export class AddressComponent implements OnDestroy {

  @ViewChild('addressForm') addressForm: AddressFormComponent;


  viewState$: Observable<any>;

  first_name: string;
  last_name: string;

  private readonly ngUnsubscribe = new Subject();

  constructor(
    private store: Store,
    private readonly facade: RegisterAddressFacade,
    private navigation: NavigationService,
    private utility: UtilityService,
  ) {
    this.viewState$ = this.facade.viewState$;
    this.viewState$.pipe(
      takeUntil(this.ngUnsubscribe)
    ).subscribe((vs) => {
      this.first_name = vs.customer?.first_name;
      this.last_name = vs.customer?.last_name;
    });
  }

  submitAddressForm1() {
    console.log(this.addressForm.adressForm.get('address_1').value);
    console.log(this.addressForm.adressForm.get('address_2').value);
    console.log(this.addressForm.adressForm.get('region_code').value);
    console.log(this.addressForm.adressForm.get('country').value);
    console.log(this.addressForm.adressForm.get('city').value);
    console.log(this.addressForm.adressForm.get('postal_code').value);
    console.log(this.addressForm.adressForm.get('phone').value);
  }

  submitAddressForm() {

    const registerAddress: IRegisterAddress = {
      first_name: this.first_name,
      last_name: this.last_name,
      address_1: this.addressForm.adressForm.get('address_1').value,
      address_2: this.addressForm.adressForm.get('address_2').value,
      city: this.addressForm.adressForm.get('city').value,
      country_code: this.addressForm.adressForm.get('country').value,
      postal_code: this.addressForm.adressForm.get('postal_code').value,
      phone: this.addressForm.adressForm.get('phone').value,
      company: 'Wyman LLC',
      province: 'Georgia',
      metadata: {}
    };
    // console.log(registerAddress);

    this.store.dispatch(new CustomerRegisterActions.UpdateCustomerRegisterAddress(registerAddress));

    const errorEntry = this.store.selectSnapshot<any>((state) => state.errorsLogging.errorEntry);
    if (errorEntry === null) {
      this.navigation.navigateFlip('/home');
    }
  }

  back(): void {
    this.navigation.navigateFlip(AuthRoutePath.user);
  }
  ngOnDestroy(): void {
    this.ngUnsubscribe.next(null);
    this.ngUnsubscribe.complete();
  }
}
