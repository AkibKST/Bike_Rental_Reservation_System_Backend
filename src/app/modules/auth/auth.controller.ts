import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AuthServices } from './auth.service';

// login user controller
const loginUser = catchAsync(async (req, res) => {
  const result = await AuthServices.loginUser(req.body);
  const { accessToken, userData } = result;

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User is logged in successfully!',
    data: {
      accessToken,
      userData,
    },
  });
});

//--------------------------------------------

// change password controller

//--------------------------------

//create refresh token

//--------------------------------

export const AuthControllers = {
  loginUser,
};
