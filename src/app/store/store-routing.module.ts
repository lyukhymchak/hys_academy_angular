import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProductsSectionComponent } from './components/products-section/products-section.component';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { StoreComponent } from './store.component';
import { CartComponent } from './components/cart/cart.component';
import { PageNotFoundComponent } from '../shared/components/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/products',
    pathMatch: 'full',
  },
  {
    path: 'products',
    component: StoreComponent,
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
        path: 'product/:id',
        component: ProductDetailsComponent,
      },

      {
        path: '**',
        component: PageNotFoundComponent,
      },
    ],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class StoreRoutingModule {}
