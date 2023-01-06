import { Component, ViewChild } from '@angular/core';
import { Store } from '@ngxs/store';
import { ProfileFormComponent } from 'projects/form-components/src/lib/components/profile-form/profile-form.component';
import { NavigationService } from 'projects/services/src/lib/services/navigation.service';
import { Observable } from 'rxjs';
import { StrapiUserActions } from '../store/strapi-user/strapi-user.actions';
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
  submitProfileForm() {
    if (this.profileForm.profileForm.valid) {
      const postProfileData = {
        username: this.profileForm.profileForm.value.username,
        first_name: this.profileForm.profileForm.value.first_name,
        last_name: this.profileForm.profileForm.value.last_name,
        email: this.profileForm.profileForm.value.email,
        phone: this.profileForm.profileForm.value.phone,
      };
      this.store.dispatch(new StrapiUserActions.UpdateStrapiUser(postProfileData));
      const formData: FormData = this.profileForm.profileForm.get('avatar').value;
      if (this.profileForm.profileForm.value.avatar) {
        console.log(formData);
        this.store.dispatch(new StrapiUserActions.UploadProfileImage(formData));
      }
    }
  }
  ordersPage() {
    this.navigation.navigateForward('/profile/orders', 'forward');
  }
  addressesPage() {
    this.navigation.navigateForward('/profile/customer-addresses', 'forward');
  }
  settingsPage() {
    this.navigation.navigateForward('/profile/settings', 'forward');
  }
}
