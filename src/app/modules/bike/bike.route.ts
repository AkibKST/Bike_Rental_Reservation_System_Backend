import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { BikeValidation } from './bike.validation';
import { BikeControllers } from './bike.controller';

const router = express.Router();

//will call controller func
router.post(
  '/',
  validateRequest(BikeValidation.createBikeValidation),
  BikeControllers.createBike,
);

router.get('/', BikeControllers.getAllBike);

router.put(
  '/:id',
  validateRequest(BikeValidation.updateBikeValidation),
  BikeControllers.updateBike,
);

router.delete('/:id', BikeControllers.deleteBike);

export const BikeRoutes = router;
