import { Response } from 'express';
import jwt from 'jsonwebtoken';
import { getSingleUser } from 'src/db/models/users';
import { handleInternalError, handleInvalidParameter, handleNotFound } from '../routers/common';
import { DEFAULT_TOKEN_ISSUER } from '../biz/const';

const AUTHORIZATION_VALUE_REGEX = /^Bearer (.*)/;

interface DecodedJWT {
  iss: string;
  userId: string;
  iat: number;
  exp: number;
}

export const authController = async (res: Response, auth: string) => {
  if (!AUTHORIZATION_VALUE_REGEX.test(auth)) {
    handleInvalidParameter(res);
    return null;
  }
  const bearer = auth.match(AUTHORIZATION_VALUE_REGEX);
  if (!bearer) {
    handleInvalidParameter(res);
    return null;
  }
  const jwtValue = bearer[1];
  try {
    const decodedJWT = jwt.decode(jwtValue) as DecodedJWT;
    const user = await getSingleUser({ userId: decodedJWT.userId });
    if (!user) {
      handleNotFound(res, 'User');
      return null;
    }
    const result = jwt.verify(jwtValue, user.password, {
      issuer: DEFAULT_TOKEN_ISSUER,
    });
    return result;
  } catch (error) {
    console.log(error.message);
    handleInternalError(res, error.message);
    return null;
  }
};
