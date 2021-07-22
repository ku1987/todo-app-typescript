import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { getSingleUser } from 'src/db/models/users';
import { handleForbidden, handleInvalidParameter, handleNotFound } from '../routers/common';
import { DEFAULT_TOKEN_ISSUER } from '../biz/const';

const AUTHORIZATION_VALUE_REGEX = /^Bearer (.*)/;

interface DecodedJWT {
  iss: string;
  userId: string;
  iat: number;
  exp: number;
}

export default async (req: Request, res: Response, next: NextFunction) => {
  const auth = req.headers.authorization;
  if (!auth || !AUTHORIZATION_VALUE_REGEX.test(auth)) {
    handleInvalidParameter(res);
    return;
  }
  const bearer = auth.match(AUTHORIZATION_VALUE_REGEX);
  if (!bearer) {
    handleInvalidParameter(res);
    return;
  }
  const jwtValue = bearer[1];
  try {
    const decodedJWT = jwt.decode(jwtValue) as DecodedJWT;
    const user = await getSingleUser({ userId: decodedJWT.userId });
    if (!user) {
      handleNotFound(res, 'User');
      return;
    }
    jwt.verify(jwtValue, user.password, {
      issuer: DEFAULT_TOKEN_ISSUER,
    });
    next();
    return;
  } catch (error) {
    console.log(error.message);
    handleForbidden(res);
  }
};
