import { model, Schema } from 'mongoose';
import { TRental } from './rental.interface';

const rentalSchema = new Schema<TRental>({
  date: {
    type: String,
    required: true,
  },
  startTime: {
    type: String,
    required: true,
  },
  endTime: {
    type: String,
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  bike: {
    type: Schema.Types.ObjectId,
    ref: 'Bike',
    required: true,
  },
  totalCost: {
    type: Number,
    required: true,
  },
  isBooked: {
    type: String,
    enum: ['confirmed', 'cancelled'],
    default: 'confirmed',
  },
});

export const Rental = model<TRental>('Rental', rentalSchema);
