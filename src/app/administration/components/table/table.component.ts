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

  constructor() {}

  ngOnInit(): void {
    this.keys = Object.keys(this.items[0]);
  }

  public capitalizeFirstLetter(word: string): string {
    return word.charAt(0).toUpperCase() + word.slice(1);
  }
}
