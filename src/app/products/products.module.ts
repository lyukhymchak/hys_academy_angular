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
import { ErrorComponent } from './error/error.component';
import { CartComponent } from './components/cart/cart.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { CartTooltipComponent } from './components/cart-tooltip/cart-tooltip.component';
import { CartTooltipDirective } from './directives/cart-tooltip.directive';

@NgModule({
  declarations: [
    ProductsComponent,
    HeaderComponent,
    FooterComponent,
    ProductsSectionComponent,
    ProductComponent,
    CurrencyPipe,
    SetColorDirective,
    ErrorComponent,
    CartComponent,
    ProductDetailsComponent,
    CartTooltipComponent,
    CartTooltipDirective,
  ],
  imports: [CommonModule, ProductsRoutingModule],
})
export class ProductsModule {}
