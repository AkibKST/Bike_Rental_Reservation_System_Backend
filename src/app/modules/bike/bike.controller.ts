import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { BikeServices } from './bike.service';

//create bike controller
const createBike = catchAsync(async (req, res) => {
  const result = await BikeServices.createBike(req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Bike added successfully',
    data: result,
  });
});
//-----------------------------------

//get all bike controller
const getAllBike = catchAsync(async (req, res) => {
  const result = await BikeServices.getAllBike();

  sendResponse(res, {
    statusCode: result.length === 0 ? 404 : 200,
    success: result.length === 0 ? false : true,
    message:
      result.length === 0 ? 'No data found' : 'Bikes retrieved successfully',
    data: result,
  });
});
//-----------------------------------

//update bike controller
const updateBike = catchAsync(async (req, res) => {
  const result = await BikeServices.updateBike(req.params.id, req.body);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Bike updated successfully',
    data: result,
  });
});
//-----------------------------------

export const BikeControllers = {
  createBike,
  getAllBike,
  updateBike,
};
