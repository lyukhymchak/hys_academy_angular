import { Injectable } from '@angular/core';
import Product from 'src/app/shared/interfaces/product.interface';
import User from 'src/app/shared/interfaces/user.interface';
import FilterCondition from '../interfaces/filter-condition.model';
import { FilterProductOption } from '../enums/filter-product-option.enum';
import { FilterUserOption } from '../enums/filter-user-option.enum';

@Injectable({
  providedIn: 'root',
})
export class FilterService {
  constructor() {}

  public filterProductsByPrice(
    filterCondition: FilterCondition<FilterProductOption, number>,
    products: Product[]
  ): Product[] {
    switch (filterCondition.selectedOptionValue) {
      case FilterProductOption.PriceMoreThan:
        return products.filter(
          (product) => product.price > filterCondition.inputValue
        );
      case FilterProductOption.PriceLessThan:
        return products.filter(
          (product) => product.price < filterCondition.inputValue
        );
      case FilterProductOption.PriceEqual:
        return products.filter(
          (product) => product.price === filterCondition.inputValue
        );
      default:
        return [];
    }
  }

  public filterUsersByCreatedDate(
    filterCondition: FilterCondition<FilterUserOption, string>,
    users: User[]
  ): User[] {
    if (!users) {
      return users;
    }

    const currentFilterTime = new Date(filterCondition.inputValue);

    switch (filterCondition.selectedOptionValue) {
      case FilterUserOption.MoreThan:
        return users.filter(
          (user) =>
            new Date(user.created).getTime() > currentFilterTime.getTime()
        );

      case FilterUserOption.LessThan:
        return users.filter(
          (user) =>
            new Date(user.created).getTime() < currentFilterTime.getTime()
        );

      case FilterUserOption.Equal:
        return users.filter(
          (user) =>
            new Date(user.created).getDay() === currentFilterTime.getDay()
        );
      default:
        return [];
    }
  }
}
