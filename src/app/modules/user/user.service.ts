/* eslint-disable @typescript-eslint/no-explicit-any */
import { TUser } from './user.interface';
import { User } from './user.model';

// ekta user made korlam
const createUserIntoDB = async (payload: TUser) => {
  // create a user
  const result = await User.create(payload);

  // send data without password
  const withoutPassword = {
    ...result.toObject(),
    password: undefined,
  };

  return withoutPassword;
  // if password is not given, use default password

  // set user role

  // set generated id
};

export const UserServices = {
  createUserIntoDB,
};
