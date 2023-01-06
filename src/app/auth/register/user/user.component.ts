import { Component, ChangeDetectionStrategy, ViewEncapsulation, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { Store } from "@ngxs/store";
import { CustomerActions } from "src/app/store/customer/customer.actions";
import { IStrapiRegisterData, IStrapiLoginData, ICustomerLoginData, ICustomerRegisterData } from "projects/types/types.interfaces";
import { AuthRoutePath } from "../../route-path.enum";
import { NavigationService } from "projects/services/src/lib/services/navigation.service";
import { UserFormComponent } from "projects/form-components/src/lib/components/user-form/user-form.component";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
})
export class UserComponent {

  @ViewChild('userForm') userForm: UserFormComponent;

  constructor(
    protected router: Router,
    protected translate: TranslateService,
    private store: Store,
    private navigation: NavigationService,
  ) { }

  ionViewDidEnter() {
    // if (this.userForm) {
    //   this.userForm.userForm.get('username').setValue('roicoroy');
    //   this.userForm.userForm.get('first_name').setValue('Rocio');
    //   this.userForm.userForm.get('last_name').setValue('de Oliveira');
    //   this.userForm.userForm.get('email').setValue('roicoroy@test.com');
    //   this.userForm.userForm.get('phone').setValue('+4407510998877');
    //   this.userForm.userForm.get('matching_passwords').get('password').setValue('Rwbento123');
    //   this.userForm.userForm.get('matching_passwords').get('confirm_password').setValue('Rwbento123');
    // }
  }
  register(): void {
    const customerRegisterRequest: ICustomerRegisterData = {
      first_name: this.userForm.userForm.get('first_name').value,
      last_name: this.userForm.userForm.get('last_name').value,
      email: this.userForm.userForm.get('email').value,
      password: this.userForm.userForm.get('matching_passwords').get('password').value,
      phone: this.userForm.userForm.get('phone').value,
    };
    const medusaLoginRequest: ICustomerLoginData = {
      email: this.userForm.userForm.get('email').value,
      password: this.userForm.userForm.get('matching_passwords').get('password').value,
    };
    // const medusaRequest: ICustomerLoginData = {
    //   // email: this.form?.loginForm.get('email').value,
    //   email: "roicoroy@test.com",
    //   password: "Rwbento123"
    // }
    // console.log(strapiRegisterRequest, customerRegisterRequest, strapiLoginRequest, medusaLoginRequest);
    if (this.userForm.userForm.valid) {
      this.store.dispatch(new CustomerActions.Register(customerRegisterRequest));
      const errorEntry = this.store.selectSnapshot<any>((state) => state.errorsLogging.errorEntry);
      if (errorEntry === null) {
        this.store.dispatch(new CustomerActions.Login(medusaLoginRequest));
        this.address();
      }
    }
  }
  address() {
    this.navigation.navControllerDefault(AuthRoutePath.address);
  }
  back() {
    this.navigation.navControllerDefault(AuthRoutePath.login);
  }
}
