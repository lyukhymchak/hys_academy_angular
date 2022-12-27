import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AdministrationComponent } from './administration.component';
import { UsersComponent } from './components/users/users.component';
import { ProductsComponent } from './components/products/products.component';

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
        component: UsersComponent,
      },
      {
        path: 'products',
        component: ProductsComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdministrationRoutingModule {}
