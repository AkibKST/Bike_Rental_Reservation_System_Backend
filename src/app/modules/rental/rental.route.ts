import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { rentalValidation } from './rental.validation';
import { RentalControllers } from './rental.controller';
import { USER_ROLE } from '../user/user.constant';
import auth from '../../middlewares/auth';

const router = express.Router();

//will call controller func
// create rental route
router.post(
  '/',
  auth(USER_ROLE.admin || USER_ROLE.user),
  validateRequest(rentalValidation.createRentalValidation),
  RentalControllers.createRental,
);
//--------------------------------

// return bike route
router.put('/:id/return', auth(USER_ROLE.admin), RentalControllers.returnBike);
// --------------------------------

// //get user rentals route
router.get(
  '/',
  auth(USER_ROLE.admin || USER_ROLE.user),
  RentalControllers.getUserRentals,
);
//--------------------------------

export const RentalRoutes = router;
