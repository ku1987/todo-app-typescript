import { Response } from 'express';
import { handleInternalError, handleNotFound, handleForbidden } from 'src/routers/common';
import { Key, getKeyByAccessKey, getKeyByUserId, addKey } from '../db/models/keys';

export const getKey = async (res: Response, userId: string, accessKey: string): Promise<Key> => {
  try {
    const key = await getKeyByAccessKey(accessKey);
    if (!key) {
      handleNotFound(res, 'Access Key');
      return null;
    }
    if (userId !== key.userId) {
      handleForbidden(res);
    }
    return key;
  } catch (error) {
    handleInternalError(res, error.message);
    return null;
  }
};

export const getKeyByUser = async (res: Response, userId: string, accessUser: string): Promise<Key> => {
  try {
    const key = await getKeyByUserId(userId);
    if (!key) {
      handleNotFound(res, 'Access Key');
      return null;
    }
    if (userId !== accessUser) {
      handleForbidden(res);
    }
    return key;
  } catch (error) {
    handleInternalError(res, error.message);
    return null;
  }
};
