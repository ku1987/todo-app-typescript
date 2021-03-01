import { Response } from 'express';
import { getSingleUser } from 'src/db/models/users';
import { handleNotFound } from '../routers/common';

export const getUserController = async (res: Response, userId: string) => {
  const user = await getSingleUser({ userId });
  if (!user) {
    handleNotFound(res, 'User');
  }
  res.status(200).json({
    status: 'success',
    data: user,
  });
};
