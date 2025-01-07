import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AuthValidation } from './auth.validation';
import { AuthControllers } from './auth.controller';
import { userValidations } from '../user/user.validation';
import { UserControllers } from '../user/user.controller';

const router = express.Router();

//Sign up route
router.post(
  '/signup',
  validateRequest(userValidations.createUserValidationSchema),
  UserControllers.createUser,
);
//----------------------------

//Login route
router.post(
  '/login',
  validateRequest(AuthValidation.loginValidationSchema),
  AuthControllers.loginUser,
);
//----------------------------

export const AuthRoutes = router;
