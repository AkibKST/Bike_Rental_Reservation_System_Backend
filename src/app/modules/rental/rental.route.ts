import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { rentalValidation } from './rental.validation';
import { RentalControllers } from './rental.controller';

const router = express.Router();

//will call controller func
router.post(
  '/',
  validateRequest(rentalValidation.createRentalValidation),
  RentalControllers.createRental,
);

export const RentalRoutes = router;
