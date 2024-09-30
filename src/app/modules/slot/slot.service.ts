import httpStatus from 'http-status';
import AppError from '../../errors/AppError';
import { TSlot } from './slot.interface';
import { Slot } from './slot.model';
import { Service } from '../service/service.model';
import { convertToMinutes, convertToTime } from '../../utils/convert';

const createSlotDB = async (payLoad: TSlot) => {
  const serviceId = payLoad?.service?.toString();
  const existService = await Service.isServiceExistById(serviceId);
  if (!existService) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'This name or mail is already in use for this web',
    );
  }

  const serviceDuration = existService.duration;
  const slots = [];

  // Convert start and end time to minutes
  const startMinutes = convertToMinutes(payLoad.startTime);
  const endMinutes = convertToMinutes(payLoad.endTime);

  // Calculate total number of slots
  let currentTime = startMinutes;

  while (currentTime + serviceDuration <= endMinutes) {
    const slotStartTime = convertToTime(currentTime);
    const slotEndTime = convertToTime(currentTime + serviceDuration);

    const slot = {
      service: existService._id,
      date: payLoad.date,
      startTime: slotStartTime,
      endTime: slotEndTime,
      isBooked: 'available',
    };

    slots.push(slot);

    // Move the current time forward by the service duration
    currentTime += serviceDuration;
  }
  const result = await Slot.create(slots);
  return result;
};

const getAllAvailableSlotFromDB = async () => {
  const result = await Slot.find({ isBooked: 'available' });

  return result;
};

const getSlotsByIdFromDB = async (slotId: string) => {
  const result = await Slot.find({ _id: slotId, isBooked: 'available' });
  return result;
};

const getSlotsByServiceIdFromDB = async (serviceId: string) => {
  const result = await Slot.find({ service: serviceId, isBooked: 'available' });
  return result;
};

export const SlotServices = {
  createSlotDB,
  getAllAvailableSlotFromDB,
  getSlotsByServiceIdFromDB,
  getSlotsByIdFromDB,
};
