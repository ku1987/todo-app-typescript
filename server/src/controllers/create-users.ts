import { Response } from 'express';
import { addUser, getSingleUser } from '../db/models/users';
import { handleError, handleForbidden, handleInternalError, handleParameterMissing } from '../routers/common';

export const createUserController = async (res: Response, userId: string) => {
  if (!userId) {
    handleParameterMissing(res, 'User ID');
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
