import { Router } from "express";
import { AuthRoutes } from "../modules/auth/auth.route";
import { ServiceRoutes } from "../modules/service/service.route";
import { SlotRoutes } from "../modules/slot/slot.route";
import { BookingRoutes } from "../modules/booking/booking.route";

const router = Router();

const allRoutes = [

  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/services',
    route: ServiceRoutes,
  },
  {
    path: '/services/slots',
    route: SlotRoutes,
  },
  {
    path: '/bookings',
    route: BookingRoutes,
  },
];

allRoutes.forEach((route) => router.use(route.path, route.route));

export default router;