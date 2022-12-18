import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministrationRoutingModule } from './administration-routing.module';
import { AdministrationComponent } from './administration.component';
import { LoginComponent } from './components/login/login.component';
import { UsersComponent } from './components/users/users.component';
import { ProductsComponent } from './components/products/products.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TableComponent } from './components/table/table.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    AdministrationComponent,
    LoginComponent,
    UsersComponent,
    ProductsComponent,
    SidebarComponent,
    TableComponent,
  ],
  imports: [CommonModule, AdministrationRoutingModule, SharedModule],
})
export class AdministrationModule {}
