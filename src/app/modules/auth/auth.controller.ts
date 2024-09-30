import httpStatus from 'http-status';
import catchAsync from '../../utils/catchAsync';
import sendResponse from '../../utils/sendResponse';
import { AuthServices } from './auth.service';
import config from '../../config';

const createAuth = catchAsync(async (req, res) => {
  const body = req.body;
  console.log(body, 'From controllers');
  const result = await AuthServices.createAuthIntoDB(body);

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'Registration is successful',
    data: result,
  });
});

const login = catchAsync(async (req, res) => {
  const result = await AuthServices.loginFromDB(req.body);

  const { user, accessToken } = result;

  const isProduction = config.NODE_ENV === 'production';

  res.cookie('accessToken', accessToken, {
    httpOnly: true,
    secure: isProduction,
    maxAge: 3600000,
  });

  res.cookie('user', JSON.stringify(user), {
    httpOnly: true,
    secure: isProduction,
    maxAge: 3600000,
  });

  sendResponse(res, {
    success: true,
    statusCode: httpStatus.OK,
    message: 'User logged in successfully',
    data: { user, token: accessToken },
  });
});

const changePassword = catchAsync(async (req, res) => {
  const { ...passwordData } = req.body;
  const result = await AuthServices.changePasswordFromDB(
    req.user,
    passwordData,
  );
  console.log('From auth controller:', result);
  console.log('From auth controller:', passwordData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Password updated successfully',
    data: result,
  });
});

const refreshToken = catchAsync(async (req, res) => {
  const { refereshToken } = req.cookies;
  const result = await AuthServices.refreshToken(refereshToken);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Access token is retrived successfully',
    data: result,
  });
});

export const AuthControllers = {
  createAuth,
  login,
  changePassword,
  refreshToken,
};
