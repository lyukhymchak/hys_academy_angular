import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { FilterProductOption } from '../../enums/filter-product-option.enum';
import { FilterUserOption } from '../../enums/filter-user-option.enum';
import FilterCondition from '../../interfaces/filter-condition.model';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {
  public options: string[];
  @Input() public filterType: any;
  @Output() public filter = new EventEmitter<FilterCondition<any, any>>();
  @Input() public filterCondition: FilterCondition<any, any>;

  public filterUserOption = FilterUserOption;
  public filterProductOption = FilterProductOption;

  filterForm: FormGroup;

  constructor() {}

  ngOnInit(): void {
    this.options = Object.values(this.filterType);

    this.filterForm = new FormGroup({
      select: new FormControl(this.filterCondition.selectedOptionValue),
      input: new FormControl(
        new Date(Number(this.filterCondition.inputValue))
          .toISOString()
          .split('T')[0]
      ),
    });
  }

  handleSubmit() {
    if (this.filterForm.valid) {
      if (this.filterType === FilterUserOption) {
        this.filter.emit({
          selectedOptionValue: this.filterForm!.get('select')?.value,
          inputValue: this.filterForm!.get('input')?.value,
        });
      }

      if (this.filterType === FilterProductOption) {
        this.filter.emit({
          selectedOptionValue: this.filterForm!.get('select')?.value,
          inputValue: this.filterForm!.get('input')?.value,
        });
      }
    }
  }
}
