import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrencyPipe } from './pipes/currency.pipe';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { TableComponent } from './components/table/table.component';
import { SearchComponent } from './components/search/search.component';
import { FormsModule } from '@angular/forms';
import { FilterComponent } from './components/filter/filter.component';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  declarations: [
    CurrencyPipe,
    SpinnerComponent,
    TableComponent,
    SearchComponent,
    FilterComponent,
  ],
  imports: [CommonModule, FormsModule, MatPaginatorModule],
  exports: [
    CurrencyPipe,
    SpinnerComponent,
    TableComponent,
    SearchComponent,
    FilterComponent,
  ],
})
export class SharedModule {}
