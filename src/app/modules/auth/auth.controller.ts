import { Request, Response } from 'express';
import config from '../../../config';
import catchAsync from '../../../shared/catchAsync';
import sendResponse from '../../../shared/sendResponse';
import { ILoginUserResponse, IRefreshTokenResponse } from './auth.interface';
import { AuthService } from './auth.service';
import { jwtHelpers } from '../../../helpers/jwtHelpers';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';
import { Secret } from 'jsonwebtoken';

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const { ...loginData } = req.body;
  const result = await AuthService.loginUser(loginData);
  const { refreshToken, ...others } = result;

  // set refresh token into cookie

  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  };

  res.cookie('refreshToken', refreshToken, cookieOptions);

  sendResponse<ILoginUserResponse>(res, {
    statusCode: 200,
    success: true,
    message: 'User lohggedin successfully !',
    data: others,
  });
});

const refreshToken = catchAsync(async (req: Request, res: Response) => {
  const { refreshToken } = req.cookies;

  const result = await AuthService.refreshToken(refreshToken);

  // set refresh token into cookie

  const cookieOptions = {
    secure: config.env === 'production',
    httpOnly: true,
  };

  res.cookie('refreshToken', refreshToken, cookieOptions);

  sendResponse<IRefreshTokenResponse>(res, {
    statusCode: 200,
    success: true,
    message: 'User lohggedin successfully !',
    data: result,
  });
});

const changePassword = catchAsync(async (req: Request, res: Response) => {
  const token = req.headers.authorization;
  // verify token
  if (!token) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'You are not authorized');
  }
  let verifiedUser = null;
  verifiedUser = jwtHelpers.verifyToken(token, config.jwt.secret as Secret);

  const { ...passwordData } = req.body;

  await AuthService.changePassword(verifiedUser, passwordData);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: 'Password changed successfully !',
  });
});

export const AuthController = {
  changePassword,
  loginUser,
  refreshToken,
};
