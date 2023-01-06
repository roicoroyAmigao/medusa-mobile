import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { Store } from '@ngxs/store';
import { CustomerActions } from 'src/app/store/customer/customer.actions';
import { ICustomerLoginData, IStrapiLoginData } from 'projects/types/types.interfaces';
import { AuthRoutePath } from '../route-path.enum';
import { LoginFormComponent } from 'projects/form-components/src/lib/components/login-form/login-form.component';
import { NavigationService } from 'projects/services/src/lib/services/navigation.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
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
  headers = new HttpHeaders().set('Content-Type', 'application/json');
  constructor(
    private store: Store,
    private navigation: NavigationService,
    private utility: UtilityService,
  ) { }

  ionViewDidEnter() {
    this.form?.loginForm.get('email').setValue("roicoroy@test.com");
    this.form?.loginForm.get('password').setValue("Rwbento123");
  }

  public async login(): Promise<void> {

    this.utility.presentLoading('...');

    const strapiRequest: IStrapiLoginData = {
      identifier: this.form?.loginForm.get('email').value,
      password: this.form?.loginForm.get('password').value,
    };
    const medusaRequest: ICustomerLoginData = {
      email: this.form?.loginForm.get('email').value,
      password: this.form?.loginForm.get('password').value,
    };
    this.store.dispatch(new CustomerActions.Login(medusaRequest))

    const errorEntry = this.store.selectSnapshot<any>((state) => state.errorsLogging.errorEntry);
    if (errorEntry === null) {
      this.navigation.navigateFlip('/home');
      this.utility.dismissLoading();
    } else {
      this.utility.dismissLoading();
    }
  }
  back(): void {
    this.navigation.navControllerDefault('/home');
  }
  register(): void {
    this.navigation.navControllerDefault(AuthRoutePath.user);
  }
}
