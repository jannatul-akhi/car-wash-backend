import { model, Schema } from 'mongoose';
import { TBooking, VehicleType } from './booking.interface';

const bookingSchema = new Schema<TBooking>(
  {
    customer: {
      type: Schema.Types.ObjectId,
      required: [true, 'Customer ID is required'],
      ref: 'User',
    },
    service: {
      type: Schema.Types.ObjectId,
      required: [true, 'Service ID is required'],
      ref: 'Service',
    },
    slot: {
      type: Schema.Types.ObjectId,
      required: [true, 'Slot ID is required'],
      ref: 'Slot',
    },
    vehicleType: {
      type: String,
      enum: Object.values(VehicleType),
      required: [true, 'Vehicle type is required'],
    },
    vehicleBrand: {
      type: String,
      required: [true, 'Vehicle brand is required'],
    },
    vehicleModel: {
      type: String,
      required: [true, 'Vehicle model is required'],
    },
    manufacturingYear: {
      type: Number,
      required: [true, 'Manufacturing year is required'],
    },
    registrationPlate: {
      type: String,
      required: [true, 'Registration plate is required'],
      unique: true,
    },
    status: { type: String, default: 'pending' },
  },
  { timestamps: true },
);

export const Booking = model<TBooking>('Booking', bookingSchema);
