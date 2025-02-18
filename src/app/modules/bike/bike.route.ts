import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { BikeValidation } from './bike.validation';
import { BikeControllers } from './bike.controller';

const router = express.Router();

//will call controller func
// create bike route
router.post(
  '/',
  validateRequest(BikeValidation.createBikeValidation),
  BikeControllers.createBike,
);
//--------------------------------

// getAll bike route
router.get('/', BikeControllers.getAllBike);
//--------------------------------

// update bike route
router.put(
  '/:id',
  validateRequest(BikeValidation.updateBikeValidation),
  BikeControllers.updateBike,
);
//--------------------------------

// delete bike route
router.delete('/:id', BikeControllers.deleteBike);
//--------------------------------

export const BikeRoutes = router;
