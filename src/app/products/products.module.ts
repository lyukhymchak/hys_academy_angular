import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsComponent } from './products.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ProductComponent } from './components/product/product.component';
import { ProductsSectionComponent } from './components/products-section/products-section.component';

import { ProductsRoutingModule } from './products-routing.module';
import { SharedModule } from '../shared/shared.module';
import { SetColorDirective } from './directives/setcolor.directive';

@NgModule({
  declarations: [
    ProductsComponent,
    HeaderComponent,
    FooterComponent,
    ProductsSectionComponent,
    ProductComponent,
    SetColorDirective,
  ],
  imports: [CommonModule, ProductsRoutingModule, SharedModule],
})
export class ProductsModule {}
