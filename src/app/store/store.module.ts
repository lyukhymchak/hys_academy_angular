import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { StoreComponent } from './store.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ProductComponent } from './components/product/product.component';
import { ProductsSectionComponent } from './components/products-section/products-section.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { CartComponent } from './components/cart/cart.component';
import { CartTooltipComponent } from './components/cart-tooltip/cart-tooltip.component';

import { StoreRoutingModule } from './store-routing.module';
import { CurrencyPipe } from './pipes/currency.pipe';
import { SetColorDirective } from './directives/setcolor.directive';
import { CartTooltipDirective } from './directives/cart-tooltip.directive';

@NgModule({
  declarations: [
    StoreComponent,
    HeaderComponent,
    FooterComponent,
    ProductsSectionComponent,
    ProductComponent,
    CurrencyPipe,
    SetColorDirective,
    CartComponent,
    ProductDetailsComponent,
    CartTooltipComponent,
    CartTooltipDirective,
  ],
  imports: [CommonModule, StoreRoutingModule],
})
export class StoreModule {}
