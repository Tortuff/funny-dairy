import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserModel } from '@shared/types/user-model.types';

@Injectable({ providedIn: 'root' })
export class HttpService {
  constructor(private http: HttpClient) {}

  postData(user: UserModel) {
    const body = { name: user.name, age: user.age };
    return this.http.post('http://localhost:3000/postuser', body);
  }
}
