import { Response } from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { getSingleUser } from '../db/models/users';
import { handleError, handleInternalError, handleNotFound } from '../routers/common';
import { DEFAULT_TOKEN_ISSUER, DEFAULT_EXPIRATION } from '../biz/const';

const createJwt = (userId: string, encryptedPassword: string) => {
  const payload = {
    iss: DEFAULT_TOKEN_ISSUER,
    userId,
  };
  return jwt.sign(payload, encryptedPassword, {
    algorithm: 'HS256',
    expiresIn: DEFAULT_EXPIRATION,
  });
};

export const loginController = async (res: Response, userId: string, password: string) => {
  const user = await getSingleUser({ userId });
  if (!user) {
    handleNotFound(res, 'User ID');
    return null;
  }
  try {
    const auth = await bcrypt.compare(password, user.password);
    if (!auth) {
      handleError(res, 401, 'User ID or password is incorrect.');
      return null;
    }
    const encodedJWT = createJwt(userId, user.password);
    return encodedJWT;
  } catch (error) {
    console.log(error.message);
    handleInternalError(res, error.message);
    return null;
  }
};
