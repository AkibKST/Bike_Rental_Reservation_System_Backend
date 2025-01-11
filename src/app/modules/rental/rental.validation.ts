import { z } from 'zod';

const createRentalValidation = z.object({
  body: z.object({
    date: z.string(),
    startTime: z.string(),
    endTime: z.string(),
    bike: z.string(),
  }),
});

export const rentalValidation = {
  createRentalValidation,
};
