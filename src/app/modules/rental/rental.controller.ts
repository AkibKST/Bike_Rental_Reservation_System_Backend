import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { RentalServices } from './rental.service';

//create bike controller
const createRental = catchAsync(async (req, res) => {
  const result = await RentalServices.createRental(req.body, req.user);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Rental created successfully',
    data: result,
  });
});
//-----------------------------------

//return bike controller
const returnBike = catchAsync(async (req, res) => {
  const result = await RentalServices.returnBike(req.params.id);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Bike returned successfully',
    data: result,
  });
});

// //get all rental for user
const getUserRentals = catchAsync(async (req, res) => {
  const result = await RentalServices.getUserRentals(req.user);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Rentals retrieved successfully',
    data: result,
  });
});
//-----------------------------------

//update bike controller
// const updateBike = catchAsync(async (req, res) => {
//   const result = await BikeServices.updateBike(req.params.id, req.body);

//   sendResponse(res, {
//     statusCode: 200,
//     success: true,
//     message: 'Bike updated successfully',
//     data: result,
//   });
// });
//-----------------------------------

//delete bike controller
// const deleteBike = catchAsync(async (req, res) => {
//   const result = await BikeServices.deleteBike(req.params.id);

//   sendResponse(res, {
//     statusCode: 200,
//     success: true,
//     message: 'Bike deleted successfully',
//     data: result,
//   });
// });
//-----------------------------------

export const RentalControllers = {
  createRental,
  returnBike,
  getUserRentals,
};
