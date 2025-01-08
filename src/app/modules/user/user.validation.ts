import { z } from 'zod';

// Sub-schema for UserName validation

//----------------------------------------------

// Main User schema validation for create user
const createUserValidationSchema = z.object({
  body: z.object({
    id: z.string().nonempty({ message: 'ID is required' }),
    name: z.string().nonempty({ message: 'Name is required' }),
    email: z
      .string()
      .email({ message: 'Email must be a valid email address' })
      .nonempty({ message: 'Email is required' }),
    password: z
      .string()
      .max(20, { message: 'Password cannot exceed 20 characters' }),
    needsPasswordChange: z.boolean().default(true),
    passwordChangedAt: z.date().optional(),
    phone: z.string().nonempty({ message: 'Contact Number is required' }),
    address: z.string().nonempty({ message: 'Present Address is required' }),
    role: z.enum(['user', 'admin'], {
      errorMap: () => ({
        message: "Role must be either 'user' or 'admin'.",
      }),
    }),
    isDeleted: z.boolean().default(false),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
  }),
});
//----------------------------------------------

// Main User schema validation for update user
const updateUserValidationSchema = z.object({
  body: z.object({
    name: z.string().optional(),
    email: z
      .string()
      .email({ message: 'Email must be a valid email address' })
      .optional(),
    password: z
      .string()
      .max(20, { message: 'Password cannot exceed 20 characters' })
      .optional(),
    needsPasswordChange: z.boolean().default(true),
    passwordChangedAt: z.date().optional(),
    phone: z.string().optional(),
    address: z.string().optional(),
    role: z
      .enum(['user', 'admin'], {
        errorMap: () => ({
          message: "Role must be either 'user' or 'admin'.",
        }),
      })
      .optional(),
    isDeleted: z.boolean().default(false),
    createdAt: z.date().optional(),
    updatedAt: z.date().optional(),
  }),
});
//----------------------------------------------

// Export validation schemas
export const userValidations = {
  createUserValidationSchema,
  updateUserValidationSchema,
};
