export interface User {
  id: string;

  username: string;

  password: string;

  salt: string;

  validatePassword(password: string): Promise<boolean>;
}
