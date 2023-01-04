import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';
import { FilterComponent } from './components/filter/filter.component';
import { SearchComponent } from './components/search/search.component';
import { TableComponent } from './components/table/table.component';

@NgModule({
  declarations: [FilterComponent, SearchComponent, TableComponent],
  imports: [CommonModule, MatPaginatorModule, FormsModule, SharedModule],
  exports: [FilterComponent, SearchComponent, TableComponent],
})
export class SharedAdminModule {}
