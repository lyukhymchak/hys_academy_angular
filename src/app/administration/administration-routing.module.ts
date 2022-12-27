import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdministrationComponent } from './administration.component';

const routes: Routes = [
  {
    path: '',
    component: AdministrationComponent,
    children: [
      {
        path: '',
        redirectTo: '/administration/users',
        pathMatch: 'full',
      },
      {
        path: 'users',
        loadChildren: () =>
          import('src/app/users/users.module').then((mod) => mod.UsersModule),
      },
      {
        path: 'products',
        loadChildren: () =>
          import('src/app/products/products.module').then(
            (mod) => mod.ProductsModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdministrationRoutingModule {}
