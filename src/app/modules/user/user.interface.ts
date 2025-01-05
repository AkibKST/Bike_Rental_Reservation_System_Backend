export type TName = {
  firstName: string
  middleName?: string
  lastName: string
}

export interface TUser {
  id: string
  name: TName
  email: string
  password: string
  needsPasswordChange: boolean
  passwordChangedAt?: Date
  phone: string
  address: string
  role: 'admin' | 'user'
  isDeleted: boolean
}
