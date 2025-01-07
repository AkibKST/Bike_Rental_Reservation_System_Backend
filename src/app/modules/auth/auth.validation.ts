import { z } from 'zod';

// Login validation schema
const loginValidationSchema = z.object({
  body: z.object({
    email: z.string({ required_error: 'Email is required' }).email(),
    password: z.string({ required_error: 'Password is required' }),
  }),
});
//--------------------------------

export const AuthValidation = {
  loginValidationSchema,
};
