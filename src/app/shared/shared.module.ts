import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrencyPipe } from './pipes/currency.pipe';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { TableComponent } from './components/table/table.component';
import { SearchComponent } from './components/search/search.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    CurrencyPipe,
    SpinnerComponent,
    TableComponent,
    SearchComponent,
  ],
  imports: [CommonModule, FormsModule],
  exports: [CurrencyPipe, SpinnerComponent, TableComponent, SearchComponent],
})
export class SharedModule {}
