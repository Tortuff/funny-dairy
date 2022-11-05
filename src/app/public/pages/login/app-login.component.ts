import { Component } from '@angular/core';
import { UserModel } from '@shared/types/user-model.types';
import { AppLoginService } from '@public/pages/login/services/app-login.service';
import { MessageService } from 'primeng/api';
import { ToastErrorMessage, ToastSuccessMessage } from '@shared/types/toast.types';

@Component({
  selector: 'app-login',
  templateUrl: './app-login.component.html',
  styleUrls: ['./app-login.component.scss'],
  providers: [AppLoginService],
})
export class AppLoginComponent {
  user = new UserModel();

  constructor(private readonly loginService: AppLoginService, private readonly messageService: MessageService) {}

  postUser(): void {
    const { name, age } = this.user;
    if (!name && !age) return this.messageService.add(new ToastErrorMessage('The name and age fields are required!'));
    return this.messageService.add(new ToastSuccessMessage(`User's name: ${name}\nUser's age: ${age}`));
  }
}
