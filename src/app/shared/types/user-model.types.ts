export class UserModel {
  public name: string;
  public age: number;

  constructor(data: Partial<UserModel> = {}) {
    data && Object.assign(this, data);
  }
}
