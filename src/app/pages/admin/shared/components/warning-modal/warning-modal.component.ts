import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-warning-modal',
  templateUrl: './warning-modal.component.html',
  styleUrls: ['./warning-modal.component.scss'],
})
export class WarningModalComponent {
  public title: string;

  constructor(
    public dialogRef: MatDialogRef<WarningModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.title = `${this.data.name} #${
      this.data.id.length > 5 ? this.data.id.substring(0, 5) : this.data.id
    }`;
  }

  onCancel(): void {
    this.dialogRef.close();
  }

  onOK(): void {
    this.dialogRef.close('ok');
  }
}
