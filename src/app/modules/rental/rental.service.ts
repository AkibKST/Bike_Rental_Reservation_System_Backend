import { JwtPayload } from 'jsonwebtoken';
import { TRental } from './rental.interface';
import { Bike } from '../bike/bike.model';
import { User } from '../user/user.model';
import AppError from '../../errors/AppError';
import { Rental } from './rental.model';
import calculatePayable from '../../utils/calculatePayable';
import { TimeFormattingHHmm } from './rental.utils';

// create bike
const createRental = async (payload: TRental, user: JwtPayload) => {
  const { bikeId, startTime, date } = payload;
  const bike = await Bike.findById(bikeId);
  const userData = await User.findOne({ email: user.email });

  if (!bike || !bike.isAvailable) {
    throw new AppError(404, 'Bike not found!');
  }

  const rental = new Rental({
    date: date,
    userId: userData?._id,
    bikeId,
    startTime,
    endTime: '',
    totalCost: 0,
  });
  await rental.save();
  bike.isAvailable = false;
  await bike.save();
  return rental;
  // const rentals = await Rental.find({ date: payload.date });

  // const requestedStartTime = moment(payload.startTime, 'HH:mm');

  // const requestedEndTime = moment(payload.endTime, 'HH:mm');

  // for (const rental of rentals) {
  //   const existingStartTime = moment(rental.startTime, 'HH:mm');

  //   const existingEndTime = moment(rental.endTime, 'HH:mm');

  //   const isOverLapping =
  //     requestedStartTime.isBefore(existingEndTime) &&
  //     requestedEndTime.isAfter(existingStartTime);

  //   if (isOverLapping) {
  //     throw new AppError(400, 'Requested time is not available!');
  //   }
  // }

  // payload.user = userData?._id as Types.ObjectId;
  // payload.totalCost = calculatePayable(
  //   payload.endTime,
  //   payload.startTime,
  //   bikeDetails?.pricePerHour as number,
  // );

  // const result = await Rental.create(payload);
  // return result;
};
//-----------------------------------

// return bike
const returnBike = async (id: string) => {
  const rental = await Rental.findById(id);

  if (!rental) {
    throw new AppError(404, 'Rental not found!');
  }

  const bike = await Bike.findById(rental.bikeId);
  if (!bike) {
    throw new AppError(404, 'Bike not found!');
  }

  // const returnTime = '2026-06-10T18:00:00Z';
  const returnTime = new Date();
  const formatReturnTime = TimeFormattingHHmm(returnTime);
  const formatStartTime = TimeFormattingHHmm(new Date(rental.startTime));

  // 'HH:mm'
  rental.totalCost = calculatePayable(
    formatReturnTime,
    formatStartTime,
    bike.pricePerHour as number,
  );
  rental.isReturned = true;
  await rental.save();

  bike.isAvailable = true;
  await bike.save();

  return rental;
};
//-----------------------------------

// get all rentals for user
const getUserRentals = async (user: JwtPayload) => {
  const userData = await User.findOne({ email: user.email });
  const rentals = await Rental.find({ userId: userData?._id }).populate(
    'bikeId',
  );
  // console.log(rentals.length, user._id, userData);
  return rentals;
};
//-----------------------------------

export const RentalServices = {
  createRental,
  returnBike,
  getUserRentals,
};
