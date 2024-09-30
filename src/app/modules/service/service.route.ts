import express from 'express';
import zodValidationMiddleware from '../../middleware/zodValidationMiddleware';
import { ServiceValidations } from './service.validation';
import { ServiceControllers } from './service.controller';
import authMiddleware from '../../middleware/auth';
import { USER_ROLE } from '../user/user.constant';

const router = express.Router();

router.post(
  '/',
  authMiddleware(USER_ROLE.admin),
  zodValidationMiddleware(ServiceValidations.createServiceValidationSchema),
  ServiceControllers.createService,
);

router.get('/:id', ServiceControllers.getSingleService);

router.get('/', ServiceControllers.getAllServices);

router.put(
  '/:id',
  authMiddleware(USER_ROLE.admin),
  ServiceControllers.updateService,
);

router.delete(
  '/:id',
  authMiddleware(USER_ROLE.admin),
  ServiceControllers.deleteService,
);

export const ServiceRoutes = router;
