import { z } from 'zod'

// Sub-schema for UserName validation
const userNameValidationSchema = z.object({
  firstName: z
    .string()
    .nonempty({ message: 'First Name is required' })
    .max(20, { message: 'First Name cannot exceed 20 characters' })
    .refine(value => value.charAt(0).toUpperCase() + value.slice(1) === value, {
      message: 'First Name must be in capitalize format',
    }),
  middleName: z.string().optional(),
  lastName: z
    .string()
    .nonempty({ message: 'Last Name is required' })
    .refine(value => /^[A-Za-z]+$/.test(value), {
      message: 'Last Name must contain only alphabetic characters',
    }),
})
//----------------------------------------------

// Main User schema validation for create user
const userCreateValidationSchema = z.object({
  id: z.string().nonempty({ message: 'ID is required' }),
  name: userNameValidationSchema,
  email: z
    .string()
    .email({ message: 'Email must be a valid email address' })
    .nonempty({ message: 'Email is required' }),
  password: z
    .string()
    .max(20, { message: 'Password cannot exceed 20 characters' })
    .optional(),
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
})
//----------------------------------------------

// Export validation schemas
export const userValidations = {
  userNameValidationSchema,
  userCreateValidationSchema,
}
