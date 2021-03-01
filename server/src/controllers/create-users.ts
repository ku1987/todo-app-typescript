import { Response } from 'express';
import { addUser } from 'src/db/models/users';
import { handleInternalError, handleParameterMissing } from '../routers/common';

export const createUserController = async (res: Response, userId: string) => {
  if (!userId) {
    handleParameterMissing(res, 'User ID');
    return;
  }
  try {
    const result = await addUser(userId);
    res.status(200).json({
      status: 'success',
      data: result,
    });
  } catch (error) {
    console.log(error.message);
    handleInternalError(res, error.message);
    return;
  }
};
