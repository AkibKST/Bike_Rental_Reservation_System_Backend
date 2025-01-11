import { Types } from 'mongoose';

export type TRental = {
  date: string;
  startTime: string;
  endTime: string;
  user: Types.ObjectId;
  bike: Types.ObjectId;
  totalCost: number;
  isBooked: 'confirmed' | 'cancelled';
};

export type TSchedule = {
  date: string;
  startTime: string;
  endTime: string;
};
