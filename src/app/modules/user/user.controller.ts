import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { UserServices } from './user.service';

const createUser = catchAsync(async (req, res) => {
  //   const { password, user: userData } = req.body // name alias

  // will call service func to send this data
  const result = await UserServices.createUserIntoDB(req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'User is created successfully',
    data: result,
  });
});

export const UserControllers = {
  createUser,
};
