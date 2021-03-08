import { Response } from 'express';
import { getSingleUser } from '../db/models/users';
import { handleNotFound } from '../routers/common';

export const getUserController = async (res: Response, userId: string) => {
  const user = await getSingleUser({ userId });
  if (!user || user.length === 0) {
    handleNotFound(res, 'User');
    return null;
  }
  return user;
};
