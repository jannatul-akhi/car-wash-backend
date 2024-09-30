import { z } from 'zod';

const createBookingValidationSchema = z.object({
  body: z.object({
    vehicleType: z.enum([
      'car',
      'truck',
      'SUV',
      'van',
      'motorcycle',
      'bus',
      'electricVehicle',
      'hybridVehicle',
      'bicycle',
      'tractor',
    ]),
    vehicleBrand: z.string().min(1, 'Vehicle brand is required'),
    vehicleModel: z.string().min(1, 'Vehicle model is required'),
    manufacturingYear: z.number().min(1886, 'Manufacturing year must be valid'),
    registrationPlate: z.string().min(1, 'Registration plate is required'),
  }),
});

export const BookingValidations = {
  createBookingValidationSchema,
};
