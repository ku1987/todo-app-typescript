import { Response } from 'express';
import bcrypt from 'bcrypt';
import { addUser, getSingleUser } from '../db/models/users';
import { handleError, handleInternalError, handleInvalidParameter } from '../routers/common';
import { userValidator } from '../validators/users';

export const createUserController = async (res: Response, userId: string, password: string) => {
  const isValid = await userValidator({ userId, password });
  if (!isValid) {
    handleInvalidParameter(res);
    return null;
  }
  const user = await getSingleUser({ userId });
  if (user) {
    handleError(res, 400, 'User ID already exists.');
    return null;
  }
  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const result = await addUser(userId, hashedPassword);
    return result;
  } catch (error) {
    console.log(error.message);
    handleInternalError(res, error.message);
    return null;
  }
};
