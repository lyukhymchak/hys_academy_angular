import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { LoginService } from 'src/app/shared/services/login.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss'],
})
export class LoginFormComponent {
  loginForm = new FormGroup({
    username: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  constructor(private loginService: LoginService, private router: Router) {}

  login() {
    const { username, password } = this.loginForm.getRawValue();

    if (username && password) {
      this.loginService
        .login(username!, password!)
        .subscribe((data: { access_token: string }) => {
          localStorage.setItem('authToken', data.access_token);
          this.router.navigate(['/admin']);
        });
    }
  }
}
