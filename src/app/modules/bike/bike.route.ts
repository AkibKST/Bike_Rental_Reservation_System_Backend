import express from 'express';
import validateRequest from '../../middlewares/validateRequest';

const router = express.Router();

//will call controller func
router.post('/', validateRequest());

export const BikeRoutes = router;
