import { Component, Inject, Input, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-product-modal',
  templateUrl: './product-modal.component.html',
  styleUrls: ['./product-modal.component.scss'],
})
export class ProductModalComponent implements OnInit {
  public item: any;
  public title: string;

  constructor(
    public dialogRef: MatDialogRef<ProductModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    if (this.data.isEdit) {
      this.title = 'Edit Product';
      this.item = this.data.item;
    } else {
      this.title = 'Create Product';
      this.item = {};
    }
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}
