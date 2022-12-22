import { Component, Input, OnInit } from '@angular/core';
import { delay, Subject, of, Observable } from 'rxjs';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  @Input() public items: any;
  public keys: string[];
  public showSpinner: boolean = true;
  private loading: Subject<any> = new Subject<any>();
  public loading$: Observable<any> = this.loading.asObservable();

  constructor() {}

  ngOnInit(): void {
    this.keys = Object.keys(this.items[0]);
    this.loading$ = of(this.items).pipe(delay(1000));

    this.loading$.subscribe(() => {
      this.showSpinner = false;
    });
  }

  public capitalizeFirstLetter(word: string): string {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }
}
