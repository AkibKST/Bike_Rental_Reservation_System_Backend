import { model, Schema } from 'mongoose';
import { TRental } from './rental.interface';

const rentalSchema = new Schema<TRental>({
  date: {
    type: Date,
    default: Date.now,
  },
  startTime: {
    type: String,
    required: true,
  },
  returnTime: {
    type: String,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  bikeId: {
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
  isReturned: {
    type: Boolean,
    default: false,
  },
});

export const Rental = model<TRental>('Rental', rentalSchema);
