import { JwtPayload } from 'jsonwebtoken';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { UserServices } from './user.service';

//create user
const createUser = catchAsync(async (req, res) => {
  //   const { password, user: userData } = req.body // name alias

  // will call service func to send this data
  const result = await UserServices.createUserIntoDB(req.body);

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: 'User registered successfully',
    data: result,
  });
});
//---------------------------------------------

//create get profile
const getProfile = catchAsync(async (req, res) => {
  const user = req.user as JwtPayload;
  const result = await UserServices.getProfile(user.email);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User profile retrieved successfully',
    data: result,
  });
});
//---------------------------------------------

//create get profile
const updateProfile = catchAsync(async (req, res) => {
  const user = req.user as JwtPayload;
  const updatedData = req.body;
  const result = await UserServices.updateProfile(user.email, updatedData);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Profile updated successfully',
    data: result,
  });
});
//---------------------------------------------

export const UserControllers = {
  createUser,
  getProfile,
  updateProfile,
};
