import { Component, Input, OnInit } from '@angular/core';
import Product from '../../interfaces/product.interface';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
})
export class ProductComponent implements OnInit {
  @Input() product: Product;
  buttonClassNames: string;

  ngOnInit(): void {
    this.buttonClassNames = ['btn-light'].join(' ');
  }
}
