import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'products',
    pathMatch: 'full',
    loadChildren: () =>
      import('./products/products.module').then((mod) => mod.ProductsModule),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/products',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
