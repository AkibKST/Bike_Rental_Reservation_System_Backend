import { TBike } from './bike.interface';
import { Bike } from './bike.model';

// create bike
const createBike = async (payload: TBike) => {
  const result = await Bike.create(payload);
  return result;
};
//-----------------------------------

// get all bike
const getAllBike = async () => {
  const result = await Bike.find();
  return result;
};
//-----------------------------------

export const BikeServices = {
  createBike,
  getAllBike,
};
