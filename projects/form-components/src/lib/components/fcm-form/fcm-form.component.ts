import { Component, forwardRef, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { NG_VALUE_ACCESSOR, FormGroup, FormBuilder, ControlValueAccessor, Validators, NG_VALIDATORS, FormControl } from '@angular/forms';
import { DeviceInfo } from '@capacitor/device';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { IonLanguageService } from 'src/app/store/language/language/language.service';
import { Observable, Subscription } from 'rxjs';

export interface FcmFormValues {
  fcm_accepted: boolean;
}

@Component({
  selector: 'app-fcm-form',
  templateUrl: './fcm-form.component.html',
  styleUrls: ['./fcm-form.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => FcmFormComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => FcmFormComponent),
      multi: true,
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FcmFormComponent implements ControlValueAccessor, OnDestroy {

  fcmForm: FormGroup | any;

  subscriptions: Subscription[] = [];

  get value(): FcmFormValues {
    return this.fcmForm.value;
  }

  set value(value: FcmFormValues) {
    this.fcmForm.setValue(value);
    this.onChange(value);
    this.onTouched();
  }

  get fcmControl() {
    return this.fcmForm.controls.fcm_accepted;
  }

  constructor(
    private formBuilder: FormBuilder,
    public languageService: IonLanguageService,
    public translate: TranslateService,
    public store: Store,
  ) {
    this.fcmForm = this.formBuilder.group({
      fcm_accepted: new FormControl(),
    });

    this.subscriptions.push(
      this.fcmForm.valueChanges.subscribe((value: any) => {
        this.onChange(value);
        this.onTouched();
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  onChange: any = () => { };
  onTouched: any = () => { };

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  writeValue(value: any) {
    if (value) {
      this.value = value;
    }

    if (value === null) {
      this.fcmForm.reset();
    }
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  validate(_: FormControl) {
    return this.fcmForm.valid ? null : { passwords: { valid: false, }, };
  }

  reset() {
    this.fcmForm.reset();
  }
}
