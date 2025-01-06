/* eslint-disable @typescript-eslint/no-explicit-any */

import config from '../../config'
import { TUser } from './user.interface'

// ekta user made korlam
const createUserIntoDB = async (payload: TUser) => {
  // create a user object
  const userData: Partial<TUser> = {}

  // if password is not given, use default password
  userData.password = payload.password || (config.default_password as string)

  // set user role
  userData.role = 'user'

  // set generated id
}

export const UserServices = {
  createUserIntoDB,
}
