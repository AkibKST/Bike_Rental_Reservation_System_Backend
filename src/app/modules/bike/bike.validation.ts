import { z } from 'zod';

//create bike validation
const createBikeValidation = z.object({
  body: z.object({
    name: z.string(),
    description: z.string(),
    pricePerHour: z.number().positive('Price must be a positive number!'),
    cc: z.number().positive('CC must be a positive number!'),
    year: z.number().positive('Year must be a positive number!'),
    model: z.string(),
    brand: z.string(),
    isDeleted: z.boolean().default(false),
  }),
});
//---------------------------------

//update bike validation
const updateBikeValidation = z.object({
  body: z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    pricePerHour: z
      .number()
      .positive('Price must be a positive number!')
      .optional(),
    cc: z.number().positive('CC must be a positive number!').optional(),
    year: z.number().positive('Year must be a positive number!').optional(),
    model: z.string().optional(),
    brand: z.string().optional(),
    isDeleted: z.boolean().default(false).optional(),
  }),
});
//---------------------------------

export const BikeValidation = {
  createBikeValidation,
  updateBikeValidation,
};

/**
 * {
  "name": "Mountain Bike",
  "description": "A durable mountain bike for rough terrains.",
  "pricePerHour": 15,
  "cc": 250,
  "year": 2022,
  "model": "X1",
  "brand": "Yamaha"
}

 * */
