export type TUserName = {
  firstName: string;
  middleName?: string;
  lastName: string;
};

export type UserRole = 'admin' | 'user';

export interface TUser {
  id: string;
  name: TUserName;
  email: string;
  password: string;
  needsPasswordChange: boolean;
  passwordChangedAt?: Date;
  phone: string;
  address: string;
  role: UserRole;
  isDeleted: boolean;
}
