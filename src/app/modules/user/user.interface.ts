export type TName = {
  firstName: string
  middleName?: string
  lastName: string
}

export interface TUser {
  name: TName
  email: string
  password: string
  phone: string
  address: string
  role: 'admin' | 'user'
}
