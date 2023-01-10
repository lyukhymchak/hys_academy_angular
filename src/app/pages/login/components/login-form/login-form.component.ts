import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LocalStorageKeys } from 'src/app/shared/enums/localstorage-keys.enum';
import { LocalStorageService } from 'src/app/shared/services/localstorage.service';

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

  constructor(
    private loginService: LoginService,
    private router: Router,
    private localStorageService: LocalStorageService
  ) {}

  login() {
    const { username, password } = this.loginForm.getRawValue();

    if (username && password) {
      this.loginService
        .login(username!, password!)
        .subscribe((data: { access_token: string }) => {
          // localStorage.setItem('authToken', data.access_token);
          this.localStorageService.setData(
            LocalStorageKeys.TOKEN,
            data.access_token
          );
          this.router.navigate(['/admin']);
        });
    }
  }
}
