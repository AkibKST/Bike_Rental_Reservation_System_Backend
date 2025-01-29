import { JwtPayload } from 'jsonwebtoken';
import { TRental } from './rental.interface';
import { User } from '../user/user.model';
import { Bike } from '../bike/bike.model';
import AppError from '../../errors/AppError';
import { Rental } from './rental.model';
import moment from 'moment';
import { Types } from 'mongoose';
import calculatePayable from '../../utils/calculatePayable';

// create bike
const createRental = async (payload: TRental, user: JwtPayload) => {
  const userData = await User.findOne({ email: user.email });

  const bikeDetails = await Bike.findById(payload.bike);

  if (!bikeDetails) {
    throw new AppError(404, 'Bike not found!');
  }

  const rentals = await Rental.find({ date: payload.date });

  const requestedStartTime = moment(payload.startTime, 'HH:mm');

  const requestedEndTime = moment(payload.endTime, 'HH:mm');

  for (const rental of rentals) {
    const existingStartTime = moment(rental.startTime, 'HH:mm');

    const existingEndTime = moment(rental.endTime, 'HH:mm');

    const isOverLapping =
      requestedStartTime.isBefore(existingEndTime) &&
      requestedEndTime.isAfter(existingStartTime);

    if (isOverLapping) {
      throw new AppError(400, 'Requested time is not available!');
    }
  }

  payload.user = userData?._id as Types.ObjectId;
  payload.totalCost = calculatePayable(
    payload.endTime,
    payload.startTime,
    bikeDetails?.pricePerHour as number,
  );

  const result = await Rental.create(payload);
  return result;
};
//-----------------------------------

// get all bike
// const getAllBike = async () => {
//   const result = await Bike.find();
//   return result;
// };
//-----------------------------------

// update bike
// const updateBike = async (id: string, payload: Partial<TBike>) => {
//   const result = await Bike.findOneAndUpdate(
//     { _id: id },
//     { $set: payload },
//     {
//       new: true,
//       runValidators: true,
//     },
//   );

//   if (!result) {
//     throw new AppError(404, 'Bike not found!');
//   }

//   return result;
// };
//-----------------------------------

// update bike
// const deleteBike = async (id: string) => {
//   const result = await Bike.findOneAndUpdate(
//     { _id: id },
//     { isDeleted: true, isAvailable: false },
//     {
//       new: true,
//       runValidators: true,
//     },
//   );

//   return result;
// };
//-----------------------------------

export const RentalServices = { createRental };
