import { Response } from 'express';
import bcrypt from 'bcrypt';
import { addUser, getSingleUser } from '../db/models/users';
import { handleError, handleInternalError, handleInvalidParameter } from '../routers/common';
import { userValidator } from '../validators/users';

interface User {
  userId: string;
  password: string;
}

export const createUserController = async (res: Response, userData: User) => {
  const isValid = await userValidator(userData);
  if (!isValid) {
    handleInvalidParameter(res);
    return null;
  }
  const user = await getSingleUser({ userId: userData.userId });
  if (user) {
    handleError(res, 400, 'User ID already exists.');
    return null;
  }
  try {
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(userData.password, salt);
    const result = await addUser(userData.userId, hashedPassword);
    return result;
  } catch (error) {
    console.log(error.message);
    handleInternalError(res, error.message);
    return null;
  }
};
