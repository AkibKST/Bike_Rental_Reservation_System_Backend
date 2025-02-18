import express from 'express';
import { UserControllers } from './user.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from './user.constant';

const router = express.Router();

//will call controller func
// create user route
router.post('/create-user', UserControllers.createUser);
//--------------------------------

// create get profile
router.get(
  '/me',
  auth(USER_ROLE.admin, USER_ROLE.user),
  UserControllers.getProfile,
);
//--------------------------------

// // create update profile
router.put(
  '/me',
  auth(USER_ROLE.admin, USER_ROLE.user),
  UserControllers.updateProfile,
);
//--------------------------------

export const UserRoutes = router;
