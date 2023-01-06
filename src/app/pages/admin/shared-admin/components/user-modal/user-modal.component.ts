import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-user-modal',
  templateUrl: './user-modal.component.html',
  styleUrls: ['./user-modal.component.scss'],
})
export class UserModalComponent {
  public item: any;
  public title: string;

  constructor(
    public dialogRef: MatDialogRef<UserModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    if (this.data.isEdit) {
      this.title = 'Edit User';
      this.item = Object.assign({}, this.data.item);
    } else {
      this.title = 'Create User';
      this.item = {};
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
