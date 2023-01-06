import { Component, forwardRef, OnDestroy, ChangeDetectionStrategy, Input } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, FormBuilder, FormGroup, Validators, FormControl, NG_VALIDATORS } from '@angular/forms';
import { Subscription } from 'rxjs';

export interface ProfileFormValues {
  username?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  phone?: string;
  avatar?: string;
}

export interface ProfileFormState {
  isUserLoggedIn: boolean;
  isCustomerLoggedIn: boolean;
}

@Component({
  selector: 'app-profile-form',
  templateUrl: './profile-form.component.html',
  styleUrls: [
    './profile-form.component.scss',
    './styles/contact-card.page.scss',
    './styles/contact-card.shell.scss'
  ],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ProfileFormComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => ProfileFormComponent),
      multi: true,
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileFormComponent implements ControlValueAccessor, OnDestroy {

  @Input() set profileData(value: ProfileFormValues | any) {
    // console.log(value?.user);
    this._formValues = {
      username: value?.user?.username ? value?.user?.username : '',
      first_name: value?.user?.first_name ? value?.user?.first_name : '',
      last_name: value?.user?.last_name ? value?.user?.last_name : '',
      email: value?.user?.email ? value?.user?.email : '',
      phone: value?.user?.phone ? value?.user?.phone : '',
    }
    this.profileForm.get('username').setValue(this.formValues?.username);
    this.profileForm.get('first_name').setValue(this.formValues?.first_name || null);
    this.profileForm.get('last_name').setValue(this.formValues?.last_name || null);
    this.profileForm.get('email').setValue(this.formValues?.email);
    this.profileForm.get('phone').setValue(this.formValues?.phone);

    this._avatar = value.avatar ? value.avatar : 'assets/shapes.svg';
    this._isLoggedIn = value.isUserLoggedIn && value.isCustomerLoggedIn ? true : false;
  };
  get formValues(): any {
    return this._formValues;
  }
  private _formValues: ProfileFormValues;
  get isLoggedIn(): boolean {
    return this._isLoggedIn;
  }
  private _isLoggedIn: boolean;
  get avatar(): string {
    return this._avatar;
  }
  private _avatar: string;

  //
  profileForm: FormGroup | any;

  subscriptions: Subscription[] = [];

  onChange: any = () => { };
  onTouched: any = () => { };

  get value(): ProfileFormValues {
    return this.profileForm.value;
  }

  set value(value: ProfileFormValues) {
    this.profileForm.setValue(value);
    this.onChange(value);
    this.onTouched();
  }

  get emailControl() {
    return this.profileForm.controls.email;
  }
  get usernameControl() {
    return this.profileForm.controls.username;
  }
  get firstNameControl() {
    return this.profileForm.controls.first_name
  }
  get lastNameControl() {
    return this.profileForm.controls.last_name;
  }
  get avatarControl() {
    return this.profileForm.controls.avatar;
  }

  constructor(
    private formBuilder: FormBuilder
  ) {

    this.profileForm = this.formBuilder.group({
      username: ['', Validators.required],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      email: ['', Validators.required],
      avatar: [null],
      phone: [''],
    });

    this.subscriptions.push(
      this.profileForm.valueChanges.subscribe((value: any) => {
        this.onChange(value);
        this.onTouched();
      })
    );
  }

  public submitForm() {
    console.log(this.profileForm);
  }

  async onImagePicked(file: any) {
    const response = await fetch(file);
    const blob = await response.blob();
    const formData = new FormData();
    formData.append('files', blob, file.name);
    // this.uploadData(formData);
    this.profileForm.get('avatar').setValue(formData);

    return formData;
  }
  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  writeValue(value: any) {
    if (value) {
      this.value = value;
    }

    if (value === null) {
      this.profileForm.reset();
    }
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  validate(_: FormControl) {
    return this.profileForm.valid ? null : { profile: { valid: false, }, };
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }
}
