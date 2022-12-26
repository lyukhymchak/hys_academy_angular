import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';

import { debounceTime, Subject, Subscription, tap } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit, OnDestroy {
  private change = new Subject<string>();
  private changeSubscription: Subscription;

  @Output() public modelChangeEvent = new EventEmitter<string>();
  @Output() public clickEvent = new EventEmitter<string>();

  public query: string;

  constructor() {}

  ngOnDestroy(): void {
    this.changeSubscription.unsubscribe();
  }

  ngOnInit(): void {
    this.changeSubscription = this.change
      .pipe(debounceTime(500))
      .subscribe((value) => {
        this.modelChangeEvent.emit(value);
      });
  }

  public onModelChange(value: string): void {
    this.change.next(value);
  }

  public onClick(value: string): void {
    this.clickEvent.emit(value);

    this.changeSubscription.unsubscribe();
    this.changeSubscription = this.change
      .pipe(debounceTime(500))
      .subscribe((value) => {
        this.modelChangeEvent.emit(value);
      });
  }
}
