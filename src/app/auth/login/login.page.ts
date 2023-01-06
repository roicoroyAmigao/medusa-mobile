import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { Store } from '@ngxs/store';
import { CustomerActions } from 'src/app/store/customer/customer.actions';
import { ICustomerLoginData, IStrapiLoginData } from 'projects/types/types.interfaces';
import { AuthRoutePath } from '../route-path.enum';
import { LoginFormComponent } from 'projects/form-components/src/lib/components/login-form/login-form.component';
import { NavigationService } from 'projects/services/src/lib/services/navigation.service';
import { UtilityService } from 'projects/services/src/lib/services/utility.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoginPage {

  @ViewChild('form') form: LoginFormComponent;

  loginReq: IStrapiLoginData;

  constructor(
    private store: Store,
    private navigation: NavigationService,
    private utility: UtilityService,
  ) { }

  ionViewDidEnter() {
    this.form?.loginForm.get('email').setValue("roicoroy@yahoo.com.br");
    this.form?.loginForm.get('password').setValue("Rwbento123");
  }

  async login(): Promise<void> {

    const medusaRequest: ICustomerLoginData = {
      email: this.form?.loginForm.get('email').value,
      password: this.form?.loginForm.get('password').value,
    };

    this.store.dispatch(new CustomerActions.Login(medusaRequest))

    const errorEntry = this.store.selectSnapshot<any>((state) => state.errorsLogging.errorEntry);

    setTimeout(() => {
      if (errorEntry === null) {
        this.navigation.navigateFlip('/home');
      }
    }, 50);
  }
  back(): void {
    this.navigation.navControllerDefault('/home');
  }
  register(): void {
    this.navigation.navControllerDefault(AuthRoutePath.user);
  }
}
