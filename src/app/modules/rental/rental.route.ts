import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { rentalValidation } from './rental.validation';
import { RentalControllers } from './rental.controller';

const router = express.Router();

//will call controller func
// create rental route
router.post(
  '/',
  validateRequest(rentalValidation.createRentalValidation),
  RentalControllers.createRental,
);
//--------------------------------

//return bike route
// router.put(
//   ':id/return',
//   validateRequest(rentalValidation.returnBikeValidation),
//   RentalControllers.returnBike,
// );
//--------------------------------

// //get user rentals route
// router.get('/', RentalControllers.getUserRentals);
//--------------------------------

export const RentalRoutes = router;
