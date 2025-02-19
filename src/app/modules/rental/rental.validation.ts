import { z } from 'zod';

const createRentalValidation = z.object({
  body: z.object({
    startTime: z.string(),
    bikeId: z.string(),
  }),
});

export const rentalValidation = {
  createRentalValidation,
};
