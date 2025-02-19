import { NextFunction, Request, Response } from 'express';
import catchAsync from '../utils/catchAsync';
import AppError from '../errors/AppError';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../config';
import { UserRole } from '../modules/user/user.interface';
import { User } from '../modules/user/user.model';

//auth  middleware
const auth = (...requiredRoles: UserRole[]) => {
  return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
    //if the token is sent from client
    const token = req.headers.authorization;

    if (!token) {
      throw new AppError(401, 'You are not authorized!');
    }
    //-----------------------------------------------------

    // checking if the given token is valid
    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string,
    ) as JwtPayload;
    //--------------------------------------------------

    const { role, userId } = decoded;

    // checking if the user is exist
    const user = await User.findOne(userId);

    if (!user) {
      throw new AppError(404, 'This user is not found !');
    }
    //--------------------------------------------------

    // checking if the user is already deleted

    const isDeleted = user?.isDeleted;

    if (isDeleted) {
      throw new AppError(403, 'This user is deleted !');
    }
    //--------------------------------------------------

    // checking if the user is blocked
    //--------------------------------------------------

    //checking if passwordChangedTimestamp(eta jwt issue houer por korte jacchi kina) is gether than jwtIssuedTimestamp(age hoiche kina)
    //jwt token e kono issue houer por password change korte chacche kina
    //--------------------------------------------------

    // check if requiredRoles & decoded roles are valid

    if (requiredRoles && !requiredRoles.includes(role)) {
      throw new AppError(401, 'You have no access to this route!');
    }
    //--------------------------------------------------

    //decoded
    req.user = decoded as JwtPayload;
    next();
  });
};
//--------------------------------------------------

export default auth;
