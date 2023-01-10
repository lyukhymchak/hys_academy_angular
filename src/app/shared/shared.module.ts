import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CurrencyPipe } from './pipes/currency.pipe';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { UnauthorizedModalComponent } from './components/unauthorized-modal/unauthorized-modal.component';
import { MatDialogModule } from '@angular/material/dialog';

@NgModule({
  declarations: [CurrencyPipe, SpinnerComponent, UnauthorizedModalComponent],
  imports: [CommonModule, MatDialogModule],
  exports: [CurrencyPipe, SpinnerComponent, UnauthorizedModalComponent],
})
export class SharedModule {}
