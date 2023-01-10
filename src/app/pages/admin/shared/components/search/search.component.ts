import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { debounceTime, map, startWith, Subject, Subscription } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit, OnDestroy {
  private valueChangesSubscription: Subscription;

  @Output() public valueChanges = new EventEmitter<string>();
  public searchForm = new FormGroup({
    query: new FormControl(''),
  });

  constructor() {}

  ngOnInit(): void {
    this.valueChangesSubscription = this.searchForm.controls.query.valueChanges
      .pipe(
        startWith(''),
        map((value) => value!.trim()),
        debounceTime(500)
      )
      .subscribe((value) => {
        this.valueChanges.emit(value);
      });
  }

  ngOnDestroy(): void {
    this.valueChangesSubscription.unsubscribe();
  }
}
