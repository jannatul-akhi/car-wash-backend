import { Model, Types } from 'mongoose';

export type TSlot = {
  service: Types.ObjectId;
  date: Date;
  startTime: string;
  endTime: string;
  isBooked: 'available' | 'booked' | 'canceled';
};

export interface SlotModel extends Model<TSlot> {
  isSlotExistById(id: string): Promise<TSlot>;
}
