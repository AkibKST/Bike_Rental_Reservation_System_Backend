import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { BikeServices } from './bike.service';

const createBike = catchAsync(async (req, res) => {
  const result = await BikeServices.createBike(req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Bike added successfully',
    data: result,
  });
});

export const BikeControllers = {
  createBike,
};
