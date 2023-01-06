import { Component, ViewChild } from '@angular/core';
import { Store } from '@ngxs/store';
import { ColorsFormComponent } from 'projects/form-components/src/lib/components/colors-form/colors-form.component';
import { FcmFormComponent } from 'projects/form-components/src/lib/components/fcm-form/fcm-form.component';
import { LanguageFormComponent } from 'projects/form-components/src/lib/components/language-form/language-form.component';
import { NavigationService } from 'projects/services/src/lib/services/navigation.service';
import { Observable } from 'rxjs';
import { FcmActions } from 'src/app/store/fcm/fcm.actions';
import { LanguageActions } from 'src/app/store/language/language.actions';
import { ThemeActions } from 'src/app/store/theme/theme.actions';
import { TestSettingsFacade } from './settings.facade';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage {

  @ViewChild('fcmForm') fcmForm: FcmFormComponent;

  @ViewChild('languageForm') languageForm: LanguageFormComponent;

  @ViewChild('colorsForm') colorsForm: ColorsFormComponent;

  viewState$: Observable<any>;

  constructor(
    private facade: TestSettingsFacade,
    private navigation: NavigationService,
    public store: Store,
  ) {

    this.store.dispatch(new ThemeActions.GetTheme);

    this.viewState$ = this.facade.viewState$;
    // this.viewState$.subscribe((vs: any) => {
    //   console.log(vs.user?.fcm_accepted);
    // });
  }

  ionViewDidEnter() {
    const user = this.store.selectSnapshot<any>((state) => state.strapiUser?.user);
    this.fcmForm.fcmForm.get('fcm_accepted').setValue(user?.fcm_accepted);
    const stateLanguage = this.store.selectSnapshot<any>((state) => state.language?.language);
    this.languageForm.languageForm.get('language').setValue(stateLanguage);
  }

  submitForm() {
    const theme = {
      data: {
        primary: this.colorsForm.primary ? this.colorsForm.primary : '#3880ff',
        secondary: this.colorsForm.secondary ? this.colorsForm.secondary : '#3dc2ff',
        tertiary: this.colorsForm.tertiary ? this.colorsForm.tertiary : '#5260ff',
      }
    }
    // console.log(theme);
    // console.log(this.fcmForm.fcmForm.value);
    this.store.dispatch(new LanguageActions.SetLanguageDeviceInfo(this.languageForm.languageForm.value.language));
    this.store.dispatch(new ThemeActions.PostUpdateTheme(theme));
    this.store.dispatch(new FcmActions.GetFcmToken());
  }

}
