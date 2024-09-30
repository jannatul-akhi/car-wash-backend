import { z } from 'zod';

const createServiceValidationSchema = z.object({
  body: z.object({
    name: z
      .string()
      .min(2, 'Service title must be at least 2 characters')
      .max(100, 'Service title must not exceed 100 characters'),
    description: z
      .string()
      .min(10, 'Description must be at least 10 characters')
      .max(500, 'Description must not exceed 500 characters'),
    price: z.number().positive('Price must be a positive number'),
    duration: z.number().positive('Duration must be a positive number'),
    isDeleted: z.boolean().optional(),
  }),
});

export const ServiceValidations = {
  createServiceValidationSchema,
};
