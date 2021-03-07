import { Response } from 'express';
import { addUser } from '../db/models/users';
import { handleInternalError, handleParameterMissing } from '../routers/common';

export const createUserController = async (res: Response, userId: string) => {
  if (!userId) {
    handleParameterMissing(res, 'User ID');
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
