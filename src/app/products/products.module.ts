import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductsComponent } from './products.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ProductsSectionComponent } from './products-section/products-section.component';
import { ProductComponent } from './products-section/product/product.component';

import { ProductsRoutingModule } from './products-routing.module';
import { ButtonComponent } from './products-section/button/button.component';
import { CurrencyPipe } from './pipes/currency.pipe';
import { SetColorDirective } from './directives/setcolor.directive';

@NgModule({
  declarations: [
    ProductsComponent,
    HeaderComponent,
    FooterComponent,
    ProductsSectionComponent,
    ProductComponent,
    ButtonComponent,
    CurrencyPipe,
    SetColorDirective,
  ],
  imports: [CommonModule, ProductsRoutingModule],
})
export class ProductsModule {}
