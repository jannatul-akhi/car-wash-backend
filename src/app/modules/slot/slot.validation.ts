import { z } from 'zod';

const createSlotValidationSchema = z.object({
  body: z.object({
    date: z.string().transform((dateString) => new Date(dateString)),
    startTime: z.string(),
    endTime: z.string(),
  }),
});

export const SlotValidations = {
  createSlotValidationSchema,
};
