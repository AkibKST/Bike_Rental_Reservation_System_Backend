import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { BikeValidation } from './bike.validation';
import { BikeControllers } from './bike.controller';
import { USER_ROLE } from '../user/user.constant';
import auth from '../../middlewares/auth';

const router = express.Router();

//will call controller func
// create bike route
router.post(
  '/',
  auth(USER_ROLE.admin),
  validateRequest(BikeValidation.createBikeValidation),
  BikeControllers.createBike,
);
//--------------------------------

// getAll bike route
router.get(
  '/',
  auth(USER_ROLE.admin, USER_ROLE.user),
  BikeControllers.getAllBike,
);
//--------------------------------

// update bike route
router.put(
  '/:id',
  auth(USER_ROLE.admin),
  validateRequest(BikeValidation.updateBikeValidation),
  BikeControllers.updateBike,
);
//--------------------------------

// delete bike route
router.delete('/:id', auth(USER_ROLE.admin), BikeControllers.deleteBike);
//--------------------------------

export const BikeRoutes = router;
