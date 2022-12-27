import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministrationRoutingModule } from './administration-routing.module';
import { AdministrationComponent } from './administration.component';

import { UsersComponent } from './components/users/users.component';
import { ProductsComponent } from './components/products/products.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';

import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    AdministrationComponent,
    UsersComponent,
    ProductsComponent,
    SidebarComponent,
  ],
  imports: [CommonModule, AdministrationRoutingModule, SharedModule],
})
export class AdministrationModule {}
