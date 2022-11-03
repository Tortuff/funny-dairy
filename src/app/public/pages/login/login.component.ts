import { Component } from '@angular/core';
import { UserModel } from '@shared/types/user-model.types';
import { HttpService } from '@shared/services/http/http.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  user = new UserModel();

  constructor(private readonly httpService: HttpService) {}
}
