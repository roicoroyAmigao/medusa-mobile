import { ChangeDetectionStrategy, Component, ElementRef, forwardRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NG_VALUE_ACCESSOR, NG_VALIDATORS, FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-colors-form',
  templateUrl: './colors-form.component.html',
  styleUrls: ['./colors-form.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ColorsFormComponent),
      multi: true
    },
    {
      provide: NG_VALIDATORS,
      useExisting: forwardRef(() => ColorsFormComponent),
      multi: true,
    }
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ColorsFormComponent implements OnInit, OnDestroy {

  @ViewChild('primaryRef') public primaryRef: ElementRef;
  @ViewChild('secondaryRef') public secondaryRef: ElementRef;
  @ViewChild('tertiaryRef') public tertiaryRef: ElementRef;

  // public primary = 'var(--ion-color-primary)';
  // public secondary = 'var(--ion-color-secondary)';
  // public tertiary = 'var(--ion-color-tertiary)';
  public primary: any = null;
  public secondary: any = null;
  public tertiary: any = null;

  radioColorForm: FormGroup;

  subscriptions: Subscription[] = [];

  onChange: any = () => { };
  onTouched: any = () => { };

  presentingElement: any;

  get value(): any {
    return this.radioColorForm.value;
  }

  set value(value: any) {
    console.log(value);
    // this.radioColorForm.setValue(value);
    this.onChange(value);
    this.onTouched();
  }

  // get emailControl() {
  //   return this.colorsForm.controls.email;
  // }

  constructor(
    private formBuilder: FormBuilder,
  ) {
    this.radioColorForm = this.formBuilder.group({
      primary: new FormControl(),
      secondary: new FormControl(),
      tertiary: new FormControl(),
    });
    this.subscriptions.push(
      this.radioColorForm.valueChanges.subscribe((value: any) => {
        this.onChange(value);
        this.onTouched();
      })
    );
  }

  // eslint-disable-next-line @angular-eslint/no-empty-lifecycle-method
  ngOnInit() { }

  public capturePrimaryColour(event: any): void {
    this.primary = event;
    if (this.primaryRef.nativeElement) {
      this.primaryRef.nativeElement.style.backgroundColor = this.primary;
    }
  }
  public captureSecondaryColour(event: any): void {
    this.secondary = event;
    if (this.secondaryRef.nativeElement) {
      this.secondaryRef.nativeElement.style.backgroundColor = this.secondary;
    }
  }
  public captureTertiaryColour(event: any): void {
    this.tertiary = event;
    if (this.tertiaryRef.nativeElement) {
      this.tertiaryRef.nativeElement.style.backgroundColor = this.tertiary;
    }
  }

  registerOnChange(fn: any) {
    this.onChange = fn;
  }

  writeValue(value: any) {
    if (value) {
      this.value = value;
    }
    if (value === null) {
      this.radioColorForm.reset();
    }
  }
  registerOnTouched(fn: any) {
    this.onTouched = fn;
  }
  validate(_: FormControl) {
    return this.radioColorForm.valid ? null : { profile: { valid: false, }, };
  }
  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }
}
