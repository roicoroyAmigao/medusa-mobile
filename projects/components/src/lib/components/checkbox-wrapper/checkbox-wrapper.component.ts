import { Component, AfterContentInit, ContentChild, HostBinding } from '@angular/core';

// Reference to the @ionic/angular Components List:
// https://github.com/ionic-team/ionic/blob/master/angular/src/directives/proxies.ts
import { IonCheckbox } from '@ionic/angular';

@Component({
  selector: 'app-checkbox-wrapper',
  templateUrl: './checkbox-wrapper.component.html',
  styleUrls: [
    './checkbox-wrapper.component.scss'
  ]
})
export class CheckboxWrapperComponent implements AfterContentInit {
  @ContentChild(IonCheckbox, { static: false }) checkbox: IonCheckbox | any;

  @HostBinding('class.checkbox-checked') isChecked: boolean | any;

  constructor() { }

  ngAfterContentInit() {
    // ContentChild is set
    this.isChecked = this.checkbox.checked;

    // Subscribe to changes
    this.checkbox.ionChange.subscribe((changes: any) => {
      this.isChecked = changes.detail.checked;
    });
  }
}
