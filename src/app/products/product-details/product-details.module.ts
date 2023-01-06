import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductDetailsPageRoutingModule } from './product-details-routing.module';

import { ProductDetailsPage } from './product-details.page';
import { CustomComponentsModule } from 'projects/components/src/lib/components.module';
import { FormComponentsModule } from 'projects/form-components/src/lib/form-components.module';
import { ShellModule } from 'projects/components/src/public-api';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductDetailsPageRoutingModule,
    FormComponentsModule,
    CustomComponentsModule,
    ShellModule
  ],
  declarations: [ProductDetailsPage]
})
export class ProductDetailsPageModule {}
