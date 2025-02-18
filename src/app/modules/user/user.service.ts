// User Services
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
//---------------------------------------------

// get user profile
const getProfile = async (userEmail: string) => {
  // console.log(userId);
  const user = await User.findOne({ email: userEmail });
  return user;
};
//---------------------------------------------

// update user profile
const updateProfile = async (userEmail: string, updatedData: TUser) => {
  const user = await User.findOneAndUpdate({ email: userEmail }, updatedData, {
    new: true,
    runValidators: true,
  });
  return user;
};
//---------------------------------------------

export const UserServices = {
  createUserIntoDB,
  getProfile,
  updateProfile,
};
