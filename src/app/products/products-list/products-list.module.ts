import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProductsListPageRoutingModule } from './products-list-routing.module';

import { ProductsListPage } from './products-list.page';
import { CustomComponentsModule } from 'projects/components/src/lib/components.module';
import { FormComponentsModule } from 'projects/form-components/src/lib/form-components.module';
import { VariantModalComponent } from '../variant-modal/variant-modal.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProductsListPageRoutingModule,
    FormComponentsModule,
    CustomComponentsModule
  ],
  declarations: [
    ProductsListPage,
    VariantModalComponent
  ]
})
export class ProductsListPageModule {}
