import { Injectable } from '@angular/core';
import Product from 'src/app/shared/interfaces/product.interface';
import FilterCondition from '../interfaces/filter-condition.model';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  constructor() {}

  public filterProductsByPrice(
    filterCondition: FilterCondition<string, number>,
    products: Product[]
  ): Product[] {
    if (filterCondition.selectedOptionValue === 'Price more than') {
      return products.filter(
        (product) => product.price > filterCondition.inputValue
      );
    }

    if (filterCondition.selectedOptionValue === 'Price less than') {
      return products.filter(
        (product) => product.price < filterCondition.inputValue
      );
    }

    if (filterCondition.selectedOptionValue === 'Equal') {
      return products.filter(
        (product) => product.price === filterCondition.inputValue
      );
    }
    return [];
  }
}
