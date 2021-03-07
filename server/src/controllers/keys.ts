import { Response } from 'express';
import { createHmac } from 'crypto';
import { handleInternalError, handleNotFound, handleForbidden, handleError } from 'src/routers/common';
import { Key, getKeyByAccessKey, getKeyByUserId, addKey } from '../db/models/keys';

const HMAC_ALGORITHM = 'sha256';
const ENCODING = 'hex';

const CRYPTO_ACCESS_KEY = 'TodoAccessKey';
const CRYPTO_SECRET_KEY = 'TodoSecretKey';

const generateKey = (userId: string, secret: string): string => {
  const hmac = createHmac(HMAC_ALGORITHM, secret);
  hmac.update(userId);
  return hmac.digest(ENCODING);
};

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

export const createKey = async (res: Response, userId: string): Promise<Key> => {
  const accessKey = generateKey(userId, CRYPTO_ACCESS_KEY);
  const secretKey = generateKey(userId, CRYPTO_SECRET_KEY);
  const newKey = {
    userId,
    accessKey,
    secretKey,
  };
  try {
    const existingKey = await getKeyByUserId(userId);
    if (existingKey) {
      handleError(res, 400, 'This user already has an access key.');
      return null;
    }
    await addKey(newKey);
    return newKey;
  } catch (error) {
    handleInternalError(res, error.message);
    return null;
  }
};
