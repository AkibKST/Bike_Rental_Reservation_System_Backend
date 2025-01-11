import AppError from '../../errors/AppError';
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

// update bike
const updateBike = async (id: string, payload: Partial<TBike>) => {
  const result = await Bike.findOneAndUpdate(
    { _id: id },
    { $set: payload },
    {
      new: true,
      runValidators: true,
    },
  );

  if (!result) {
    throw new AppError(404, 'Bike not found!');
  }

  return result;
};
//-----------------------------------

export const BikeServices = {
  createBike,
  getAllBike,
  updateBike,
};
