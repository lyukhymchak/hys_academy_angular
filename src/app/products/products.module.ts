import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsComponent } from './products.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ProductComponent } from './components/product/product.component';
import { ProductsSectionComponent } from './components/products-section/products-section.component';

import { ProductsRoutingModule } from './products-routing.module';

import { CurrencyPipe } from './pipes/currency.pipe';
import { SetColorDirective } from './directives/setcolor.directive';

@NgModule({
  declarations: [
    ProductsComponent,
    HeaderComponent,
    FooterComponent,
    ProductsSectionComponent,
    ProductComponent,
    CurrencyPipe,
    SetColorDirective,
  ],
  imports: [CommonModule, ProductsRoutingModule],
})
export class ProductsModule {}
