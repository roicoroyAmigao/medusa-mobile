import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { IonicModule } from '@ionic/angular';
import { AddressFormComponent } from './components/address-form/address-form.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { PasswordFormComponent } from './components/password-form/password-form.component';
import { ProfileFormComponent } from './components/profile-form/profile-form.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import { CustomComponentsModule } from 'projects/components/src/public-api';
import { NgxsFormPluginModule } from '@ngxs/form-plugin';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { NgxsModule } from '@ngxs/store';
import { ColorsFormComponent } from './components/colors-form/colors-form.component';
import { ColorPickerModule } from 'ngx-color-picker';
import { LanguageFormComponent } from './components/language-form/language-form.component';
import { FcmFormComponent } from './components/fcm-form/fcm-form.component';
import { GuestFormComponent } from './components/guest-form/guest-form.component';
import { AddressDetailsFormComponent } from './components/address-details-form /address-details-form.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TranslateModule,
    NgxsModule,
    NgxsFormPluginModule,
    NgxsStoragePluginModule,
    ReactiveFormsModule,
    CustomComponentsModule,
    ColorPickerModule
  ],
  declarations: [
    PasswordFormComponent,
    ProfileFormComponent,
    AddressFormComponent,
    LoginFormComponent,
    UserFormComponent,
    ColorsFormComponent,
    LanguageFormComponent,
    FcmFormComponent,
    GuestFormComponent,
    AddressDetailsFormComponent
  ],
  exports: [
    PasswordFormComponent,
    ProfileFormComponent,
    AddressFormComponent,
    LoginFormComponent,
    UserFormComponent,
    ColorsFormComponent,
    LanguageFormComponent,
    FcmFormComponent,
    GuestFormComponent,
    AddressDetailsFormComponent
  ]
})
export class FormComponentsModule { }
