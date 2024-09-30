import httpStatus from 'http-status';
import { BookingServices } from './booking.service';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';

const createBooking = catchAsync(async (req, res) => {
  const payLoad = req.body;
  const user = req.user;
  const result = await BookingServices.createBookingIntoDB({
    payLoad,
    userInfo: user,
  });

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Booking successful',
    data: result,
  });
});

const getAllBooking = catchAsync(async (req, res) => {
  const result = await BookingServices.getAllBookingsFromDB();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All bookings retrieved successfully',
    data: result,
  });
});

const getUserAllHisBookings = catchAsync(async (req, res) => {
  const user = req.user;
  const result = await BookingServices.getUserHisAllBookingsFromDB(user);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'My Bookings retrieved successfully',
    data: result,
  });
});

const completeBooking = catchAsync(async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const result = await BookingServices.completeBookingInDB(id, body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'My Bookings updated successfully',
    data: result,
  });
});

export const BookingControllers = {
  createBooking,
  getAllBooking,
  getUserAllHisBookings,
  completeBooking,
};
