export class UserModel {
  id: number;
  name: string;
  age: number;
  value: string;
  marked: boolean;

  constructor(data: Partial<UserModel> = {}) {
    data && Object.assign(this, data);
  }
}
