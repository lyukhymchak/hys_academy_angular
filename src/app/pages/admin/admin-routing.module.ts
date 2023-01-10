import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from 'src/app/shared/guards/auth.guard';
import { AdminComponent } from './components/admin/admin.component';

const routes: Routes = [
  {
    path: '',
    component: AdminComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: '/admin/users',
        pathMatch: 'full',
      },
      {
        path: 'users',
        loadChildren: () =>
          import('src/app/pages/admin/users/users.module').then(
            (mod) => mod.UsersModule
          ),
      },
      {
        path: 'products',
        loadChildren: () =>
          import('src/app/pages/admin/products/products.module').then(
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
export class AdminRoutingModule {}
