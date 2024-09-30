import { JwtPayload } from 'jsonwebtoken';
import { TBooking } from './booking.interface';
import AppError from '../../errors/AppError';
import httpStatus from 'http-status';
import { Service } from '../service/service.model';
import { Slot } from '../slot/slot.model';
import { Booking } from './booking.model';

const createBookingIntoDB = async ({
  payLoad,
  userInfo,
}: {
  payLoad: TBooking;
  userInfo: JwtPayload;
}) => {
  console.log(userInfo);
  const { user } = userInfo;
  console.log('From Booking service:', userInfo);
  if (!user) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'You are not registered, first you make an account please.',
    );
  }

  console.log('PayLoad:', payLoad);

  const serviceId = payLoad.service ? payLoad.service.toString() : null;
  const slotId = payLoad.slot ? payLoad.slot.toString() : null;

  if (!serviceId || !slotId) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Service ID and Slot ID are required.',
    );
  }

  const service = await Service.isServiceExistById(serviceId);
  if (!service) {
    throw new AppError(httpStatus.NOT_FOUND, 'This service is not in database');
  }

  const isDeleted = service?.isDeleted;
  if (isDeleted) {
    throw new AppError(
      httpStatus.NOT_ACCEPTABLE,
      'This service request is not acceptable, because it is already deleted!!!',
    );
  }

  const slot = await Slot.isSlotExistById(slotId);
  if (!slot) {
    throw new AppError(
      httpStatus.NOT_ACCEPTABLE,
      'This slot request is not in database!!!',
    );
  }

  const isBooked = slot?.isBooked === 'booked';
  if (isBooked) {
    throw new AppError(
      httpStatus.NOT_ACCEPTABLE,
      'This slot request is already booked!!!',
    );
  }

  const session = await Slot.startSession();

  try {
    session.startTransaction();

    const result = await Booking.create(
      [{ ...payLoad, customer: user, service: service, slot: slot }],
      { session },
    );

    await Slot.updateOne(
      { _id: slotId },
      { $set: { isBooked: 'booked' } },
      { session },
    );

    await session.commitTransaction();

    return result[0];
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    console.error('Error during booking creation:', error);
    throw new AppError(
      httpStatus.INTERNAL_SERVER_ERROR,
      'Failed to create booking and update slot status',
    );
  } finally {
    session.endSession();
  }
};

const getAllBookingsFromDB = async () => {
  const result = await Booking.find({ status: 'pending' })
    .populate('customer')
    .populate('service')
    .populate('slot');

  return result;
};

const getUserHisAllBookingsFromDB = async (userInfo: JwtPayload) => {
  console.log('userInfo', userInfo);
  const { user } = userInfo;
  if (!user || !user._id) {
    throw new AppError(
      httpStatus.UNAUTHORIZED,
      'User information is missing or invalid.',
    );
  }
  console.log('User ID:', user._id);
  const result = await Booking.find({ customer: user._id })
    .populate('service')
    .populate('slot');

  console.log('From service', result);

  return result;
};

const completeBookingInDB = async (
  bookingId: string,
  payload: Partial<TBooking>,
) => {
  const booking = await Booking.findById(bookingId);

  if (!booking) {
    throw new AppError(httpStatus.NOT_FOUND, 'Booking not found');
  }

  const completeBooking = booking.status === 'completed';
  if (completeBooking) {
    throw new AppError(httpStatus.CONFLICT, 'Already complete this booking!!!');
  }

  const updatedService = await Booking.findByIdAndUpdate(
    bookingId,
    { ...payload, status: 'completed' },
    {
      new: true,
    },
  );
  return updatedService;
};

export const BookingServices = {
  createBookingIntoDB,
  getAllBookingsFromDB,
  getUserHisAllBookingsFromDB,
  completeBookingInDB,
};
