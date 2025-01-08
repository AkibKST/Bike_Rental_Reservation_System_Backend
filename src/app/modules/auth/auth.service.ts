import { TLoginUser } from './auth.interface';
import bcrypt from 'bcrypt';
import { createToken } from './auth.utils';
import config from '../../config';
import { User } from '../user/user.model';
import AppError from '../../errors/AppError';
import { JwtPayload } from 'jsonwebtoken';

const loginUser = async (payload: TLoginUser) => {
  const user = await User.findOne({ email: payload.email }).select('+password');

  if (!user) {
    throw new AppError(404, 'User not found !');
  }

  //checking if the password is correct

  const matchPassword = await bcrypt.compare(
    payload.password,
    user.password as string,
  );

  if (!matchPassword) {
    throw new AppError(400, 'Wrong Password !');
  }

  //create token and send to the  client

  const jwtPayload: JwtPayload = {
    email: user.email,
    role: user.role,
  };

  const accessToken = createToken(
    jwtPayload as JwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  const userData = await User.findOne({ email: payload.email });

  return {
    accessToken,
    userData,
  };
};

export const AuthServices = {
  loginUser,
};
