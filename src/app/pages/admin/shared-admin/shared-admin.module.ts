import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule } from '@angular/forms';

import { SharedModule } from 'src/app/shared/shared.module';
import { FilterComponent } from './components/filter/filter.component';
import { SearchComponent } from './components/search/search.component';
import { TableComponent } from './components/table/table.component';
import { ProductModalComponent } from './components/product-modal/product-modal.component';

import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UserModalComponent } from './components/user-modal/user-modal.component';
import { WarningModalComponent } from './components/warning-modal/warning-modal.component';

@NgModule({
  declarations: [
    FilterComponent,
    SearchComponent,
    TableComponent,
    ProductModalComponent,
    UserModalComponent,
    WarningModalComponent,
  ],
  imports: [
    CommonModule,
    MatPaginatorModule,
    FormsModule,
    SharedModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  exports: [
    FilterComponent,
    SearchComponent,
    TableComponent,
    ProductModalComponent,
  ],
})
export class SharedAdminModule {}
