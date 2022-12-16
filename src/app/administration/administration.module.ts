import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministrationRoutingModule } from './administration-routing.module';
import { AdministrationComponent } from './administration.component';
import { LoginComponent } from './components/login/login.component';
import { UsersComponent } from './components/users/users.component';
import { ProductsComponent } from './components/products/products.component';

@NgModule({
  declarations: [
    AdministrationComponent,
    LoginComponent,
    UsersComponent,
    ProductsComponent,
  ],
  imports: [CommonModule, AdministrationRoutingModule],
})
export class AdministrationModule {}
