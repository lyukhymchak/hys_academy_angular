import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import FilterCondition from '../../interfaces/filter-condition.model';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {
  @Input() public options: string[];
  @Input() public filterType: string;
  @Output() public filter = new EventEmitter<FilterCondition<any, any>>();

  public filterCondition: FilterCondition<any, any>;

  constructor() {}

  ngOnInit(): void {
    if (this.filterType === 'date') {
      this.filterCondition = {
        selectedOptionValue: this.options[0],
        inputValue: new Date(Date.now()),
      };
    }

    if (this.filterType === 'number') {
      this.filterCondition = {
        selectedOptionValue: this.options[0],
        inputValue: 5,
      };
    }
  }

  handleSubmit(filterCondition: FilterCondition<any, any>): void {
    if (this.filterType === 'date') {
      this.filter.emit({
        selectedOptionValue: filterCondition.selectedOptionValue,
        inputValue: new Date(filterCondition.inputValue),
      });
    }

    if (this.filterType === 'number') {
      this.filter.emit(filterCondition as FilterCondition<any, number>);
    }
  }
}
