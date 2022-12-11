import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.scss'],
})
export class ErrorComponent implements OnInit {
  buttonClassNames: string;

  constructor(private route: Router) {}

  ngOnInit(): void {
    this.buttonClassNames = ['btn-dark'].join(' ');
  }

  backToHome() {
    this.route.navigate(['products']);
  }
}
