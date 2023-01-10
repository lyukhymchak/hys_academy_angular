import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-unauthorized-modal',
  templateUrl: './unauthorized-modal.component.html',
  styleUrls: ['./unauthorized-modal.component.scss'],
})
export class UnauthorizedModalComponent {
  public title: string;

  constructor(public dialogRef: MatDialogRef<UnauthorizedModalComponent>) {}

  ngOnInit(): void {
    this.title = 'You are unauthorized!';
  }

  onOK(): void {
    this.dialogRef.close();
  }
}
