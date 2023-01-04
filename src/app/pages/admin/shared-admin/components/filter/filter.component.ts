import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import FilterCondition from '../../interfaces/filter-condition.model';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {
  @Input() public options: string[];
  @Output() public filter = new EventEmitter<FilterCondition<string, number>>();

  public filterCondition: FilterCondition<string, number>;

  constructor() {}

  ngOnInit(): void {
    this.filterCondition = {
      selectedOptionValue: this.options[0],
      inputValue: 0,
    };
  }

  handleSubmit(filterCondition: FilterCondition<string, number>): void {
    this.filter.emit(filterCondition);
  }
}
