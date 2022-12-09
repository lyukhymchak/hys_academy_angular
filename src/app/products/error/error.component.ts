import { Component, OnInit } from '@angular/core';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss'],
})
export class ErrorComponent implements OnInit {
  buttonClassNames: string[] = ['button', 'btn-load'];

  constructor(private route: Router) {}
  ngOnInit(): void {}

  backToHome() {
    this.route.navigate(['products']);
  }
}
