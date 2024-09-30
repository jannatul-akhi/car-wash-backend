import { model, Schema } from 'mongoose';
import { SlotModel, TSlot } from './slot.interface';

const slotSchema = new Schema<TSlot, SlotModel>(
  {
    service: {
      type: Schema.Types.ObjectId,
      required: [true, 'Service ID is required'],
      ref: 'Service',
    },
    date: {
      type: Date,
      required: [true, 'Date of the booking is required'],
    },
    startTime: {
      type: String,
      required: [true, 'Start time is required'],
    },
    endTime: {
      type: String,
      required: [true, 'End time is required'],
    },
    isBooked: {
      type: String,
      enum: ['available', 'booked', 'canceled'],
      required: true,
      default: 'available',
    },
  },
  { timestamps: true },
);

slotSchema.statics.isSlotExistById = async function (_id: string) {
  return await Slot.findById(_id);
};

export const Slot = model<TSlot, SlotModel>('Slot', slotSchema);
