import { z } from 'zod';



// TUser validation schema
const userValidationSchema = z.object({
  body: z.object({
    name: z.string().min(2,'Invalid Name'),
    email: z.string().email('Invalid email format'),
    password: z.string().min(6, 'Password must be at least 6 characters').optional(),
    passwordChangedAt: z.date().optional(),
    phone: z.string().min(7, 'Phone number must be at least 7 digits'),
    role: z.enum(['admin', 'user']),
    address: z.string().optional(),
    isDeleted: z.boolean().optional(),
  }),
});

export const UserValidations = {
  userValidationSchema,
};
