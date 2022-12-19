import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  @Input() public items: any;
  public objectKeys = Object.keys;

  constructor() {}

  ngOnInit(): void {}
}
