import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';

import { debounceTime, Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit, OnDestroy {
  private change = new Subject<string>();
  private changeSubscription: Subscription;

  @Output() public modelChangeEvent = new EventEmitter<string>();

  public query: string;

  constructor() {}

  ngOnInit(): void {
    this.changeSubscription = this.change
      .pipe(debounceTime(500))
      .subscribe((value) => {
        this.modelChangeEvent.emit(value);
      });
  }

  ngOnDestroy(): void {
    this.changeSubscription.unsubscribe();
  }

  public onModelChange(value: string): void {
    this.change.next(value);
  }
}
