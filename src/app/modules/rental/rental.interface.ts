import { Types } from 'mongoose';

export type TRental = {
  date: Date;
  startTime: string;
  returnTime: string;
  userId: Types.ObjectId;
  bikeId: Types.ObjectId;
  totalCost: number;
  isBooked: 'confirmed' | 'cancelled';
  isReturned: boolean;
};

export type TSchedule = {
  date: string;
  startTime: string;
  endTime: string;
};
