import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdministrationComponent } from './administration.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';

import { AdministrationRoutingModule } from './administration-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ProductsModule } from '../products/products.module';
import { UsersModule } from '../users/users.module';

@NgModule({
  declarations: [AdministrationComponent, SidebarComponent],
  imports: [
    CommonModule,
    AdministrationRoutingModule,
    SharedModule,
    ProductsModule,
    UsersModule,
  ],
})
export class AdministrationModule {}
