export type UserRole = 'admin' | 'user';

export interface TUser {
  id: string;
  name: string;
  email: string;
  password: string;
  needsPasswordChange: boolean;
  passwordChangedAt?: Date;
  phone: string;
  address: string;
  role: UserRole;
  isDeleted: boolean;
}
