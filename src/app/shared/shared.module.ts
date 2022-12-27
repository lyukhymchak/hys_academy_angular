import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrencyPipe } from './pipes/currency.pipe';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { TableComponent } from './components/table/table.component';

@NgModule({
  declarations: [CurrencyPipe, SpinnerComponent, TableComponent],
  imports: [CommonModule],
  exports: [CurrencyPipe, SpinnerComponent, TableComponent],
})
export class SharedModule {}
