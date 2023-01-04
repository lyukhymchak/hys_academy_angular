import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsRoutingModule } from './products-routing.module';
import { ProductsComponent } from './components/products/products.component';
import { SharedAdminModule } from '../shared-admin/shared-admin.module';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [ProductsComponent],
  imports: [
    CommonModule,
    ProductsRoutingModule,
    SharedAdminModule,
    SharedModule,
  ],
  exports: [ProductsComponent],
})
export class ProductsModule {}