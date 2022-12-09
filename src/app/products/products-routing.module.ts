import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductsSectionComponent } from './components/products-section/products-section.component';
import { ProductsComponent } from './products.component';
import { CartComponent } from './components/cart/cart.component';
import { ErrorComponent } from './error/error.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/products',
    pathMatch: 'full',
  },
  {
    path: 'products',
    component: ProductsComponent,
    children: [
      {
        path: '',
        component: ProductsSectionComponent,
      },
      {
        path: 'cart',
        component: CartComponent,
      },
      {
        path: '**',
        component: ErrorComponent,
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProductsRoutingModule {}
