import { Component, ViewChild } from '@angular/core';
import { Store } from '@ngxs/store';
import { ProfileFormComponent } from 'projects/form-components/src/lib/components/profile-form/profile-form.component';
import { NavigationService } from 'projects/services/src/lib/services/navigation.service';
import { Observable } from 'rxjs';
import { ProfileFacade } from './profile.facade';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage {

  @ViewChild('profileForm') profileForm: ProfileFormComponent;

  viewState$: Observable<any>;

  constructor(
    private store: Store,
    private navigation: NavigationService,
    private facade: ProfileFacade,
  ) {
    this.viewState$ = this.facade.viewState$;
    // this.viewState$.subscribe((state) => {
    //   console.log(state);
    // });
  }
  ordersPage() {
    this.navigation.navigateForward('/profile/orders', 'forward');
  }
  addressesPage() {
    this.navigation.navigateForward('/profile/customer-addresses', 'forward');
  }
}
