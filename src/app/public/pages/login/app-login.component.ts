import { Component } from '@angular/core';
import { UserModel } from '@shared/types/user-model.types';

@Component({
  selector: 'app-login',
  templateUrl: './app-login.component.html',
  styleUrls: ['./app-login.component.scss'],
})
export class AppLoginComponent {
  user = new UserModel();

  constructor() {}

  postUser(): void {
    console.log('[USER] ==> ', this.user);
  }
}
