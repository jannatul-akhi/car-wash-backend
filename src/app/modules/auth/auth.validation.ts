import { z } from 'zod';

// TAuth validation schema
const loginValidationSchema = z.object({
  body: z.object({
    email: z.string(),
    password: z.string(),
  }),
});

const changePasswordValidationAchema = z.object({
  body: z.object({
    oldPassword: z.string({ required_error: 'Old password is required' }),
    newPassword: z.string({ required_error: 'Password is required' }),
  }),
});

const refreshTokenValidationSchema = z.object({
  cookies: z.object({
    refreshToken: z.string({ required_error: 'Refresh token is required' }),
  }),
});

export const AuthValidations = {
  loginValidationSchema,
  changePasswordValidationAchema,
  refreshTokenValidationSchema,
};
