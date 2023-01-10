import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './components/users/users.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { SharedModule as SharedAdminModule } from '../shared/shared.module';

@NgModule({
  declarations: [UsersComponent],
  imports: [CommonModule, UsersRoutingModule, SharedAdminModule, SharedModule],
  exports: [UsersComponent],
})
export class UsersModule {}
