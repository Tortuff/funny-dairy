import { Component } from '@angular/core';
import { UserModel } from '@shared/types/user-model.types';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  user = new UserModel();

  constructor() {}

  postUser(): void {
    console.log('[USER] ==> ', this.user);
  }
}
