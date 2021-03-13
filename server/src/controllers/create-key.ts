import { Response } from 'express';
import { createHmac } from 'crypto';
import { handleInternalError, handleError, handleInvalidParameter } from 'src/routers/common';
import { getUserController } from 'src/controllers/get-users';
import { Key, getKeyByUserId, addKey } from '../db/models/keys';
import { keyValidator } from '../validators/keys';

const HMAC_ALGORITHM = 'sha256';
const ENCODING = 'hex';

const CRYPTO_ACCESS_KEY = 'TodoAccessKey';
const CRYPTO_SECRET_KEY = 'TodoSecretKey';

const generateKey = (userId: string, secret: string): string => {
  const hmac = createHmac(HMAC_ALGORITHM, secret);
  hmac.update(userId);
  return hmac.digest(ENCODING);
};

export const createKey = async (res: Response, userId: string): Promise<Key | null> => {
  const accessKey = generateKey(userId, CRYPTO_ACCESS_KEY);
  const secretKey = generateKey(userId, CRYPTO_SECRET_KEY);
  const newKey = {
    userId,
    accessKey,
    secretKey,
  };
  const isValid = await keyValidator(newKey);
  if (!isValid) {
    handleInvalidParameter(res);
    return null;
  }
  try {
    const user = await getUserController(res, userId);
    if (!user) {
      return null;
    }
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
