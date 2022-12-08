import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './products.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { ProductsSectionComponent } from './products-section/products-section.component';
import { ProductComponent } from './products-section/product/product.component';

@NgModule({
  declarations: [
    ProductsComponent,
    HeaderComponent,
    FooterComponent,
    ProductsSectionComponent,
    ProductComponent,
  ],
  imports: [CommonModule],
  exports: [ProductsComponent],
})
export class ProductsModule {}
