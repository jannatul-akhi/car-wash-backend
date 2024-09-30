import express from 'express';
import zodValidationMiddleware from '../../middleware/zodValidationMiddleware';
import { BookingValidations } from './booking.validation';
import { BookingControllers } from './booking.controller';
import authMiddleware from '../../middleware/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.post(
  '/',
  authMiddleware(USER_ROLE.user),
  // zodValidationMiddleware(BookingValidations.createBookingValidationSchema),
  BookingControllers.createBooking,
);

router.get('/', BookingControllers.getAllBooking);

router.get(
  '/my-bookings',
  authMiddleware(USER_ROLE.user),
  BookingControllers.getUserAllHisBookings,
);

router.put(
  '/:id',
  authMiddleware(USER_ROLE.admin),
  BookingControllers.completeBooking,
);

export const BookingRoutes = router;
