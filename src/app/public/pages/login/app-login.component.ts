import { Component } from '@angular/core';
import { UserModel } from '@shared/types/user-model.types';
import { AppLoginService } from '@public/pages/login/services/app-login.service';
import { MessageService } from 'primeng/api';
import { ToastErrorMessage, ToastSuccessMessage } from '@shared/types/toast.types';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Environment } from '@environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './app-login.component.html',
  styleUrls: ['./app-login.component.scss'],
  providers: [AppLoginService],
})
export class AppLoginComponent {
  user = new UserModel();
  users: UserModel[];

  constructor(
    private readonly loginService: AppLoginService,
    private readonly messageService: MessageService,
    private readonly http: HttpClient
  ) {}

  async ngOnInit(): Promise<void> {
    const headers = new HttpHeaders();
    headers.set('Access-Control-Allow-Origin', '*');
    headers.set('Referer', 'https://stackblitz.com/');
    this.http
      .get(Environment.serverConfig.apiBase + '/contacts', { headers })
      .subscribe((res) => console.log('[RESPONSE] ==> ', res));
  }

  postUser(): void {
    const { name, age } = this.user;
    if (!name && !age) return this.messageService.add(new ToastErrorMessage('The name and age fields are required!'));
    return this.messageService.add(new ToastSuccessMessage(`User's name: ${name}\nUser's age: ${age}`));
  }
}
