import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrencyPipe } from './pipes/currency.pipe';
import { SpinnerComponent } from './components/spinner/spinner.component';

@NgModule({
  declarations: [CurrencyPipe, SpinnerComponent],
  imports: [CommonModule],
  exports: [CurrencyPipe, SpinnerComponent],
})
export class SharedModule {}
