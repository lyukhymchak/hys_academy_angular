import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { AdminComponent } from './components/admin/admin.component';

@NgModule({
  declarations: [AdminComponent, SidebarComponent],
  imports: [CommonModule, AdminRoutingModule, ProductsModule, UsersModule],
})
export class AdminModule {}
