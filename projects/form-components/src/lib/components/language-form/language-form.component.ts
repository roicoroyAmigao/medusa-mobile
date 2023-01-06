import { Component, forwardRef, OnDestroy, ChangeDetectionStrategy } from '@angular/core';
import { NG_VALUE_ACCESSOR, FormGroup, FormBuilder, ControlValueAccessor, Validators, NG_VALIDATORS, FormControl } from '@angular/forms';
import { DeviceInfo } from '@capacitor/device';
import { TranslateService } from '@ngx-translate/core';
import { Store } from '@ngxs/store';
import { IonLanguageService } from 'src/app/store/language/language/language.service';
import { Observable, Subscription } from 'rxjs';

export interface LanguageFormValues {
  language: string;
  device: any;
}

@Component({
  selector: 'app-language-form',
  templateUrl: './language-form.component.html',
  styleUrls: ['./language-form.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => LanguageFormComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => LanguageFormComponent),
      multi: true,
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LanguageFormComponent implements ControlValueAccessor, OnDestroy {
  languageForm: FormGroup | any;

  subscriptions: Subscription[] = [];

  get value(): LanguageFormValues {
    return this.languageForm.value;
  }

  set value(value: LanguageFormValues) {
    this.languageForm.setValue(value);
    this.onChange(value);
    this.onTouched();
  }

  get languageControl() {
    return this.languageForm.controls.language;
  }

  get deviceControl() {
    return this.languageForm.controls.device;
  }

  availableLanguages$: Observable<any>;

  stateDeviceInfo: DeviceInfo

  constructor(
    private formBuilder: FormBuilder,
    public languageService: IonLanguageService,
    public translate: TranslateService,
    public store: Store,
  ) {
    this.languageForm = this.formBuilder.group({
      language: new FormControl(),
      device: new FormControl()
    });

    this.subscriptions.push(
      this.languageForm.valueChanges.subscribe((value: any) => {
        this.onChange(value);
        this.onTouched();
      })
    );
    // this.getTranslations();
    this.availableLanguages$ = this.languageService.getLanguages();
    this.stateDeviceInfo = this.store.selectSnapshot<any>((state) => state.language.device);

  }

  selectLanguage(item: any) {
    // console.log(item);
    const selectedLanguage = item?.code;
    console.log(selectedLanguage);
    this.translate.use(selectedLanguage);
    // this.getTranslations();
  }

  getTranslations() {
    this.translate.getTranslation(this.translate.currentLang)
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
      this.languageForm.reset();
    }
  }

  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }

  validate(_: FormControl) {
    return this.languageForm.valid ? null : { passwords: { valid: false, }, };
  }

  reset() {
    this.languageForm.reset();
  }
}
