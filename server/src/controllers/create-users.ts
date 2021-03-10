import { Response } from 'express';
import { addUser, getSingleUser } from '../db/models/users';
import { handleError, handleInternalError, handleInvalidParameter } from '../routers/common';
import { userValidator } from '../validators/users';

export const createUserController = async (res: Response, userId: string) => {
  const isValid = await userValidator({ userId });
  if (!isValid) {
    handleInvalidParameter(res);
    return null;
  }
  if (await getSingleUser({ userId })) {
    handleError(res, 400, 'User ID already exists.');
    return null;
  }
  try {
    const result = await addUser(userId);
    return result;
  } catch (error) {
    console.log(error.message);
    handleInternalError(res, error.message);
    return null;
  }
};
