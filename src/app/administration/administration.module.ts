import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministrationComponent } from './administration.component';
import { UsersComponent } from './components/users/users.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';

import { AdministrationRoutingModule } from './administration-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ProductsModule } from '../products/products.module';

@NgModule({
  declarations: [AdministrationComponent, UsersComponent, SidebarComponent],
  imports: [
    CommonModule,
    AdministrationRoutingModule,
    SharedModule,
    ProductsModule,
  ],
})
export class AdministrationModule {}
