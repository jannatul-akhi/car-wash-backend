import express from 'express';
import zodValidationMiddleware from '../../middleware/zodValidationMiddleware';
import { UserValidations } from '../user/user.validation';
import { AuthControllers } from './auth.controller';
import { AuthValidations } from './auth.validation';

const router = express.Router();

router.post(
  '/signup',
  zodValidationMiddleware(UserValidations.userValidationSchema),
  AuthControllers.createAuth,
);

router.post(
  '/login',
  zodValidationMiddleware(AuthValidations.loginValidationSchema),
  AuthControllers.login,
);

router.post(
  '/change-password',
  zodValidationMiddleware(AuthValidations.changePasswordValidationAchema),
  AuthControllers.changePassword,
);

router.post(
  '/refresh-token',
  zodValidationMiddleware(AuthValidations.refreshTokenValidationSchema),
  AuthControllers.refreshToken,
);

export const AuthRoutes = router;
